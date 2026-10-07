import { createFileRoute } from "@tanstack/react-router";
import { VerifyHashPage } from "./verifyHash";

const hashTitle = "Hash Verification for Documents | SignAny 2.0";
const hashDescription =
  "Verify a document's hash and check its integrity with SignAny 2.0. Use SHA-256 hash verification to detect whether a signed document has been altered.";
const hashOgDescription =
  "Verify document integrity with SHA-256 hash verification and check whether a signed document has been changed after signing.";

export const Route = createFileRoute("/hash-verification")({
  head: () => ({
    meta: [
      { title: hashTitle },
      { name: "description", content: hashDescription },
      {
        name: "keywords",
        content: "Hash Verification for Documents",
      },
      { property: "og:title", content: hashTitle },
      { property: "og:description", content: hashOgDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://esignany.com/hash-verification" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: hashTitle },
      { name: "twitter:description", content: hashDescription },
    ],
    links: [{ rel: "canonical", href: "https://esignany.com/hash-verification" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://esignany.com/",
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Hash Verification",
              "item": "https://esignany.com/hash-verification",
            },
          ],
        }),
      },
    ],
  }),
  component: VerifyHashPage,
});
