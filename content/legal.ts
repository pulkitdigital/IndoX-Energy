import { company, hasWhatsApp } from "@/content/company";
import { hasAnalytics, hasGa4, hasGoogleAds, hasMetaPixel, hasWeb3Forms } from "@/lib/integrations";

/**
 * Privacy Policy and Terms (PRD §8.13). DRAFT copy for the client's legal adviser: nothing here is final until
 * the client confirms in writing (see LEGAL_DRAFT_NOTICE). Never invent retention periods, court locations,
 * registrations or dates. Company facts come from content/company.ts; third-party services are listed only when
 * their env var is configured (lib/integrations.ts).
 */

/** Shown at the top and bottom of both legal pages. Remove only after the client confirms in writing. */
export const LEGAL_DRAFT_NOTICE = {
  title: "Draft for legal review",
  text: "Draft for legal review — not yet approved by IndoX Energy's legal adviser. Do not treat as final.",
};

export type LegalBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };
export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };
export type LegalDoc = {
  seo: { title: string; description: string };
  crumb: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

const p = (text: string): LegalBlock => ({ type: "p", text });
const ul = (...items: string[]): LegalBlock => ({ type: "ul", items });

/** Contact block shared by both documents. Address only when the client has supplied it. */
function contactBlocks(lead: string): LegalBlock[] {
  return [
    p(`${lead} ${company.legalName}:`),
    ul(`Email: ${company.email}`, `Toll-free: ${company.tollFree}`, ...(company.address ? [`Registered office: ${company.address}`] : [])),
  ];
}

const thirdParties: LegalBlock[] = [
  p("We use only the services below, and only where they are switched on for this website."),
  ul(
    ...(hasWeb3Forms ? ["Web3Forms delivers the enquiry forms to our team by email. Your form entries pass through their service on the way to us."] : []),
    ...(hasGa4 ? ["Google Analytics 4 shows us which pages are visited and how visitors move through the site. It loads only after you accept analytics cookies."] : []),
    ...(hasGoogleAds ? ["Google Ads measures whether our adverts lead to enquiries. It loads only after you accept analytics cookies."] : []),
    ...(hasMetaPixel ? ["Meta Pixel measures whether our adverts on Meta platforms lead to enquiries. It loads only after you accept analytics cookies."] : []),
  ),
  p("These providers have their own privacy policies. We do not control how they handle data on their side."),
];

export function privacyDoc(): LegalDoc {
  const sections: LegalSection[] = [
    {
      id: "data-we-collect",
      title: "Data we collect",
      blocks: [
        p("We collect only what you give us or what your browser shares when you use the site."),
        ul(
          "Quote form: name, company, mobile number, email, city, the fuel or service you need, expected volume, industry and any note you add.",
          "Short enquiry forms on product and service pages: name, mobile number and the requirement you select.",
          "Newsletter form: your email address.",
          "Choices stored in your browser: your theme (light or dark) and your cookie choice. A short summary of your last enquiry is kept for the current browser session so the thank-you page can greet you.",
          ...(hasAnalytics ? ["Usage data collected by analytics tools, only if you accept analytics cookies (see Cookies and similar storage)."] : []),
        ),
      ],
    },
    {
      id: "why-we-use-it",
      title: "Why we use your data",
      blocks: [
        p("We use your details to:"),
        ul(
          "call you back, understand your requirement and prepare a quote;",
          "answer questions you send us;",
          "send you updates and articles, if you subscribed to the newsletter;",
          "keep records of enquiries and improve how the site works.",
        ),
        p("We do not sell your data."),
      ],
    },
    ...(hasWeb3Forms || hasAnalytics ? [{ id: "third-party-services", title: "Third-party services", blocks: thirdParties }] : []),
    {
      id: "whatsapp",
      title: "WhatsApp and phone communication",
      blocks: [
        p(
          hasWhatsApp
            ? "If you message us on WhatsApp or call our number, we see the number and any details you share. WhatsApp is run by Meta and is subject to its own terms and privacy policy."
            : "You can reach us by phone. When WhatsApp is enabled on this site, messages you send are handled by WhatsApp under its own terms and privacy policy.",
        ),
        p("We use these conversations only to respond to your enquiry."),
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar storage",
      blocks: [
        p("The site groups cookies and browser storage into two categories."),
        ul(
          "Essential: remembers your theme and your cookie choice so the site works as you expect.",
          hasAnalytics
            ? "Analytics: helps us measure visits and adverts. These load only after you choose Accept in the cookie notice. If you choose Decline, or make no choice, they do not load."
            : "Analytics: no analytics or advertising tools are currently switched on for this site. If we add any, they will load only after you choose Accept in the cookie notice.",
        ),
        p("Your choice is saved in your browser. You can clear your browser storage at any time, and the notice will then ask you again."),
      ],
    },
    {
      id: "retention",
      title: "How long we keep data",
      blocks: [p("The retention period for enquiry and newsletter data will be confirmed by IndoX Energy's legal adviser before this policy is finalised. We will state it here once it is confirmed.")],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        p(`You can ask us to show you the data we hold about you, correct it, or delete it. Write to ${company.email} from the address you used and tell us what you need. You can also ask us to stop sending newsletters at any time.`),
      ],
    },
    {
      id: "children",
      title: "Children's data",
      blocks: [p("This site is for businesses. We do not knowingly collect data from children. If you think a child has sent us their details, write to us and we will delete them.")],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [p("We may update this policy. The current version is always on this page. If a change affects how we use your data, we will say so here.")],
    },
    { id: "contact", title: "Contact us", blocks: contactBlocks("Questions about this policy? Contact") },
  ];

  return {
    seo: {
      title: "Privacy Policy | IndoX Energy",
      description: "How IndoX Energy collects, uses and protects the details you share through our website forms, calls, WhatsApp and cookies.",
    },
    crumb: "Privacy Policy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "What we collect when you use this website, why we collect it, and the choices you have.",
    sections,
  };
}

export function termsDoc(): LegalDoc {
  return {
    seo: {
      title: "Terms of Use | IndoX Energy",
      description: "The terms for using the IndoX Energy website, including how enquiries and quotes work and the limits of the information shown.",
    },
    crumb: "Terms",
    eyebrow: "Legal",
    title: "Terms of use",
    intro: "The rules for using this website, and what a quote request does and does not mean.",
    sections: [
      {
        id: "acceptance",
        title: "Acceptance of terms",
        blocks: [p(`By using this website you agree to these terms. If you do not agree, please do not use the site. The website is operated by ${company.legalName}.`)],
      },
      {
        id: "use-of-website",
        title: "Use of the website",
        blocks: [
          p("You may use the site to learn about our products and services and to contact us. You agree not to:"),
          ul(
            "use the site in a way that is unlawful or harms others;",
            "try to reach parts of the site or its systems that are not meant for you;",
            "send false, misleading or automated enquiries;",
            "copy or scrape the site in bulk without our written permission.",
          ),
        ],
      },
      {
        id: "quotes-and-enquiries",
        title: "Quotes and enquiries",
        blocks: [
          p("Sending a quote request or enquiry does not create an order or a contract. It asks our team to contact you."),
          p("Actual supply, delivery and installation terms are agreed separately, in writing, between you and IndoX Energy."),
        ],
      },
      {
        id: "intellectual-property",
        title: "Intellectual property",
        blocks: [p("The text, images, logo, design and other content on this site belong to IndoX Energy or its licensors. You may view and share pages for your own business use. You may not copy, change or reuse the content for another purpose without our written permission.")],
      },
      {
        id: "no-warranty",
        title: "No warranty on availability, pricing or specifications",
        blocks: [
          p("Information on this site is general. Product availability, pricing, specifications and service coverage can change and may differ by location, quantity and customer."),
          p("All supply is subject to applicable laws, approvals and permissions, and to a separate agreement. Nothing on the site is an offer, a price or a guarantee."),
        ],
      },
      {
        id: "liability",
        title: "Limitation of liability",
        blocks: [p("To the extent the law allows, IndoX Energy is not liable for any loss that comes from using this website or relying on its content, including loss from interruptions or errors in the site. This does not limit any liability that cannot be limited by law.")],
      },
      {
        id: "third-party",
        title: "Third-party links and services",
        blocks: [p("The site may link to, or use, services run by others, such as form delivery, maps, messaging and analytics. We do not control them and are not responsible for their content or practices. Their own terms apply.")],
      },
      {
        id: "governing-law",
        title: "Governing law and jurisdiction",
        blocks: [
          p("These terms are governed by the laws of India."),
          p("Courts at [PLACEHOLDER: state and city to be confirmed by IndoX Energy and its legal adviser] will have jurisdiction over any dispute about these terms."),
        ],
      },
      {
        id: "changes",
        title: "Changes to these terms",
        blocks: [p("We may update these terms. The current version is always on this page, and using the site after a change means you accept the new terms.")],
      },
      { id: "contact", title: "Contact us", blocks: contactBlocks("Questions about these terms? Contact") },
    ],
  };
}
