import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Newspaper, Clock, User, ArrowRight, ArrowUp, Send, Search } from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import {
  fetchAllBlogPosts,
  formatBlogDate,
  getBlogText,
  getBlogImageUrl,
  getBlogImageAlt,
  getBlogExcerpt,
} from "@/lib/prismic";
import type { PrismicDocument } from "@prismicio/client";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "SignAny Blog | Insights on Digital Signatures & Enterprise Security" },
      {
        name: "description",
        content:
          "Stay up to date with the latest in digital signatures, enterprise security, and document workflow automation on the SignAny blog.",
      },
    ],
  }),
  component: BlogPage,
});

// Alias helpers for compatibility
const formatDate = formatBlogDate;
const getText = getBlogText;
const getImageUrl = getBlogImageUrl;
const getImageAlt = getBlogImageAlt;
const getExcerpt = getBlogExcerpt;
const fetchAllPosts = fetchAllBlogPosts;

// ── Skeleton ───────────────────────────────────────────────────────────────

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-2 shadow-sm animate-pulse">
      <div className="aspect-video w-full rounded-2xl bg-muted" />
      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="h-3 w-24 rounded-full bg-muted" />
        <div className="h-5 w-3/4 rounded-lg bg-muted" />
        <div className="h-4 w-full rounded-lg bg-muted" />
        <div className="h-4 w-5/6 rounded-lg bg-muted" />
      </div>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="mb-16 overflow-hidden rounded-[32px] border border-border/80 bg-card p-3 shadow-md animate-pulse">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        <div className="h-64 sm:h-80 lg:h-96 rounded-[24px] bg-muted" />
        <div className="p-4 sm:p-6 lg:p-8 space-y-4">
          <div className="h-3 w-32 rounded-full bg-muted" />
          <div className="h-8 w-3/4 rounded-lg bg-muted" />
          <div className="h-4 w-full rounded-lg bg-muted" />
          <div className="h-4 w-5/6 rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PrismicDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchAllPosts()
      .then((docs) => {
        if (!active) return;
        setPosts(docs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blog posts:", err);
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const featuredPost = posts[0];

  const filteredPosts = posts.filter((doc) => {
    const q = searchQuery.toLowerCase();
    return (
      getText(doc, "blog_title").toLowerCase().includes(q) ||
      getText(doc, "title").toLowerCase().includes(q) ||
      getExcerpt(doc).toLowerCase().includes(q) ||
      getText(doc, "catogary").toLowerCase().includes(q) ||
      getText(doc, "category").toLowerCase().includes(q)
    );
  });

  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Header />

        <main className="flex-1 pt-32 pb-20">
          <div className="section-shell">
            {/* Header Section */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <Newspaper size={14} />
                Insights &amp; Updates
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                The SignAny Blog
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Stay up to date with the latest in digital signatures, enterprise security, and document workflow automation.
              </p>

              {/* Search Bar (only if we have posts or finished loading) */}
              {(!loading || posts.length > 0) && (
                <div className="relative mt-8 max-w-xl mx-auto">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Search articles by title, topic, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-card pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              )}
            </div>

            {/* Loading Skeletons */}
            {loading && (
              <>
                <FeaturedSkeleton />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                  {[...Array(3)].map((_, i) => (
                    <BlogCardSkeleton key={i} />
                  ))}
                </div>
              </>
            )}

            {/* Empty state — no posts published */}
            {!loading && posts.length === 0 && (
              <div className="max-w-xl mx-auto text-center py-16 px-6 rounded-3xl border border-border/80 bg-card shadow-sm mb-20">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <Newspaper size={32} />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">No Blogs Published Yet</h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  We haven't published any articles yet. Check back soon for the latest news, expert guides, and product updates!
                </p>
              </div>
            )}

            {/* Search returned no results */}
            {!loading && posts.length > 0 && filteredPosts.length === 0 && (
              <div className="max-w-xl mx-auto text-center py-16 px-6 rounded-3xl border border-border/80 bg-card shadow-sm mb-20">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <Search size={32} />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">No Articles Found</h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  We couldn't find any articles matching "
                  <span className="font-semibold text-foreground">{searchQuery}</span>
                  ". Try searching for another topic or clear your search query.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Content */}
            {!loading && filteredPosts.length > 0 && (
              <>
                {/* Featured Article */}
                {/* {searchQuery === "" && featuredPost && (
                  <div className="mb-16">
                    <div className="group relative overflow-hidden rounded-[32px] border border-border/80 bg-card p-3 shadow-md hover:border-primary/40 transition-all duration-300">
                      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                        <div className="h-64 sm:h-80 lg:h-96 rounded-[24px] overflow-hidden relative">
                          <img
                            src={getImageUrl(featuredPost) || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"}
                            alt={getImageAlt(featuredPost)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                          <span className="absolute top-4 left-4 rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                            Featured Article
                          </span>
                        </div>
                        <div className="p-4 sm:p-6 lg:p-8">
                          <div className="flex items-center gap-3 mb-3 sm:mb-4 text-xs text-muted-foreground">
                            {(getText(featuredPost, "catogary") || getText(featuredPost, "category")) && (
                              <>
                                <span className="font-bold text-primary uppercase tracking-wider text-[11px]">
                                  {getText(featuredPost, "catogary") || getText(featuredPost, "category")}
                                </span>
                                <span>•</span>
                              </>
                            )}
                            <span>{formatDate(featuredPost.data?.publish_date ?? featuredPost.first_publication_date)}</span>
                            {getText(featuredPost, "reading_time") && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1 font-medium">
                                  <Clock size={12} /> {getText(featuredPost, "reading_time")} min read
                                </span>
                              </>
                            )}
                          </div>
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors leading-tight">
                            {getText(featuredPost, "blog_title") || getText(featuredPost, "title")}
                          </h2>
                          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                            {getExcerpt(featuredPost)}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-border/60">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                                {(getText(featuredPost, "author_name") || "S")[0].toUpperCase()}
                              </div>
                              <span className="text-xs font-semibold text-foreground">
                                {getText(featuredPost, "author_name") || "SignAny Team"}
                              </span>
                            </div>
                            <Link
                              to="/blog/$slug"
                              params={{ slug: featuredPost.uid || featuredPost.id }}
                              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4"
                            >
                              Read Article <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                  {filteredPosts.map((doc) => {
                    const title = getText(doc, "blog_title") || getText(doc, "title");
                    const excerpt = getExcerpt(doc);
                    const imageUrl = getImageUrl(doc);
                    const imageAlt = getImageAlt(doc);
                    const date = formatDate(doc.data?.publish_date ?? doc.first_publication_date);
                    const author = getText(doc, "author_name") || "SignAny Team";
                    const category = getText(doc, "catogary") || getText(doc, "category");
                    const readTime = getText(doc, "reading_time");
                    const slug = doc.uid || doc.id;

                    return (
                      <article
                        key={doc.id}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                      >
                        <Link to="/blog/$slug" params={{ slug }} className="block">
                          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                            <img
                              src={imageUrl || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600"}
                              alt={imageAlt}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            {category && (
                              <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-border/50">
                                {category}
                              </span>
                            )}
                          </div>
                        </Link>

                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                            {readTime && (
                              <span className="flex items-center gap-1 font-medium">
                                <Clock size={12} /> {readTime} min read
                              </span>
                            )}
                            {readTime && <span>•</span>}
                            <span>{date}</span>
                          </div>

                          <Link to="/blog/$slug" params={{ slug }}>
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 line-clamp-2">
                              {title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed flex-1">
                            {excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-auto">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                              <User size={13} /> {author}
                            </div>
                            <Link
                              to="/blog/$slug"
                              params={{ slug }}
                              className="text-xs font-bold text-primary hover:underline underline-offset-4"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}

            {/* Book Demo CTA Card */}
            <div className="surface-ink p-10 md:p-14 rounded-3xl text-center relative overflow-hidden shadow-xl border border-ink-foreground/10">
              <div className="glow-orb -top-10 right-10 h-48 w-48 bg-primary" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold text-ink-foreground mb-4">
                  Ready to Automate Your Signatures?
                </h2>
                <p className="text-ink-muted text-sm md:text-base mb-8 leading-relaxed">
                  Book a 1-on-1 personalized demo with our document workflow experts and see SignAny 2.0 mapped to your business needs.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const trimmedEmail = email.trim();
                    if (trimmedEmail) {
                      navigate({ to: "/contact-us", search: { email: trimmedEmail } as any });
                    } else {
                      navigate({ to: "/contact-us" });
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3 items-center max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email..."
                    className="w-full px-5 py-3.5 rounded-xl bg-ink-foreground/10 border border-ink-foreground/20 text-ink-foreground placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shrink-0 shadow-md"
                  >
                    Book a Demo <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
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

export default BlogPage;
