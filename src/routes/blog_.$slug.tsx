import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PrismicRichText } from "@prismicio/react";
import type { PrismicDocument } from "@prismicio/client";
import {
  ArrowLeft,
  ArrowUp,
  Check,
  Clock,
  Newspaper,
  Share2,
  User,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import { createClient, PRISMIC_BLOG_TYPE } from "@/lib/prismic";

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

type RichTextBlock = { type?: string; text?: string };
type PrismicRichTextField = React.ComponentProps<typeof PrismicRichText>["field"];

function richTextToPlainText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const text = (block as RichTextBlock).text;
      return typeof text === "string" ? text.trim() : "";
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(doc: PrismicDocument): string {
  const explicitExcerpt = getText(doc, "excerpt");
  if (explicitExcerpt) return explicitExcerpt;
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
    .map((block) => block.text ?? "")
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

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
                      <PrismicRichText field={body as PrismicRichTextField} />
                    ) : (
                      <p className="text-muted-foreground">
                        This article's content is coming soon. Check back later.
                      </p>
                    )}
                  </div>
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
