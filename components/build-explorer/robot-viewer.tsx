"use client";

import { useEffect, useImperativeHandle, useRef, type RefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  MODEL_ROOT_ROTATION_X,
  explodeOffset,
  modelCenter,
  regionOfLink as defaultRegionOfLink,
  type Region,
  type RobotModel,
} from "@/lib/robot-view";

export interface JointMarker {
  jointId: number;
  docName: string;
  bus: string;
  canId: number;
  link: string;
  color: string;
}

export interface ViewerState {
  /** Links belonging to the current selection; empty means "nothing selected". */
  highlightLinks: string[];
  /** Per-region visibility: on = normal, off = hidden, only = isolate that region. */
  regionModes: Record<Region, RegionMode>;
  isolatedLink: string | null;
  /** 0 = assembled, 1 = fully exploded. */
  explode: number;
  showJoints: boolean;
  activeJointId: number | null;
}

export type RegionMode = "on" | "off" | "only";

export interface ViewerHandle {
  setState: (patch: Partial<ViewerState>) => void;
  reset: () => void;
  setView: (v: "iso" | "front" | "side" | "top") => void;
}

const BASE_COLOR = 0x99a4b4;
const DIM_COLOR = 0x333c4b;
const SELECT_COLOR = 0xd3ea5c;
const HOVER_COLOR = 0xeef3fa;
const SELECT_EMISSIVE = 0x2f3d09;
const HOVER_EMISSIVE = 0x232b38;

interface LinkObject {
  name: string;
  node: THREE.Object3D;
  mesh: THREE.Mesh;
  material: THREE.MeshStandardMaterial;
  basePosition: THREE.Vector3;
  offset: THREE.Vector3;
  region: Region;
}

