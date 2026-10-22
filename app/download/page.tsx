import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./download.module.css";
import { openGraphImage } from "../metadata";

export const metadata: Metadata = {
  title: "下载 App",
  description: "下载知枝 AI 生活助手，支持 iOS 与 Android。",
  alternates: { canonical: "/download" },
  openGraph: { url: "https://deepyou.top/download", ...openGraphImage },
};

const VERSIONS_API = "https://zhizhi.deepyou.top/api/app/versions/latest/all";

type AppVersion = {
  platform: "android" | "ios";
  versionName: string;
  versionCode: number;
  minSupportedVersionCode: number;
  updateAvailable: boolean;
  forceUpdate: boolean;
  downloadUrl: string;
  wakeupUrl: string;
  releaseNotes: string;
  publishedAt: number;
};

type VersionsResponse = {
  code: number;
  message: string;
  data?: { versions?: AppVersion[] };
};

const fallbackVersions: AppVersion[] = [
  { platform: "android", versionName: "1.0.7", versionCode: 1, minSupportedVersionCode: 1, updateAvailable: false, forceUpdate: false, downloadUrl: "https://zhizhi.deepyou.top/download/app-release1.0.7.apk", wakeupUrl: "market://details?id=com.example.zhizhi", releaseNotes: "官方 Android 安装包", publishedAt: 1788051208 },
  { platform: "ios", versionName: "1.0.2", versionCode: 1, minSupportedVersionCode: 1, updateAvailable: false, forceUpdate: false, downloadUrl: "https://apps.apple.com/cn/app/%E7%9F%A5%E6%9E%9D/id6804439312", wakeupUrl: "itms-apps://apps.apple.com/cn/app/id6804439312", releaseNotes: "首个正式版本", publishedAt: 1788051208 },
];

async function getLatestVersions() {
  try {
    const response = await fetch(VERSIONS_API, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return fallbackVersions;
    const payload = (await response.json()) as VersionsResponse;
    const versions = payload.data?.versions?.filter((version) =>
      (version.platform === "ios" || version.platform === "android")
      && typeof version.versionName === "string"
      && typeof version.downloadUrl === "string"
      && version.downloadUrl.length > 0
      && Number.isFinite(version.publishedAt)
    );
    return payload.code === 0 && versions?.length
      ? versions
      : fallbackVersions;
  } catch {
    return fallbackVersions;
  }
}

function releaseDate(timestamp: number) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Shanghai" }).format(new Date(timestamp * 1000));
}

export default async function DownloadPage() {
  const versions = await getLatestVersions();
  const ios = versions.find((version) => version.platform === "ios") ?? fallbackVersions[1];
  const android = versions.find((version) => version.platform === "android") ?? fallbackVersions[0];

  return <main className={styles.page}>
    <header className={styles.nav}>
      <Link href="/" className={styles.brand} aria-label="返回知枝官网首页"><Image src="/images/zhizhi-logo.png" alt="知枝" width={256} height={97} priority /></Link>
      <nav aria-label="下载页导航"><Link href="/guides">使用指南</Link><Link href="/support">技术支持</Link><Link href="/">返回官网 <span aria-hidden="true">↗</span></Link></nav>
    </header>

    <section className={styles.hero}>
      <div className={styles.copy}>
        <div className={styles.available}><span aria-hidden="true" />iOS 与 Android 已上线</div>
        <h1>把生活理清楚，<br />从下载知枝开始。</h1>
        <p className={styles.lead}>记下待办、安排提醒、整理零散想法。免费下载，打开知枝就能开始。</p>
        <div className={styles.quickActions}>
          <a className={styles.storeButton} href={ios.downloadUrl} target="_blank" rel="noreferrer">
            <span className={styles.storeMark} aria-hidden="true">iOS</span><span><small>前往 App Store</small><strong>下载 iOS 版</strong></span><b aria-hidden="true">↗</b>
          </a>
          <a className={styles.storeButton} href={android.downloadUrl} download>
            <span className={styles.apkMark} aria-hidden="true">APK</span><span><small>直接下载安装包</small><strong>下载 Android 版</strong></span><b aria-hidden="true">↓</b>
          </a>
        </div>
        <p className={styles.compatibility}>官方正版 · 基础功能免费 · Android 下载后请按系统提示安装</p>
      </div>

      <div className={styles.productStage} aria-label="知枝 App 界面预览">
        <div className={styles.versionFlag}>最新版本&nbsp; v{ios.versionName}</div>
        <div className={styles.phone}>
          <div className={styles.phoneTop}><span /><b>9:41</b><i /></div>
          <div className={styles.appHeader}><Image src="/images/zhizhi-icon.png" alt="" width={48} height={48} /><div><strong>知枝</strong><small>正在陪伴你</small></div><span className={styles.more} aria-hidden="true">•••</span></div>
          <div className={styles.today}>今天，周四</div>
          <div className={styles.messageMine}>晚上提醒我给薄荷浇水</div>
          <div className={styles.messageAi}><span>已经记下啦。</span><strong>给薄荷浇水</strong><small>今天 18:30&nbsp; · &nbsp;已创建提醒</small></div>
          <div className={styles.input}>和知枝说说吧 <b aria-hidden="true">↑</b></div>
        </div>
        <div className={styles.floatingNote}><span aria-hidden="true">✓</span><div><strong>提醒已创建</strong><small>生活的小事，也不会忘</small></div></div>
      </div>
    </section>

    <section className={styles.versions} aria-labelledby="version-title">
      <div className={styles.sectionIntro}><p>选择你的设备</p><h2 id="version-title">iPhone 或 Android，都可以。</h2><span>这里会显示知枝官方发布的最新版本。</span></div>
      <div className={styles.platformGrid}>
        <article className={styles.platformCard}>
          <div className={styles.platformHeading}><span className={styles.platformIcon} aria-hidden="true">iOS</span><div><small>iPhone 与 iPad</small><h3>iOS 版</h3></div><span className={styles.status}>已上线</span></div>
          <p>{ios.releaseNotes}</p><dl><div><dt>当前版本</dt><dd>v{ios.versionName}</dd></div><div><dt>发布日期</dt><dd>{releaseDate(ios.publishedAt)}</dd></div></dl>
          <a href={ios.downloadUrl} target="_blank" rel="noreferrer">前往 App Store <span aria-hidden="true">↗</span></a>
        </article>
        <article className={styles.platformCard}>
          <div className={styles.platformHeading}><span className={`${styles.platformIcon} ${styles.androidIcon}`} aria-hidden="true">APK</span><div><small>Android 手机与平板</small><h3>Android 版</h3></div><span className={styles.status}>可下载</span></div>
          <p>{android.releaseNotes}</p><dl><div><dt>当前版本</dt><dd>v{android.versionName}</dd></div><div><dt>发布日期</dt><dd>{releaseDate(android.publishedAt)}</dd></div></dl>
          <a href={android.downloadUrl} download>下载 APK 安装包 <span aria-hidden="true">↓</span></a>
        </article>
      </div>
    </section>

    <footer className={styles.footer}><span>© 2026 知枝 Zhizhi</span><div><a href="https://github.com/cocoyes/zhizhi-agent-runtime" target="_blank" rel="noreferrer">GitHub 开源</a><Link href="/privacy">隐私政策</Link><Link href="/terms">用户协议</Link><Link href="/support">安装帮助</Link></div></footer>
  </main>;
}
