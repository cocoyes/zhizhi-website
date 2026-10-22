import Link from "next/link";
import type { Metadata } from "next";
import { openGraphImage } from "./metadata";

export const metadata: Metadata = {
  description: "知枝是一款面向个人与家庭的AI智能生活助手，提供智能对话、智囊团多角度决策、智能提醒、时间管理、物品位置记录及AI辅助创作等功能。持续探索AI Agent、日程规划、生活记录与家庭协作，让AI帮助你思考问题、记住琐事、管理生活，成为懂你所想、陪你成长的智能伙伴。",
  alternates: { canonical: "/" },
  openGraph: { url: "https://deepyou.top/", ...openGraphImage },
};

const features = [
  { icon: "◴", tag: "时间管家", title: "重要的事，知枝替你记得", text: "纪念日、物品位置、待办与生活琐事，知枝把散落的信息妥帖收好，在恰当的时候轻轻提醒。" },
  { icon: "◇", tag: "智囊团", title: "复杂的事，陪你慢慢想清楚", text: "从一团乱麻到清晰选择，理解上下文、梳理利弊，但始终把最终决定留给你。" },
  { icon: "✎", tag: "创作空间", title: "每个灵感，都值得认真长大", text: "写作、计划、表达与脑暴，把一闪而过的念头，变成能够真正开始的下一步。" },
];

const posts = [
  { slug: "what-is-ai-assistant", title: "AI 助手是什么？2026 年完整入门指南", desc: "从工作原理、常见功能到使用场景，一篇读懂智能 AI 助手。" },
  { slug: "best-ai-assistant-for-daily-life", title: "如何选择适合日常生活的 AI 助手？", desc: "从记忆、提醒、隐私和自然对话五个维度做选择。" },
  { slug: "ai-reminder-and-life-management", title: "如何用 AI 做日程提醒与生活管理", desc: "建立一套轻量、可坚持的 AI 生活管理方法。" },
];

const faq = [
  { q: "知枝是什么？", a: "知枝是一款面向日常生活的 AI 助手，帮助你对话、记录、提醒、整理信息、辅助决策与创作。" },
  { q: "知枝和普通聊天机器人有什么不同？", a: "知枝更关注长期陪伴与真实生活场景，会结合上下文继续协助，而不是每次都从头问起。" },
  { q: "知枝支持哪些设备？", a: "知枝现已提供 iOS 与 Android 版本，可在下载页面获取。" },
];

const sceneExamples = [
  "牛奶开封了，三天后提醒我喝完。",
  "周末爸妈来深圳，帮我安排轻松一点的行程。",
  "这件事我有点纠结，陪我梳理一下。",
  "把今天零散的想法整理成一份计划。",
];

const sceneLabels = ["物品与保质期提醒", "计划与出行建议", "分析与情绪陪伴", "信息整理与创作"];