export default function RobotViewer({
  model,
  joints,
  onPickLink,
  onPickJoint,
  handleRef,
  className,
  glbUrl = "/model/robot.glb",
  linkRegion = defaultRegionOfLink,
}: {
  model: RobotModel;
  joints: JointMarker[];
  onPickLink: (link: string | null) => void;
  onPickJoint: (jointId: number) => void;
  handleRef: RefObject<ViewerHandle | null>;
  className?: string;
  /** Geometry for this teardown. Generated teardowns ship their own GLB. */
  glbUrl?: string;
  /** Link → region mapping, carried by the spec. */
  linkRegion?: (link: string) => string;
}) {
  // Props are read through a ref because the GLB is fetched once per mount: a
  // changing function identity must not reload the model.
  const cfgRef = useRef({ glbUrl, linkRegion });
  cfgRef.current = { glbUrl, linkRegion };
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<ViewerState>({
    highlightLinks: [],
    regionModes: { torso: "on", arm_left: "on", arm_right: "on", leg_left: "on", leg_right: "on" },
    isolatedLink: null,
    explode: 0,
    showJoints: true,
    activeJointId: null,
  });
  const apiRef = useRef<{
    apply: () => void;
    reset: () => void;
    setView: (v: "iso" | "front" | "side" | "top") => void;
  } | null>(null);
  const pickRef = useRef({ onPickLink, onPickJoint });

  useEffect(() => {
    pickRef.current = { onPickLink, onPickJoint };
  }, [onPickLink, onPickJoint]);

  useImperativeHandle(handleRef, () => ({
    setState: (patch) => {
      stateRef.current = { ...stateRef.current, ...patch };
      apiRef.current?.apply();
    },
    reset: () => apiRef.current?.reset(),
    setView: (v) => apiRef.current?.setView(v),
  }));

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0d13, 1);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0d13, 2.6, 7);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.02, 40);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.minDistance = 0.35;
    controls.maxDistance = 5;

    scene.add(new THREE.HemisphereLight(0xdfe9ff, 0x0b0e14, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(1.6, 2.4, 2.2);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9fc4ff, 0.85);
    fill.position.set(-2.2, 0.8, -1.4);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xd3ea5c, 0.5);
    rim.position.set(-0.6, -1.6, 0.9);
    scene.add(rim);

    // A neutral studio environment gives the metal parts a believable specular response; without it
    // metallic surfaces have nothing to reflect and read as flat grey.
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.45;
    pmrem.dispose();

    const root = new THREE.Group();
    root.rotation.x = MODEL_ROOT_ROTATION_X;
    scene.add(root);

    const links: LinkObject[] = [];
    const markers: THREE.Mesh[] = [];
    const markerGroup = new THREE.Group();
    root.add(markerGroup);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered: LinkObject | null = null;
    let dragging = false;
    const downAt = { x: 0, y: 0 };

    const center = modelCenter(model);

    const apply = () => {
      const s = stateRef.current;
      const selected = new Set(s.highlightLinks);
      // Selecting the whole robot is the default state, not a highlight: keep the model neutral so
      // the joint markers and the exploded layout stay readable.
      const hasSelection = selected.size > 0 && selected.size < links.length;
      const t = s.explode;
      const modes = Object.values(s.regionModes);
      const onlyMode = modes.includes("only");

      for (const l of links) {
        const mode = s.regionModes[l.region];
        const hidden =
          (onlyMode ? mode !== "only" : mode === "off") ||
          (s.isolatedLink != null && l.name !== s.isolatedLink);
        l.node.visible = !hidden;
        if (hidden) continue;

        l.node.position.copy(l.basePosition).addScaledVector(l.offset, t);

        if (selected.has(l.name)) {
          l.material.color.setHex(SELECT_COLOR);
          l.material.emissive.setHex(SELECT_EMISSIVE);
        } else if (hasSelection) {
          l.material.color.setHex(DIM_COLOR);
          l.material.emissive.setHex(0x000000);
        } else {
          l.material.color.setHex(BASE_COLOR);
          l.material.emissive.setHex(0x000000);
        }
        if (hovered === l && !selected.has(l.name)) {
          l.material.emissive.setHex(HOVER_EMISSIVE);
          if (!hasSelection) l.material.color.setHex(HOVER_COLOR);
        }
      }

      markerGroup.visible = s.showJoints;
      for (const m of markers) {
        const isActive = (m.userData.jointId as number) === s.activeJointId;
        m.scale.setScalar(isActive ? 2.2 : 1);
        // Markers track the exploded position of their own link.
        const linkNode = m.userData.linkNode as THREE.Object3D | undefined;
        if (linkNode) {
          m.position.copy(linkNode.position);
          // A marker is only meaningful while its own link is on screen.
          m.visible = linkNode.visible;
        }
        (m.material as THREE.MeshBasicMaterial).opacity = isActive ? 1 : 0.8;
      }
    };

    // 取景必须由模型自身尺寸决定。参照实现的固定坐标是给一台 ≈0.83 m 高的人形调的：
    // 换成 0.4 m 的四足或 2 m 的机械臂，固定距离会把模型推出画框（看起来像"没加载出来"）。
    // URDF 是 Z 轴向上，模型根节点绕 X 轴 -90°，所以渲染坐标是 (x, z, -y)。
    const frameBox = (() => {
      const mn = [Infinity, Infinity, Infinity];
      const mx = [-Infinity, -Infinity, -Infinity];
      for (const l of Object.values(model.links)) {
        const a = [l.min[0], l.min[2], -l.max[1]];
        const b = [l.max[0], l.max[2], -l.min[1]];
        for (let i = 0; i < 3; i++) {
          mn[i] = Math.min(mn[i], a[i], b[i]);
          mx[i] = Math.max(mx[i], a[i], b[i]);
        }
      }
      if (!mn.every(Number.isFinite) || !mx.every(Number.isFinite)) {
        return { center: new THREE.Vector3(0, 0.42, 0), radius: 0.7 };
      }
      return {
        center: new THREE.Vector3((mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, (mn[2] + mx[2]) / 2),
        radius: Math.max(0.05, 0.5 * Math.hypot(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2])),
      };
    })();

    const setView = (v: "iso" | "front" | "side" | "top") => {
      const target = frameBox.center.clone();
      const d = (frameBox.radius / Math.sin((camera.fov * Math.PI) / 360)) * 1.15;
      // 近/远平面也必须跟着模型尺寸走。它们原来是给 ≈1 m 的人形定的（0.02 / 40），
      // 而 CAD 常按毫米建模：整机包围盒 258×404×248 时相机要退到 800 单位外，
      // 模型整个落在远平面之外被裁掉 —— 症状同样是"全黑"，但根因和取景无关。
      camera.near = Math.max(0.001, d / 100);
      camera.far = d * 8;
      camera.updateProjectionMatrix();
      // 缩放上下限同理：写死的 0.35–5 对毫米级模型等于把相机强行拽进模型内部。
      controls.minDistance = Math.max(frameBox.radius * 0.2, d * 0.04);
      controls.maxDistance = d * 4;
      const unit = {
        iso: new THREE.Vector3(0.72, 0.52, 1),
        front: new THREE.Vector3(0, 0.12, 1),
        side: new THREE.Vector3(1, 0.12, 0),
        top: new THREE.Vector3(0.01, 1, 0.02),
      }[v].normalize();
      const pos = target.clone().addScaledVector(unit, d);
      camera.position.copy(pos);
      controls.target.copy(target);
      camera.lookAt(target);
      controls.update();
    };

    setView("iso");

    const loader = new GLTFLoader();
    let disposed = false;

    loader.load(cfgRef.current.glbUrl, (gltf) => {
      if (disposed) return;
      // Index by name at any depth. The reference GLB hangs each link directly
      // off the scene root, but exporters commonly wrap everything in one root
      // node ("world") — scanning only the first level silently yields an empty
      // scene, which looks like a load failure rather than a layout mismatch.
      const byName = new Map<string, THREE.Object3D>();
      gltf.scene.traverse((o) => {
        if (o.name) byName.set(o.name, o);
      });

      for (const [name, meta] of Object.entries(model.links)) {
        const node = byName.get(name);
        if (!node) continue;
        const off = explodeOffset(meta, center);
        const offset = new THREE.Vector3(off[0], off[1], off[2]);
        const meshes: THREE.Mesh[] = [];
        node.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) meshes.push(child as THREE.Mesh);
        });
        for (const mesh of meshes) {
          // The published meshes are faceted STL/STEP exports: they ship positions only, and with no
          // normal attribute every lit material would shade to black. Derive normals when missing,
          // and keep flat shading so machined and printed faces stay crisp instead of smeared.
          if (!mesh.geometry.attributes.normal) mesh.geometry.computeVertexNormals();
          const material = new THREE.MeshStandardMaterial({
            color: BASE_COLOR,
            metalness: 0.18,
            roughness: 0.58,
            flatShading: true,
          });
          mesh.material = material;
          const entry: LinkObject = {
            name,
            node,
            mesh,
            material,
            basePosition: node.position.clone(),
            offset,
            region: cfgRef.current.linkRegion(name),
          };
          mesh.userData.link = entry;
          links.push(entry);
        }
        root.add(node);
      }

      const sphere = new THREE.SphereGeometry(0.013, 16, 12);
      for (const j of joints) {
        const node = byName.get(j.link);
        if (!node) continue;
        const marker = new THREE.Mesh(
          sphere,
          new THREE.MeshBasicMaterial({ color: new THREE.Color(j.color), transparent: true }),
        );
        marker.position.copy(node.position);
        marker.userData.jointId = j.jointId;
        marker.userData.linkNode = node;
        markerGroup.add(marker);
        markers.push(marker);
      }

      apply();
      apiRef.current = { apply, reset: () => setView("iso"), setView };

      if (import.meta.env.DEV) {
        // Dev-only inspection hook: lets tooling verify the scene without touching app state.
        (window as unknown as Record<string, unknown>).__robotViewer = {
          THREE,
          renderer,
          scene,
          camera,
          controls,
          root,
          links,
          markers,
        };
      }
    });

    const readPointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = false;
      downAt.x = event.clientX;
      downAt.y = event.clientY;
      readPointer(event);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (Math.abs(event.clientX - downAt.x) + Math.abs(event.clientY - downAt.y) > 6) dragging = true;
      readPointer(event);
      raycaster.setFromCamera(pointer, camera);
      const visible = links.filter((l) => l.node.visible);
      const hits = raycaster.intersectObjects(
        visible.map((l) => l.mesh),
        false,
      );
      const next = hits.length ? ((hits[0].object.userData.link as LinkObject) ?? null) : null;
      if (next !== hovered) {
        hovered = next;
        renderer.domElement.style.cursor = next ? "pointer" : "grab";
        apply();
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (dragging) return;
      readPointer(event);
      raycaster.setFromCamera(pointer, camera);
      if (stateRef.current.showJoints) {
        const hits = raycaster.intersectObjects(
          markers.filter((m) => m.visible),
          false,
        );
        if (hits.length) {
          pickRef.current.onPickJoint(hits[0].object.userData.jointId as number);
          return;
        }
      }
      const visible = links.filter((l) => l.node.visible);
      const hits = raycaster.intersectObjects(
        visible.map((l) => l.mesh),
        false,
      );
      if (hits.length) {
        const entry = hits[0].object.userData.link as LinkObject | undefined;
        pickRef.current.onPickLink(entry ? entry.name : null);
      } else {
        pickRef.current.onPickLink(null);
      }
    };

    const onPointerLeave = () => {
      if (hovered) {
        hovered = null;
        apply();
      }
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      controls.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry?.dispose();
          const m = mesh.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m?.dispose();
        }
      });
      renderer.dispose();
      envTexture.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      apiRef.current = null;
    };
  }, [model, joints]);

  return <div ref={hostRef} className={className} aria-label="整机 3D 拆解视图" />;
}
