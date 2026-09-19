/**
 * GENERATED FILE — do not edit by hand.
 *
 * Which repositories the pipeline rejected, and why. Written because a
 * heuristic filter that cannot be audited is indistinguishable from a bug:
 * 'why is this project missing' should be answerable from the UI, not from
 * a scrolling terminal log.
 */

export const PIPELINE_AUDIT = {
  "generatedAt": "2026-09-19",
  "minTier": "B",
  "candidates": 185,
  "kept": 133,
  "excluded": [
    {
      "reason": "TOOL_OR_LIBRARY_OR_DATASET",
      "label": "工具 / 库 / 数据集 / 教程",
      "repos": [
        "AntoBrandi/Arduino-Bot",
        "DAVIAN-Robotics/PHUMA",
        "Gepetto/example-robot-data",
        "NPCLEI/KungFuAthleteBot",
        "autonomous-ai/autonomous-os",
        "darshmenon/UR3_ROS2_PICK_AND_PLACE",
        "earthtojake/text-to-cad",
        "hashgraph-online/awesome-codex-plugins",
        "quandy2020/OpenRobotics",
        "ros-claw/rosclaw"
      ]
    },
    {
      "reason": "NO_ROBOT_SIGNAL",
      "label": "无机器人信号且无 URDF 结构证据",
      "repos": [
        "FPGAwars/icezum",
        "NVIDIA-AI-IOT/jetracer",
        "aklofas/kicad-happy",
        "fuwei007/Navbot-EN01",
        "maxvfischer/DIY-CNC-machine",
        "nophead/NopSCADlib",
        "ruvnet/RuView",
        "wuphilipp/gello_mechanical"
      ]
    },
    {
      "reason": "SIMULATOR_OR_MODEL_ZOO",
      "label": "仿真器 / 模型库（不可制造）",
      "repos": [
        "Albusgive/wheel_legged_genesis",
        "ChrGri/DIY-Sim-Racing-FFB-Pedal-Mechanical-Design",
        "Derek-TH-Wang/quadruped_ctrl",
        "KelvinLauMiau/Kinova7DoF-MuJoCo",
        "LeCAR-Lab/dial-mpc",
        "NVIDIA/soma-retargeter",
        "NVlabs/ProtoMotions",
        "OpenLegged/URDF-Studio",
        "YanjieZe/GMR",
        "bridgedp/hunter_bipedal_control",
        "ccrpRepo/robot_retargeter",
        "elijah-waichong-chan/go2-convex-mpc",
        "gbionics/human-gazebo",
        "gezp/universal_robot_ign",
        "google-deepmind/mujoco",
        "google-deepmind/mujoco_menagerie",
        "haruki1526/LeggedRobotsForBullet",
        "iit-DLSLab/gym-quadruped",
        "jaykorea/Isaac-RL-Two-wheel-Legged-Bot",
        "legubiao/quadruped_ros2_control",
        "loongOpen/OpenLoong-Dyn-Control",
        "lupinjia/LeggedGym-Ex",
        "manumerous/wb_humanoid_mpc",
        "robotology/gym-ignition-models",
        "tmjeong1103/RIMKit",
        "unitreerobotics/unitree_mujoco",
        "zihanwang0422/legged_rl_lab",
        "zitongbai/bipedal_control",
        "zitongbai/legged_rl",
        "zzzJie-Robot/Go2Arm_sim2sim"
      ]
    },
    {
      "reason": "NO_HARDWARE_EVIDENCE",
      "label": "无硬件证据（无参数化 CAD / BOM / PCB，网格也不足）",
      "repos": [
        "OpenHUTB/hutb",
        "enactic/openarm",
        "makerspet/oomwoo",
        "upkie/upkie"
      ]
    }
  ],
  "rescuedByStructure": [
    "apirrone/Open_Duck_Mini"
  ]
} as const;
