import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { guides, getGuide } from "../data";
import { openGraphImage } from "../../metadata";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const url = `https://deepyou.top/guides/${slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: { type: "article", title: guide.title, description: guide.description, url, ...openGraphImage },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guides.filter((item) => item.slug !== slug).slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: "2026-08-13",
    dateModified: "2026-08-13",
    author: { "@type": "Organization", name: "知枝" },
    publisher: { "@type": "Organization", name: "知枝" },
    mainEntityOfPage: `https://deepyou.top/guides/${slug}`,
  };

  return <main className="article">
    <nav><Link href="/" className="brand"><i>枝</i>知枝</Link><Link href="/guides">全部指南</Link></nav>
    <article>
      <header>
        <p className="eyebrow">— {guide.category}</p>
        <h1>{guide.title}</h1>
        <p className="intro">{guide.intro}</p>
        <div className="meta">知枝编辑部　·　更新于 2026 年 8 月　·　{guide.read}</div>
      </header>
      <div className="toc"><b>本文要点</b>{guide.sections.map((section, index) => <a href={`#section-${index}`} key={section.title}>{index + 1}. {section.title}</a>)}</div>
      {guide.sections.map((section, index) => <section id={`section-${index}`} key={section.title}>
        <h2>{section.title}</h2><p>{section.body}</p>
        {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
      </section>)}
      <aside><b>少记一点琐事，多留一点从容。</b><p>知枝可以帮你记录、提醒、整理与思考。</p><Link href="/download">了解知枝 App　→</Link></aside>
    </article>
    <section className="related">
      <p className="eyebrow">— 延伸阅读</p><h2>继续了解 AI 与生活</h2>
      <div>{related.map((item) => <Link href={`/guides/${item.slug}`} key={item.slug}><small>{item.category}</small><h3>{item.title}</h3><b>阅读 →</b></Link>)}</div>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </main>;
}
