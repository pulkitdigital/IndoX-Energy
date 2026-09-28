"use client";

import { useState } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { articleCopy } from "@/content/blog-ui";

/**
 * Share bar (PRD §8.10): LinkedIn, WhatsApp and copy link. These are SHARE links for the reader (no IndoX contact,
 * no call/whatsapp analytics), so they are plain anchors — the one exception to the ContactLink rule.
 */
export default function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const { share } = articleCopy;
  const encodedUrl = encodeURIComponent(url);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const button = "hv-chip inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-semibold";

  return (
    <div className="flex flex-col gap-4 border-y border-border py-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="label-caps flex items-center gap-2 text-muted-foreground">
        <Share2 className="size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
        {share.title}
      </p>
      <div className="flex flex-wrap gap-2">
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={button}>
          <Link2 className="size-4 text-link" strokeWidth={1.5} aria-hidden="true" />
          {share.linkedin}
        </a>
        <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer" className={button}>
          <MessageCircle className="size-4 text-link" strokeWidth={1.5} aria-hidden="true" />
          {share.whatsapp}
        </a>
        <button type="button" onClick={copy} className={button}>
          {copied ? <Check className="size-4 text-accent" strokeWidth={2} aria-hidden="true" /> : <Link2 className="size-4 text-link" strokeWidth={1.5} aria-hidden="true" />}
          {copied ? share.copied : share.copy}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? share.copied : ""}
        </span>
      </div>
    </div>
  );
}
