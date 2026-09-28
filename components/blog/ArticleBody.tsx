import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { splitAfterSection } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import InArticleCTA from "@/components/blog/InArticleCTA";

const options = { mdxOptions: { remarkPlugins: [remarkGfm] } };

/**
 * Article body, rendered at build time (next-mdx-remote/rsc + GFM tables / task lists). The body is split after the
 * 2nd H2 section so the in-article CTA sits there without authors placing it by hand.
 */
export default function ArticleBody({ body, related }: { body: string; related: { href: string; label: string } }) {
  const [before, after] = splitAfterSection(body, 2);
  return (
    <div className="max-w-[70ch]">
      <MDXRemote source={before} components={mdxComponents} options={options} />
      <InArticleCTA href={related.href} label={related.label} />
      {after ? <MDXRemote source={after} components={mdxComponents} options={options} /> : null}
    </div>
  );
}
