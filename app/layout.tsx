import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "开源机器人证据工作台 · Agent Physical",
  description:
    "对公开的机器人开源项目做证据化拆解：装配层级来自仓库真实目录结构或零件文件名聚类，每条零件行指向真实文件，未公开的信息显式标注为缺失。含 Berkeley Humanoid Lite 的深度 3D 拆解台与由采集管线生成的通用证据工作台。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
