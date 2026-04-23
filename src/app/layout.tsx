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
  title: "黄若杰 | 数据分析与 AI 应用",
  description:
    "黄若杰的个人专业网站，聚焦数据分析、AI 应用、计算神经科学、脑电数据研究与跨学科项目实践。",
  keywords: [
    "黄若杰",
    "数据分析",
    "AI 应用",
    "计算神经科学",
    "心理学",
    "EEG",
    "MNE-Python",
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
