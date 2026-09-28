/**
 * UI copy for the blog listing, article template and newsletter form. Article content itself lives in
 * content/blog/*.mdx (read at build time by lib/blog.ts).
 */

export const blogIndex = {
  seo: {
    title: "Blog: Fuel Intelligence Insights | IndoX Energy",
    description:
      "Practical guides for site and operations managers on diesel supply, storage and safety, fuel monitoring, theft prevention and EV charging.",
  },
  hero: {
    eyebrow: "Blog",
    title: "Fuel intelligence insights",
    intro: "Practical notes for site and operations managers: diesel supply, storage, monitoring, safety and EV charging.",
  },
  search: { label: "Search articles", placeholder: "Search by topic, e.g. ATG or delivery" },
  categoriesLabel: "Filter by category",
  all: "All",
  featured: "Featured",
  results: (count: number) => `${count} ${count === 1 ? "article" : "articles"}`,
  empty: { title: "No articles found", text: "Try a different search, or pick another category.", reset: "Clear filters" },
  pagination: { label: "Pagination", previous: "Previous", next: "Next", page: (n: number) => `Page ${n}` },
  readMore: "Read article",
  readTime: (minutes: number) => `${minutes} min read`,
};

export const newsletterCopy = {
  index: "02",
  eyebrow: "Newsletter",
  title: "New articles in your inbox",
  description: "Occasional emails when we publish something new. No spam; unsubscribe any time.",
  label: "Email address",
  placeholder: "name@company.com",
  submit: "Subscribe",
  sending: "Subscribing…",
  success: "Thanks. You're on the list.",
  failure: "We couldn't sign you up just now. Your email is still here; please try again.",
  error: "Enter a valid email address.",
};

export const articleCopy = {
  by: "By",
  toc: "On this page",
  share: { title: "Share this article", linkedin: "Share on LinkedIn", whatsapp: "Share on WhatsApp", copy: "Copy link", copied: "Link copied" },
  author: { line: "Practical notes for site and operations managers, written by the IndoX Energy team." },
  cta: { eyebrow: "Related", text: "See how this works in practice, and what IndoX can take off your hands.", action: "Learn more" },
  related: { eyebrow: "Keep reading", title: "Related articles" },
};
