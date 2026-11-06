import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";
import type { PrismicDocument } from "@prismicio/client";
import {
  ArrowLeft,
  ArrowUp,
  Check,
  Clock,
  Copy,
  HelpCircle,
  Newspaper,
  Share2,
  User,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import { createClient, PRISMIC_BLOG_TYPE, stripHtmlTags } from "@/lib/prismic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/blog_/$slug")({
  head: () => ({
    meta: [
      { title: "Blog Article — SignAny 2.0" },
      {
        name: "description",
        content:
          "Read the latest digital signature and enterprise compliance insights on the SignAny blog.",
      },
    ],
  }),
  component: BlogDetailPage,
});

// ── helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getText(doc: PrismicDocument, field: string): string {
  const val = doc.data?.[field];
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) return val[0].text ?? "";
  return "";
}

function getRichTextFallback(doc: PrismicDocument, fields: string[]) {
  for (const field of fields) {
    const val = doc.data?.[field];
    if (Array.isArray(val) && val.length > 0) return val;
  }
  return [];
}

function getRawHtmlFallback(doc: PrismicDocument, fields: string[]): string {
  for (const field of fields) {
    const val = doc.data?.[field];
    if (typeof val === "string" && val.trim().length > 0) return val.trim();
  }
  return "";
}

type RichTextBlock = { type?: string; text?: string };
type PrismicRichTextField = React.ComponentProps<typeof PrismicRichText>["field"];

