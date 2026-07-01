import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "300 700",
});

export const metadata: Metadata = {
  title: "黄若杰 | AI 产品实习生 · 心理学 × Agent 工程",
  description:
    "黄若杰的个人专业网站：AI 产品实习生，心理学（计算神经方向）硕士在读。1 段真实职场 AI 落地 + 1 个已上线产品 + 2 个获奖作品，能用 AI 编程工具独立把想法做到上线，并可与站内数字分身对话。",
  keywords: [
    "黄若杰",
    "AI 产品",
    "AI 产品实习",
    "Agent 工程",
    "多智能体",
    "OpenAI Agents SDK",
    "心理学",
    "计算神经科学",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
