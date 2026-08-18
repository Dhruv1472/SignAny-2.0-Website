import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Share2, Linkedin, Check, Sparkles, ArrowRight, ArrowUp, Newspaper } from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import { blogs } from "@/lib/site-data";

export const Route = createFileRoute("/blog_/$slug")({
  head: ({ params }) => {
    const blog = blogs.find((b) => b.slug === params.slug || b.id === params.slug);
    return {
      meta: [
        { title: blog ? `${blog.title} — SignAny Blog` : "Blog Article — SignAny 2.0" },
        { name: "description", content: blog?.excerpt || "Read the latest digital signature and enterprise compliance insights on the SignAny blog." },
      ],
    };
  },
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const blog = blogs.find((b) => b.slug === slug || b.id === slug);
  const relatedBlogs = blogs.filter((b) => b.id !== blog?.id).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!blog) {
    const noBlogsExist = blogs.length === 0;
    return (
      <ProductModeProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
          <Header />
          <main className="flex-1 pt-36 pb-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
              <Newspaper size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {noBlogsExist ? "No Blogs Published Yet" : "Article Not Found"}
            </h1>
            <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
              {noBlogsExist
                ? "There are currently no blog articles published on SignAny. Check back soon for the latest updates and insights!"
                : "The blog article you are looking for may have been moved or unpublished."}
            </p>
            <Link
              to={noBlogsExist ? "/" : "/blog"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={16} /> {noBlogsExist ? "Back to Home" : "Back to All Articles"}
            </Link>
          </main>
          <Footer />
        </div>
      </ProductModeProvider>
    );
  }

  const initials = blog.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Header />

        <main className="flex-1 pt-32 pb-20">
          <div className="section-shell">
            {/* Top Navigation Bar */}
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 text-xs text-muted-foreground">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4"
              >
                <ArrowLeft size={15} /> Back to All Articles
              </Link>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  {blog.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium"><Clock size={13} /> {blog.readTime}</span>
                <span>•</span>
                <span>{blog.date}</span>
              </div>
            </div>

            {/* Hero Cover Image */}
            <div className="max-w-4xl mx-auto mb-10 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-md aspect-video relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Article Content Box */}
            <article className="max-w-3xl mx-auto">
              {/* Header Title & Author */}
              <header className="mb-10 pb-8 border-b border-border/70">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
                  {blog.title}
                </h1>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm shadow-sm">
                      {initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{blog.author}</div>
                      <div className="text-xs text-muted-foreground">{blog.authorRole || "SignAny Contributor"}</div>
                    </div>
                  </div>

                  {/* Share buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      title="Copy link to article"
                    >
                      {copied ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
                      {copied ? "Copied!" : "Share"}
                    </button>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>
              </header>

              {/* Lead Excerpt Box */}
              <div className="rounded-2xl border-l-4 border-primary bg-primary/5 p-6 mb-10 text-base md:text-lg font-medium leading-relaxed text-foreground/90">
                {blog.excerpt}
              </div>

              {/* Rich Body Paragraphs */}
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/90">
                {blog.content?.map((paragraph, idx) => {
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h2 key={idx} className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 tracking-tight">
                        {paragraph.replace("### ", "")}
                      </h2>
                    );
                  }
                  return (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Key Takeaways Box */}
              <div className="mt-12 rounded-3xl border border-primary/20 bg-card p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-4">
                  <Sparkles size={16} /> Key Takeaways
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>Every digital signature created with SignAny 2.0 comes with a 256-bit AES encrypted SHA-256 audit log.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>Compliant with ESIGN Act, UETA, eIDAS (AES Level 2), UAE PASS, and Singapore ETA regulations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>Integrates seamlessly into existing Salesforce orgs or standalone web applications via REST API.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Related Articles Section */}
            {relatedBlogs.length > 0 && (
              <div className="max-w-4xl mx-auto mt-20 pt-12 border-t border-border/70">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-foreground">Related Articles</h3>
                  <Link to="/blog" className="text-sm font-bold text-primary hover:underline underline-offset-4">
                    View All Articles →
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedBlogs.map((rel) => (
                    <article
                      key={rel.id}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                    >
                      <Link to="/blog/$slug" params={{ slug: rel.slug }} className="block">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                          <img
                            src={rel.image}
                            alt={rel.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-border/50">
                            {rel.category}
                          </span>
                        </div>
                      </Link>
                      <div className="p-4 flex flex-1 flex-col">
                        <Link to="/blog/$slug" params={{ slug: rel.slug }}>
                          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 line-clamp-2">
                            {rel.title}
                          </h4>
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
                          {rel.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs font-semibold text-primary mt-auto">
                          <span>{rel.readTime}</span>
                          <Link to="/blog/$slug" params={{ slug: rel.slug }} className="hover:underline">
                            Read Article →
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
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