function richTextToPlainText(value: unknown): string {
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

function getExcerpt(doc: PrismicDocument): string {
  const explicitExcerpt = getText(doc, "excerpt");
  if (explicitExcerpt) return stripHtmlTags(explicitExcerpt);
  const body = richTextToPlainText(
    doc.data?.Content || doc.data?.content || doc.data?.blog_content_editor || doc.data?.body
  );
  if (body) return body.length > 200 ? body.slice(0, 197) + "..." : body;
  return "";
}

function getImageUrl(doc: PrismicDocument): string {
  const img = doc.data?.cover_photo || doc.data?.featured_image || doc.data?.cover_image;
  return img?.url ?? "";
}

function getImageAlt(doc: PrismicDocument): string {
  const explicitAlt = getText(doc, "image_alt_tag");
  if (explicitAlt) return explicitAlt;
  const img = doc.data?.cover_photo || doc.data?.featured_image || doc.data?.cover_image;
  return img?.alt || getText(doc, "blog_title") || getText(doc, "title") || "Blog post cover";
}

function estimateReadTime(richText: RichTextBlock[]): number {
  const words = richText
    .map((block) => (typeof block.text === "string" ? stripHtmlTags(block.text) : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export type BlogFaq = {
  question: string;
  answer: string;
};

function getBlogFaqs(doc: PrismicDocument | null): BlogFaq[] {
  if (!doc?.data) return [];
  const list = doc.data.faqs || doc.data.FAQS || doc.data.faq_group || doc.data.faq;
  if (!Array.isArray(list)) return [];
  return list
    .map((item: any) => {
      const q =
        typeof item?.faq_question === "string"
          ? item.faq_question.trim()
          : Array.isArray(item?.faq_question)
          ? item.faq_question.map((b: any) => b?.text || "").join(" ").trim()
          : "";
      const a =
        typeof item?.faq_answer === "string"
          ? item.faq_answer.trim()
          : Array.isArray(item?.faq_answer)
          ? item.faq_answer.map((b: any) => b?.text || "").join(" ").trim()
          : "";
      return { question: q, answer: a };
    })
    .filter((f) => Boolean(f.question && f.answer));
}

// ── HTML & Table Analyzers ──────────────────────────────────────────────────

/**
 * Checks if raw text is a markdown table (e.g. | col 1 | col 2 |) and converts it to HTML.
 */
function markdownTableToHtml(markdown: string): string | null {
  if (!markdown || typeof markdown !== "string") return null;
  const lines = markdown
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return null;

  const isHeader = lines[0].startsWith("|") && lines[0].endsWith("|");
  const isDelimiter = /^\|(?:\s*:?-+:?\s*\|)+$/.test(lines[1]);
  if (!isHeader || !isDelimiter) return null;

  const parseRow = (line: string) => line.split("|").slice(1, -1).map((c) => c.trim());
  const headerCells = parseRow(lines[0]);
  const rows = lines.slice(2).map(parseRow);

  let html = `<div class="blog-table-wrapper"><table class="blog-table"><thead><tr>`;
  for (const h of headerCells) {
    html += `<th>${h}</th>`;
  }
  html += `</tr></thead><tbody>`;
  for (const r of rows) {
    html += `<tr>`;
    for (const c of r) {
      html += `<td>${c}</td>`;
    }
    html += `</tr>`;
  }
  html += `</tbody></table></div>`;
  return html;
}

/**
 * Analyzes whether text is an HTML block or contains an HTML table / element.
 */
function isHtmlBlock(raw: string): boolean {
  if (!raw || typeof raw !== "string") return false;
  let text = raw.trim();

  // If explicitly fenced with ```html or ```xml or ```htm
  if (/^```(?:html|xml|htm)\b/i.test(text)) return true;

  // Strip code fences if present
  const fenceRegex = /^```(?:html|xml|htm)?\s*\n?([\s\S]*?)\n?```$/i;
  const match = text.match(fenceRegex);
  if (match) text = match[1].trim();

  // Any table tags mean it's an HTML table
  if (/<\s*table\b/i.test(text)) return true;
  if (/<\s*(thead|tbody|tfoot|tr|th|td)\b/i.test(text)) return true;

  // Programming language keywords are code blocks, not HTML
  if (
    /^(?:const|let|var|function|import|export|class|def|npm|npx|yarn|pnpm|curl|git|docker)\b/.test(
      text
    )
  ) {
    return false;
  }

  // Matches common HTML block tags or closed HTML tag pairs
  if (/^<\s*([a-z][a-z0-9]*)\b[^>]*>[\s\S]*<\s*\/\s*\1\s*>$/i.test(text)) return true;
  if (
    /^<\s*(div|section|article|p|iframe|blockquote|style|figure|h[1-6]|ul|ol|li)\b/i.test(
      text
    )
  ) {
    return true;
  }

  return false;
}

/**
 * Extracts and cleans HTML content from code blocks or raw strings.
 */
function extractHtmlContent(raw: string): string | null {
  if (!raw || typeof raw !== "string") return null;
  let text = raw.trim();

  // Strip markdown code fences if wrapped in ```html ... ``` or ``` ... ```
  const fenceRegex = /^```(?:html|xml|htm)?\s*\n?([\s\S]*?)\n?```$/i;
  const match = text.match(fenceRegex);
  if (match) {
    text = match[1].trim();
  }

  if (isHtmlBlock(text)) {
    return text;
  }

  return null;
}

/**
 * Sanitizes HTML content, strips unsafe scripts/event handlers,
 * and wraps tables in responsive containers.
 */
function processAndSanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  // DOMParser path when in the browser
  if (typeof window !== "undefined") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHtml, "text/html");

      // Strip unsafe tags
      const dangerousTags = ["script", "noscript", "frame", "frameset"];
      dangerousTags.forEach((tag) => {
        doc.querySelectorAll(tag).forEach((el) => el.remove());
      });

      // Strip dangerous attributes (inline handlers, javascript: URIs)
      const allEls = doc.querySelectorAll("*");
      allEls.forEach((el) => {
        const attrs = Array.from(el.attributes);
        for (const attr of attrs) {
          if (/^on/i.test(attr.name)) {
            el.removeAttribute(attr.name);
          } else if (
            (attr.name === "href" || attr.name === "src") &&
            /^\s*javascript:/i.test(attr.value)
          ) {
            el.setAttribute(attr.name, "#");
          }
        }
      });

      // Ensure row colors (e.g. style="color:#fff") or dark backgrounds propagate to cells as inline styles
      const trs = doc.querySelectorAll("tr");
      trs.forEach((tr) => {
        const rowStyle = tr.getAttribute("style") || "";
        const colorMatch = rowStyle.match(/(?:^|;\s*)color\s*:\s*([^;]+)/i);
        const bgMatch = rowStyle.match(/(?:^|;\s*)background(?:-color)?\s*:\s*([^;]+)/i);

        const rowColor = colorMatch ? colorMatch[1].trim() : null;
        const rowBg = bgMatch ? bgMatch[1].trim() : null;

        tr.querySelectorAll("th, td").forEach((cell) => {
          const htmlCell = cell as HTMLElement;
          if (rowColor && !htmlCell.style.color) {
            htmlCell.style.color = rowColor;
          } else if (!htmlCell.style.color && rowBg) {
            const isDark =
              rowBg.includes("#1") ||
              rowBg.includes("#0") ||
              rowBg.includes("#2") ||
              rowBg.includes("#3") ||
              rowBg.includes("#4") ||
              rowBg.includes("navy") ||
              rowBg.includes("black");
            if (isDark) {
              htmlCell.style.color = "#ffffff";
            }
          }
        });
      });

      // Ensure all tables are wrapped inside a responsive container
      const tables = doc.querySelectorAll("table");
      tables.forEach((table) => {
        const parent = table.parentElement;
        if (
          !parent ||
          (!parent.classList.contains("blog-table-wrapper") &&
            !parent.classList.contains("overflow-x-auto"))
        ) {
          const wrapper = doc.createElement("div");
          wrapper.className = "blog-table-wrapper";
          parent?.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
      });

      return doc.body.innerHTML;
    } catch {
      // Fall through to regex processing
    }
  }

  // Regex fallback
  let cleaned = rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/href\s*=\s*(["'])javascript:[\s\S]*?\1/gi, 'href="#"')
    .replace(/\son\w+\s*=\s*(["'])[\s\S]*?\1/gi, "")
    .replace(/\son\w+\s*=\s*[^>\s]+/gi, "");

  // Propagate row color to cells in regex fallback
  cleaned = cleaned.replace(
    /<tr\b([^>]*style=["'][^"']*color\s*:\s*([^;'"\s]+)[^"']*["'][^>]*)>([\s\S]*?)<\/tr>/gi,
    (fullTr, trAttrs, rowColor, trContent) => {
      const updatedContent = trContent.replace(
        /<(th|td)\b([^>]*)>/gi,
        (match: string, tag: string, cellAttrs: string) => {
          if (/style=["'][^"']*color\s*:/i.test(cellAttrs)) return match;
          if (/style=["']/i.test(cellAttrs)) {
            return `<${tag} ${cellAttrs.replace(/style=(["'])/i, `style=$1color:${rowColor};`)}>`;
          }
          return `<${tag} style="color:${rowColor}" ${cellAttrs}>`;
        }
      );
      return `<tr ${trAttrs}>${updatedContent}</tr>`;
    }
  );

  cleaned = cleaned.replace(/(<table\b[\s\S]*?<\/table>)/gi, (match) => {
    return `<div class="blog-table-wrapper">${match}</div>`;
  });

  return cleaned;
}

// ── Components ─────────────────────────────────────────────────────────────

function BlogHtmlRenderer({ html }: { html: string }) {
  const processed = useMemo(() => processAndSanitizeHtml(html), [html]);
  return (
    <div
      className="blog-html-block not-prose my-6 max-w-full"
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}

function BlogCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-2xl border border-border bg-muted/40 overflow-hidden shadow-sm not-prose">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-muted/70 text-xs text-muted-foreground font-mono">
        <span className="font-semibold uppercase tracking-wider text-[11px]">Code</span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-sans hover:bg-background/80 hover:text-foreground transition-colors"
          title="Copy code"
        >
          {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed !bg-transparent !border-none !m-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const richTextComponents: JSXMapSerializer = {
  preformatted: ({ node }) => {
    const rawText = node.text || "";

    // 1. Markdown table
    const mdTableHtml = markdownTableToHtml(rawText);
    if (mdTableHtml) {
      return <BlogHtmlRenderer html={mdTableHtml} />;
    }

    // 2. HTML codeblock / table
    const cleanHtml = extractHtmlContent(rawText);
    if (cleanHtml) {
      return <BlogHtmlRenderer html={cleanHtml} />;
    }

    // 3. Regular codeblock
    return <BlogCodeBlock code={rawText} />;
  },

  paragraph: ({ node, children }) => {
    const rawText = node.text || "";

    // Markdown table inside paragraph
    const mdTableHtml = markdownTableToHtml(rawText);
    if (mdTableHtml) {
      return <BlogHtmlRenderer html={mdTableHtml} />;
    }

    // Raw HTML block or table inside paragraph
    if (isHtmlBlock(rawText)) {
      const cleanHtml = extractHtmlContent(rawText);
      if (cleanHtml) {
        return <BlogHtmlRenderer html={cleanHtml} />;
      }
    }

    return <p>{children}</p>;
  },
};

// ── Skeleton ───────────────────────────────────────────────────────────────

function PostSkeleton() {
  return (
    <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
      {/* Topbar */}
      <div className="h-5 w-40 rounded-full bg-muted" />
      {/* Cover */}
      <div className="aspect-video w-full rounded-3xl bg-muted" />
      {/* Title */}
      <div className="space-y-3 max-w-3xl mx-auto pt-4">
        <div className="h-8 w-3/4 rounded-lg bg-muted" />
        <div className="h-8 w-1/2 rounded-lg bg-muted" />
      </div>
      {/* Body lines */}
      <div className="max-w-3xl mx-auto space-y-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-4 rounded-lg bg-muted"
            style={{ width: `${70 + Math.random() * 30}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const [doc, setDoc] = useState<PrismicDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const fetchStarted = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  // Fetch post by UID
  useEffect(() => {
    if (fetchStarted.current) return;
    fetchStarted.current = true;

    let active = true;
    setLoading(true);
    setNotFound(false);
    setDoc(null);

    const client = createClient();

    client
      .getByUID(PRISMIC_BLOG_TYPE, slug)
      .then((result) => {
        if (!active) return;
        setDoc(result);
        setLoading(false);
      })
      .catch(async () => {
        if (!active) return;
        // UID not found — try searching all and matching by ID or alternate slugs
        try {
          const all = await client.getAllByType(PRISMIC_BLOG_TYPE);
          const match = all.find((d) => d.id === slug || d.uid === slug);
          if (active) {
            if (match) {
              setDoc(match);
            } else {
              setNotFound(true);
            }
            setLoading(false);
          }
        } catch {
          if (active) {
            setNotFound(true);
            setLoading(false);
          }
        }
      });

    return () => {
      active = false;
    };
  }, [slug]);

  // Update page title dynamically once doc is loaded
  useEffect(() => {
    if (!doc) return;
    const title = getText(doc, "blog_title") || getText(doc, "title");
    if (title) document.title = `${title} — SignAny Blog`;
  }, [doc]);

  const faqs = useMemo(() => getBlogFaqs(doc), [doc]);

  // Inject FAQPage JSON-LD schema dynamically for SEO rich results
  useEffect(() => {
    if (!doc || faqs.length === 0) return;
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "blog-faq-schema";
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("blog-faq-schema");
      if (existing) existing.remove();
    };
  }, [doc, faqs]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ── Not found state ───────────────────────────────────────────────────────
  if (!loading && notFound) {
    return (
      <ProductModeProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
          <Header />
          <main className="flex-1 pt-36 pb-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
              <Newspaper size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Article Not Found</h1>
            <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
              The blog article you are looking for may have been moved or unpublished.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={16} /> Back to All Articles
            </Link>
          </main>
          <Footer />
        </div>
      </ProductModeProvider>
    );
  }

  // ── Derived values (safe after loading) ──────────────────────────────────
  const title = doc ? getText(doc, "blog_title") || getText(doc, "title") : "";
  const excerpt = doc ? getExcerpt(doc) : "";
  const author = doc ? getText(doc, "author_name") || "SignAny Team" : "";
  const category = doc ? getText(doc, "catogary") || getText(doc, "category") : "";
  const date = doc
    ? formatDate(doc.data?.publish_date ?? doc.first_publication_date)
    : "";
  const coverUrl = doc ? getImageUrl(doc) : "";
  const coverAlt = doc ? getImageAlt(doc) : "";
  const body = doc
    ? getRichTextFallback(doc, [
        "Content",
        "content",
        "blog_content_editor",
        "body",
        "blog_body",
      ])
    : [];
  const rawHtmlFallback = doc
    ? getRawHtmlFallback(doc, [
        "Content",
        "content",
        "blog_content_editor",
        "body",
        "blog_body",
        "html_content",
      ])
    : "";

  const explicitReadTime = doc ? getText(doc, "reading_time") : "";
  const estimatedMinutes = body.length > 0 ? estimateReadTime(body as RichTextBlock[]) : null;
  const readTime = explicitReadTime
    ? `${explicitReadTime} min read`
    : estimatedMinutes
    ? `${estimatedMinutes} min read`
    : null;

  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Header />

        <main className="flex-1 pt-32 pb-20">
          <div className="section-shell">

            {/* Loading Skeleton */}
            {loading && <PostSkeleton />}

            {/* Article */}
            {!loading && doc && (
              <>
                {/* Top Navigation Bar */}
                <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 text-xs text-muted-foreground">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4"
                  >
                    <ArrowLeft size={15} /> Back to All Articles
                  </Link>
                  <div className="flex items-center gap-3">
                    {category && (
                      <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                        {category}
                      </span>
                    )}
                    {category && readTime && <span>•</span>}
                    {readTime && (
                      <span className="flex items-center gap-1 font-medium">
                        <Clock size={13} /> {readTime}
                      </span>
                    )}
                    {readTime && date && <span>•</span>}
                    {date && <span>{date}</span>}
                  </div>
                </div>

                {/* Hero Cover Image */}
                {coverUrl && (
                  <div className="max-w-4xl mx-auto mb-10 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-md aspect-video relative">
                    <img
                      src={coverUrl}
                      alt={coverAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Article Content */}
                <article className="max-w-3xl mx-auto">
                  {/* Header */}
                  <header className="mb-10 pb-8 border-b border-border/70">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
                      {title}
                    </h1>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm shadow-sm">
                          {initials || <User size={16} />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">{author}</div>
                          <div className="text-xs text-muted-foreground">
                            {getText(doc, "author_role") || "SignAny Contributor"}
                          </div>
                        </div>
                      </div>

                      {/* Share buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyLink}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                          title="Copy link to article"
                        >
                          {copied ? (
                            <Check size={14} className="text-green-600" />
                          ) : (
                            <Share2 size={14} />
                          )}
                          {copied ? "Copied!" : "Share"}
                        </button>
                      </div>
                    </div>
                  </header>

                  {/* Lead Excerpt */}
                  {excerpt && (
                    <div className="rounded-2xl border-l-4 border-primary bg-primary/5 p-6 mb-10 text-base md:text-lg font-medium leading-relaxed text-foreground/90">
                      {excerpt}
                    </div>
                  )}

                  {/* Rich Text Body */}
                  <div className="prose prose-neutral dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-foreground/90 blog-post-body">
                    {body.length > 0 ? (
                      <PrismicRichText
                        field={body as PrismicRichTextField}
                        components={richTextComponents}
                      />
                    ) : rawHtmlFallback ? (
                      <BlogHtmlRenderer html={rawHtmlFallback} />
                    ) : (
                      <p className="text-muted-foreground">
                        This article's content is coming soon. Check back later.
                      </p>
                    )}
                  </div>

                  {/* Blog FAQs Section */}
                  {faqs.length > 0 && (
                    <section className="mt-16 pt-12 border-t border-border/80">
                      <div className="mb-10 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-3 mx-auto">
                          <HelpCircle size={13} /> Frequently Asked Questions
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                          Frequently Asked Questions
                        </h2>
                        <p className="mt-2.5 text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
                          Common questions and answers related to this article.
                        </p>
                      </div>

                      <Accordion type="single" collapsible className="w-full space-y-3.5">
                        {faqs.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`blog-faq-${index}`}
                            className="group rounded-2xl border border-border/80 bg-card px-5 py-0.5 shadow-xs transition-all duration-200 hover:border-primary/40 data-[state=open]:border-primary/60 data-[state=open]:bg-primary/[0.02] data-[state=open]:shadow-sm"
                          >
                            <AccordionTrigger className="text-base md:text-lg font-semibold text-foreground transition-colors duration-200 hover:no-underline hover:text-primary data-[state=open]:text-primary group-data-[state=open]:text-primary py-4 text-left [&[data-state=open]>svg]:text-primary">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-4 pt-1 whitespace-pre-line">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </section>
                  )}
                </article>
              </>
            )}
          </div>
        </main>

        {/* Floating Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        )}

        <Footer />
      </div>
    </ProductModeProvider>
  );
}

export default BlogDetailPage;
