import type { JsonLdObject } from "@/lib/seo";

type JsonLdProps = { data: JsonLdObject | JsonLdObject[] };

/** The JSON escape for "<", so content can never close the script tag. */
const LT_ESCAPE = ["\\", "u003c"].join("");

/** Renders schema.org JSON-LD. `<` is escaped so content can never break out of the script tag. */
export default function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, LT_ESCAPE) }} />;
}