export default function Home() {
  return <>
    <header className="nav">
      <Link href="/" className="brand"><i>枝</i>知枝</Link>
      <nav><a href="#features">能力</a><Link href="/guides">知枝指南</Link><a href="#about">关于</a></nav>
      <Link href="/download" className="button">下载 App</Link>
    </header>
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">— 懂你，也懂生活</p>
          <h1>日子纷繁，<br /><em>我替你记得。</em></h1>
          <p className="lead">知枝，是一位温柔、可靠的 AI 生活助手。<br />陪你记住琐碎，想清难题，也照料每一个值得认真对待的日常。</p>
          <p className="actions"><Link href="/download" className="button">免费下载知枝　↗</Link><a href="#features">先认识一下　↓</a></p>
          <small>现已支持 iOS 与 Android · 基础功能免费</small>
        </div>
        <div className="visual">
          <div className="halo" />
          <div className="phone">
            <header><i>枝</i><b>知枝<small>正在陪伴你</small></b><span>•••</span></header>
            <section>
              <time>今天，周四</time>
              <p className="me">我总忘记阳台那盆薄荷要浇水</p>
              <p className="ai">那就交给我吧。<br />每周一、周四傍晚提醒你，好吗？<b>🌿　给薄荷浇水<small>每周一、周四 18:30　·　已记下</small></b></p>
            </section>
            <footer>和知枝说说吧　　↑</footer>
          </div>
          <label>✦ 事情再多，也不慌</label>
        </div>
      </section>
      <section className="trust">
        <span>把零散的小事交给知枝，生活就能多留一点余地。</span>
        <b>✦ 理解上下文　　◌ 生活记忆　　⌁ 主动提醒　　♧ 多智能体协作</b>
      </section>
      <section className="section" id="features">
        <p className="eyebrow">— 知枝能为你做什么</p>
        <h2>生活的枝枝蔓蔓，<br />都有迹可循。</h2>
        <p className="sub">记一句话，少惦记一件事。知枝把提醒、整理和思考放进你原本的生活里。</p>
        <div className="features">
          {features.map((feature, index) => <article key={feature.title}>
            <sup>0{index + 1}</sup><strong>{feature.icon}</strong><small>{feature.tag}</small>
            <h3>{feature.title}</h3><p>{feature.text}</p><a href="#scenes">了解更多　→</a>
          </article>)}
        </div>
      </section>
      <section className="scenes" id="scenes">
        <div>
          <p className="eyebrow">— 就像多了一个懂你的朋友</p>
          <h2>一句话，<br />让生活轻一点。</h2>
          <p>不需要学习复杂指令。像和熟悉的人说话一样，告诉知枝你想做什么。</p>
          <blockquote>“真正好的工具，不该让人感觉到工具的存在。”</blockquote>
        </div>
        <div>{sceneExamples.map((example, index) => <p key={example}><i>0{index + 1}</i>“{example}”<small>{sceneLabels[index]}</small></p>)}</div>
      </section>
      <section className="section journal">
        <div className="section-row">
          <div><p className="eyebrow">— 知枝指南</p><h2>与 AI 一起，<br />更好地生活。</h2></div>
          <Link href="/guides">阅读全部文章　↗</Link>
        </div>
        <div className="posts">
          {posts.map((post, index) => <Link href={`/guides/${post.slug}`} key={post.slug}>
            <figure><b>{["知", "择", "时"][index]}</b><small>AI 助手指南</small></figure>
            <div><small>实用指南 · 7 分钟阅读</small><h3>{post.title}</h3><p>{post.desc}</p><b>阅读全文 →</b></div>
          </Link>)}
        </div>
      </section>
      <section className="cta" id="about">
        <div><i>枝</i><p className="eyebrow">— 从今天起</p><h2>让知枝，<br />陪你认真生活。</h2><p>每一件小事，都值得被好好记住。</p><Link href="/download">前往下载页　↗</Link></div>
        <blockquote>“知其纷繁，<br />守其本心。<br /><em>枝叶生长，自有方向。</em>”</blockquote>
      </section>
      <section className="section faq">
        <div><p className="eyebrow">— 常见问题</p><h2>你可能想知道</h2></div>
        <div>{faq.map((item) => <details key={item.q}><summary>{item.q}<b>＋</b></summary><p>{item.a}</p></details>)}</div>
      </section>
    </main>
    <footer className="site-footer">
      <div><Link href="/" className="brand"><i>枝</i>知枝</Link><p>一个懂生活，也懂你的 AI 助手。</p></div>
      <div><b>探索</b><a href="#features">产品能力</a><Link href="/guides">知枝指南</Link><Link href="/download">下载 App</Link><a href="https://github.com/cocoyes/zhizhi-agent-runtime" target="_blank" rel="noreferrer">GitHub 开源</a></div>
      <div><b>支持</b><Link href="/support">技术支持</Link><Link href="/privacy">隐私政策</Link><Link href="/terms">用户协议</Link></div>
      <p>© 2026 知枝 Zhizhi · 粤ICP备2025432144号-2</p>
    </footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "@id": "https://deepyou.top/#software", name: "知枝 - AI生活助手", alternateName: ["知枝", "知枝AI", "Zhizhi", "知枝智能生活助手"], url: "https://deepyou.top/", description: "知枝是一款面向个人与家庭的AI智能生活助手，提供智能对话、智囊团多角度决策、时间管理、智能提醒、物品位置记录与创作辅助等功能。产品持续探索AI Agent、日程规划、生活记录和家庭协作，让AI帮助用户整理信息、分析问题、管理日常事务，成为懂你所想、陪你成长的智能生活伙伴。", applicationCategory: "LifestyleApplication", operatingSystem: "iOS, Android", inLanguage: "zh-CN", featureList: ["AI智能对话", "智囊团多角度决策分析", "时间管理与智能提醒", "物品位置记录与管理", "AI辅助创作"], offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" }, downloadUrl: "https://deepyou.top/download", installUrl: "https://apps.apple.com/cn/app/id6804439312" }) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }} />
  </>;
}
