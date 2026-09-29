import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { termsDoc } from "@/content/legal";
import { ROUTES } from "@/content/navigation";
import LegalDocument from "@/components/legal/LegalDocument";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...termsDoc().seo, path: ROUTES.terms });
}

/** Terms of use (PRD §8.13). DRAFT until the client's legal adviser approves it: keep the draft banner. */
export default function TermsPage() {
  return <LegalDocument doc={termsDoc()} path={ROUTES.terms} />;
}
