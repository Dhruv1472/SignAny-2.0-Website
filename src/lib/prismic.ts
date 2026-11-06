import * as prismic from "@prismicio/client";
import type { PrismicDocument } from "@prismicio/client";

/**
 * The Prismic custom type (document type) used for SignAny blog posts.
 * This must match the API ID defined in your Prismic repository.
 */
export const PRISMIC_BLOG_TYPE = "signany_blogs";

/**
 * Creates a Prismic API client for the SignAny repository.
 *
 * Environment variables:
 *   VITE_PRISMIC_REPO         – Prismic repository name (falls back to hardcoded value)
 *   VITE_PRISMIC_ACCESS_TOKEN – Optional access token for private repositories
 */
export function createClient() {
  const repositoryName =
    (import.meta.env["VITE_PRISMIC_REPO"] as string | undefined) || "signany20";
  const accessToken = import.meta.env["VITE_PRISMIC_ACCESS_TOKEN"] as
    | string
    | undefined;

  const client = prismic.createClient(repositoryName, {
    ...(accessToken ? { accessToken } : {}),
  });

  return client;
}

// ── Shared Blog Data Extraction Helpers ─────────────────────────────────────

export function formatBlogDate(dateStr: string | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getBlogText(doc: PrismicDocument, field: string): string {
  const val = doc.data?.[field];
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) return val[0].text ?? "";
  return "";
}

export function getBlogImageUrl(doc: PrismicDocument): string {
  const img = doc.data?.cover_photo || doc.data?.featured_image || doc.data?.cover_image;
  return img?.url ?? "";
}

export function getBlogImageAlt(doc: PrismicDocument): string {
  const explicitAlt = getBlogText(doc, "image_alt_tag");
  if (explicitAlt) return explicitAlt;
  const img = doc.data?.cover_photo || doc.data?.featured_image || doc.data?.cover_image;
  return img?.alt || getBlogText(doc, "blog_title") || getBlogText(doc, "title") || "Blog post cover";
}

type RichTextBlock = { type?: string; text?: string };

export function stripHtmlTags(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/^```(?:html|xml|htm)?\s*\n?/i, "")
    .replace(/\n?```$/i, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function richTextToPlainText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const text = (block as RichTextBlock).text;
      return typeof text === "string" ? stripHtmlTags(text) : "";
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getBlogExcerpt(doc: PrismicDocument, maxLength = 150): string {
  const explicitExcerpt = getBlogText(doc, "excerpt");
  if (explicitExcerpt) return explicitExcerpt;
  const body = richTextToPlainText(
    doc.data?.Content || doc.data?.content || doc.data?.blog_content_editor || doc.data?.body
  );
  if (body) return body.length > maxLength ? body.slice(0, maxLength - 3) + "..." : body;
  return "";
}

export async function fetchAllBlogPosts(): Promise<PrismicDocument[]> {
  const client = createClient();

  const orderings: { field: string; direction: "desc" }[] = [
    { field: `my.${PRISMIC_BLOG_TYPE}.publish_date`, direction: "desc" },
    { field: "document.first_publication_date", direction: "desc" },
  ];

  for (const ordering of orderings) {
    try {
      return await client.getAllByType(PRISMIC_BLOG_TYPE, { orderings: [ordering] });
    } catch {
      // try next ordering
    }
  }

  try {
    return await client.getAllByType(PRISMIC_BLOG_TYPE);
  } catch (error) {
    console.error("[Blog] Fallback fetch failed", error);
    return [];
  }
}

