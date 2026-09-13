import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "技术支持",
  description: "知枝技术支持：获取登录、账号注销与问题反馈帮助，或联系知枝支持团队。",
  alternates: { canonical: "/support" },
};

const faqs = [
  {
    question: "无法登录怎么办？",
    answer:
      "请先确认网络连接正常，并使用注册时的登录方式重新尝试。你也可以更新至最新版知枝后再次登录。如果问题仍未解决，请将设备型号、系统版本和错误页面截图发送至支持邮箱；请勿在邮件中提供密码或验证码。",
  },
  {
    question: "如何注销账号？",
    answer:
      "登录知枝后，前往“设置－账号与安全－注销账号”，按照页面提示完成身份确认。如你暂时无法登录或没有看到注销入口，请使用注册账号关联的邮箱联系我们，我们会协助你处理。",
  },
  {
    question: "如何反馈问题？",
    answer:
      "请发送邮件至 support@deepyou.top，并尽量附上知枝版本、设备与系统版本、问题发生时间、复现步骤和相关截图。信息越完整，我们就越容易快速定位问题。",
  },
];

export default function SupportPage() {
  return (
    <>
      <header className="nav support-nav">
        <Link href="/" className="brand">
          <i>枝</i>知枝
        </Link>
        <nav aria-label="主要导航">
          <Link href="/">首页</Link>
          <Link href="/guides">知枝指南</Link>
          <Link href="/support" aria-current="page">支持</Link>
        </nav>
        <Link href="/download" className="button">下载 App</Link>
      </header>

      <main className="support-page">
        <section className="support-hero">
          <div className="support-hero-copy">
            <p className="eyebrow">— 知枝技术支持</p>
            <h1>有问题，<br /><em>我们一起解决。</em></h1>
            <p>
              如果你在使用知枝过程中遇到问题，或者有功能建议，欢迎联系我们。
              我们会认真阅读每一条反馈。
            </p>
            <a className="support-email" href="mailto:support@deepyou.top?subject=%E7%9F%A5%E6%9E%9D%E4%BD%BF%E7%94%A8%E9%97%AE%E9%A2%98">
              <span>联系邮箱</span>
              <strong>support@deepyou.top</strong>
              <b aria-hidden="true">↗</b>
            </a>
          </div>
          <div className="support-hero-art" aria-hidden="true">
            <div className="support-orbit support-orbit-one" />
            <div className="support-orbit support-orbit-two" />
            <div className="support-mark">枝</div>
            <span>我们在这里</span>
          </div>
        </section>

        <section className="support-links" aria-labelledby="support-links-title">
          <div>
            <p className="eyebrow">— 了解你的权利</p>
            <h2 id="support-links-title">政策与协议</h2>
            <p>清晰了解我们如何保护你的信息，以及使用知枝时双方共同遵守的约定。</p>
          </div>
          <div className="support-link-grid">
            <Link href="/privacy">
              <small>PRIVACY</small>
              <h3>隐私政策</h3>
              <p>了解个人信息的处理方式，以及你拥有的管理与控制权。</p>
              <b>查看隐私政策　→</b>
            </Link>
            <Link href="/terms">
              <small>TERMS</small>
              <h3>用户协议</h3>
              <p>了解知枝的服务内容、使用规则与重要注意事项。</p>
              <b>查看用户协议　→</b>
            </Link>
          </div>
        </section>

        <section className="support-faq" aria-labelledby="support-faq-title">
          <div className="support-faq-heading">
            <p className="eyebrow">— 常见问题</p>
            <h2 id="support-faq-title">也许答案<br />就在这里</h2>
            <p>没有找到需要的答案？欢迎发送邮件，我们会继续协助你。</p>
          </div>
          <div className="support-faq-list">
            {faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  <span>0{index + 1}</span>
                  {item.question}
                  <b aria-hidden="true">＋</b>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="support-bottom">
          <div>
            <p className="eyebrow">— 还需要帮助？</p>
            <h2>告诉我们发生了什么。</h2>
          </div>
          <a href="mailto:support@deepyou.top?subject=%E7%9F%A5%E6%9E%9D%E6%8A%80%E6%9C%AF%E6%94%AF%E6%8C%81">发送邮件　↗</a>
        </section>
      </main>

      <footer className="site-footer support-footer">
        <div>
          <Link href="/" className="brand"><i>枝</i>知枝</Link>
          <p>一个懂生活，也懂你的 AI 助手。</p>
        </div>
        <div>
          <b>探索</b>
          <Link href="/">首页</Link>
          <Link href="/guides">知枝指南</Link>
          <Link href="/download">下载 App</Link>
        </div>
        <div>
          <b>支持</b>
          <a href="mailto:support@deepyou.top">联系我们</a>
          <Link href="/privacy">隐私政策</Link>
          <Link href="/terms">用户协议</Link>
        </div>
        <p>© 2026 知枝 Zhizhi · 粤ICP备2025432144号-2</p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
    </>
  );
}
