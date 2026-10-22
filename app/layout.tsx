import type { Metadata } from "next";
import { openGraphImage, twitterImage } from "./metadata";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://deepyou.top"),
  title: {
    default: "知枝｜懂你所想，陪你成长的 AI 生活助手",
    template: "%s｜知枝",
  },
  description: "知枝是一款面向个人与家庭的AI智能生活助手，提供智能对话、智囊团多角度决策、智能提醒、时间管理、物品位置记录及AI辅助创作等功能。持续探索AI Agent、日程规划、生活记录与家庭协作，让AI帮助你思考问题、记住琐事、管理生活，成为懂你所想、陪你成长的智能伙伴。",
  keywords: ["AI助手", "智能助手", "AI生活助手", "人工智能助手", "AI聊天助手", "日程提醒软件", "生活管理App", "个人助理", "智能体", "知枝"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "知枝",
    title: "知枝｜懂你所想，陪你成长",
    description: "温暖、可靠、真正融入生活的 AI 助手。",
    url: "https://deepyou.top/",
    ...openGraphImage,
  },
  twitter: twitterImage,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: "/images/zhizhi-icon.png",
    shortcut: "/images/zhizhi-icon.png",
    apple: "/images/zhizhi-icon.png",
  },
  other: {
    "apple-itunes-app": "app-id=6804439312",
    ...(process.env.NODE_ENV === "development" ? { "codex-preview": "development" } : {}),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN">
    <head><link rel="manifest" href="/manifest.webmanifest" /></head>
    <body>{children}</body>
  </html>;
}
