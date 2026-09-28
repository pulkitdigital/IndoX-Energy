import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { formatPostDate } from "@/lib/format";
import { REVEAL } from "@/lib/motion";
import { getAllPosts, getPost, type Post } from "@/lib/blog";
import { SITE_URL } from "@/content/company";
import { articleCopy, blogIndex } from "@/content/blog-ui";
import { images } from "@/content/images";
import { ROUTES, blogHref } from "@/content/navigation";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import QuoteCTABand from "@/components/layout/QuoteCTABand";
import ArticleBody from "@/components/blog/ArticleBody";
import AuthorBox from "@/components/blog/AuthorBox";
import BlogCard from "@/components/blog/BlogCard";
import ShareBar from "@/components/blog/ShareBar";
import TableOfContents from "@/components/blog/TableOfContents";
import FigureFrame from "@/components/ui/FigureFrame";
import ImageSlot from "@/components/ui/ImageSlot";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";

/** Article template (PRD §8.10). Every post is known at build time. */
export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const image = images[post.heroImage];
  return buildMetadata({
    title: `${post.title} | IndoX Energy`,
    description: post.excerpt,
    path: blogHref(post.slug),
    image: { src: image.src, alt: image.alt, width: image.width, height: image.height },
    article: { publishedTime: post.date, section: post.category },
  });
}

/** 3 related posts: same category first (newest first), then the latest of the rest. */
function relatedPosts(post: Post, all: Post[]): Post[] {
  const others = all.filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const path = blogHref(post.slug);
  const related = relatedPosts(post, getAllPosts());

  return (
    <>
      {/* Header */}
      <section aria-labelledby="article-title" className="pt-28 pb-10 sm:pt-32 lg:pt-36 lg:pb-14">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "Home", href: ROUTES.home },
              { label: "Blog", href: ROUTES.blog },
              { label: post.title, href: path },
            ]}
          />
          <ScrollReveal className="mt-10 max-w-4xl">
            <p className="label-caps text-accent">{post.category}</p>
            <h1 id="article-title" className="text-section mt-4">
              {post.title}
            </h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg">{post.excerpt}</p>
            <p className="label-caps mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
              <span>
                {articleCopy.by} <span className="text-foreground">{post.author.name}</span>
              </span>
              <span aria-hidden="true">/</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">/</span>
              <span>{blogIndex.readTime(post.readingMinutes)}</span>
            </p>
          </ScrollReveal>
          <ScrollReveal className="mt-10" delay={REVEAL.stagger}>
            <FigureFrame frameClassName="aspect-[16/9]">
              <ImageSlot slot={post.heroImage} fill priority framed={false} zoomOnHover={false} />
            </FigureFrame>
          </ScrollReveal>
        </div>
      </section>

      {/* TOC + body */}
      <section aria-label={post.title} className="pb-16 lg:pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:row-span-2">
            <TableOfContents headings={post.headings} />
          </aside>
          <article>
            <ArticleBody body={post.body} related={post.relatedLink} />
            <div className="mt-14 max-w-[70ch]">
              <ShareBar url={`${SITE_URL}${path}`} title={post.title} />
              <AuthorBox name={post.author.name} role={post.author.role} />
            </div>
          </article>
        </div>
      </section>

      {/* Related articles */}
      {related.length ? (
        <section aria-labelledby="related-articles-title" className="section-y border-y border-border bg-elevated">
          <div className="container-x">
            <SectionHeading id="related-articles-title" eyebrow={articleCopy.related.eyebrow} title={articleCopy.related.title} />
            <ul className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <li key={item.slug}>
                  <ScrollReveal delay={i * REVEAL.stagger} className="h-full">
                    <BlogCard
                      post={{
                        href: blogHref(item.slug),
                        title: item.title,
                        excerpt: item.excerpt,
                        category: item.category,
                        date: item.date,
                        image: item.heroImage,
                        readingMinutes: item.readingMinutes,
                      }}
                      readMore={blogIndex.readMore}
                      excerptLines={2}
                    />
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <QuoteCTABand index="" />

      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          path,
          image: images[post.heroImage].src,
          datePublished: post.date,
          authorName: post.author.name,
          section: post.category,
        })}
      />
    </>
  );
}
