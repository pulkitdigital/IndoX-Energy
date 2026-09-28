/**
 * Heading ids for blog articles. Used by lib/blog.ts (TOC from the raw markdown) AND by the h2/h3 MDX components,
 * so a TOC link always matches the rendered heading id. Pure, no Node APIs (safe anywhere).
 */
export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Plain text of a markdown heading line: drops emphasis, code ticks and link syntax. */
export function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}
