import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { privacyDoc } from "@/content/legal";
import { ROUTES } from "@/content/navigation";
import LegalDocument from "@/components/legal/LegalDocument";

export function generateMetadata(): Metadata {
  return buildMetadata({ ...privacyDoc().seo, path: ROUTES.privacy });
}

/** Privacy Policy (PRD §8.13). DRAFT until the client's legal adviser approves it: keep the draft banner. */
export default function PrivacyPage() {
  return <LegalDocument doc={privacyDoc()} path={ROUTES.privacy} />;
}
