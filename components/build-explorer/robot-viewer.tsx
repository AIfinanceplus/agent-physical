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
  regionOfLink,
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
}: {
  model: RobotModel;
  joints: JointMarker[];
  onPickLink: (link: string | null) => void;
  onPickJoint: (jointId: number) => void;
  handleRef: RefObject<ViewerHandle | null>;
  className?: string;
}) {
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

    const setView = (v: "iso" | "front" | "side" | "top") => {
      const target = new THREE.Vector3(0, 0.42, 0);
      const pos = {
        iso: new THREE.Vector3(0.95, 0.78, 1.2),
        front: new THREE.Vector3(0, 0.45, 1.6),
        side: new THREE.Vector3(1.6, 0.45, 0),
        top: new THREE.Vector3(0.01, 1.95, 0.02),
      }[v];
      camera.position.copy(pos);
      controls.target.copy(target);
      camera.lookAt(target);
      controls.update();
    };

    setView("iso");

    const loader = new GLTFLoader();
    let disposed = false;

    loader.load("/model/robot.glb", (gltf) => {
      if (disposed) return;
      const byName = new Map<string, THREE.Object3D>();
      gltf.scene.children.forEach((c) => byName.set(c.name, c));

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
            region: regionOfLink(name),
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
