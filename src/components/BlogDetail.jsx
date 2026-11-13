
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaUser,
} from "react-icons/fa";

// ==========================================
// API CONFIGURATION
// ==========================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const BLOG_API = `${API_URL}/api/blogs`;

// ==========================================
// HELPERS
// ==========================================

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// ==========================================
// BLOG DETAIL COMPONENT
// ==========================================

const BlogDetail = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH SINGLE BLOG
  // ==========================================

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError("");

        setPost(null);
        setRelatedPosts([]);

        const response = await fetch(
          `${BLOG_API}/${encodeURIComponent(slug)}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Article not found"
          );
        }

        setPost(result.data);
        setRelatedPosts(result.related || []);
      } catch (error) {
        console.error("Blog Detail Error:", error);
        setError(error.message || "Unable to load article.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogDetail();
    }
  }, [slug]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-background px-6 py-20">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="mb-6 h-5 w-32 rounded bg-border" />
          <div className="mb-5 h-12 rounded bg-border" />
          <div className="mb-8 h-5 w-2/3 rounded bg-border" />
          <div className="h-96 rounded-xl bg-border" />
        </div>
      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !post) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-6 text-center">
        <h2 className="mb-3 text-3xl font-bold text-primary">
          Article Not Found
        </h2>

        <p className="mb-6 text-muted">
          {error || "The requested article is unavailable."}
        </p>

        <Link
          to="/blog"
          className="rounded-lg bg-primary px-6 py-3 text-white transition hover:opacity-90"
        >
          Back to Blogs
        </Link>
      </section>
    );
  }

  // ==========================================
  // BLOG DATA
  // ==========================================

  const coverImage = post.coverImage?.url;

  const sanitizedContent = DOMPurify.sanitize(
    post.content || ""
  );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="bg-background">

      {/* ARTICLE HEADER */}

      <section className="px-6 pb-10 pt-16 md:pt-24">
        <div className="mx-auto max-w-4xl">

          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
          >
            <FaArrowLeft />
            Back to Insights
          </Link>

          {/* CATEGORY */}

          <div className="mb-5">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {post.category}
            </span>
          </div>

          {/* TITLE */}

          <h1 className="mb-6 text-3xl font-bold leading-tight text-primary md:text-5xl">
            {post.title}
          </h1>

          {/* EXCERPT */}

          {post.excerpt && (
            <p className="mb-8 text-lg leading-relaxed text-muted md:text-xl">
              {post.excerpt}
            </p>
          )}

          {/* META INFORMATION */}

          <div className="flex flex-wrap gap-x-6 gap-y-4 border-y border-border py-5 text-sm text-muted">

            <div className="flex items-center gap-2">
              <FaUser className="text-secondary" />
              <span>{post.author || "Tectonic Engineering"}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-secondary" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="text-secondary" />
              <span>{post.readTime || 1} min read</span>
            </div>

            <div className="flex items-center gap-2">
              <FaEye className="text-secondary" />
              <span>{post.views || 0} views</span>
            </div>

          </div>
        </div>
      </section>

      {/* COVER IMAGE */}

      {coverImage && (
        <section className="px-6">
          <div className="mx-auto max-w-5xl">
            <img
              src={coverImage}
              alt={post.coverImageAlt || post.title}
              className="max-h-[550px] w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        </section>
      )}

      {/* ARTICLE CONTENT */}

      <section className="px-6 py-12 md:py-16">
        <article className="mx-auto max-w-4xl">

          <div
            className="
              text-body leading-8
              [&_h2]:mb-5 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary
              [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-primary
              [&_p]:mb-6
              [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mb-2
              [&_a]:text-primary [&_a]:underline
              [&_strong]:font-bold
              [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-secondary [&_blockquote]:pl-5 [&_blockquote]:italic
              [&_img]:my-8 [&_img]:rounded-xl
            "
            dangerouslySetInnerHTML={{
              __html: sanitizedContent,
            }}
          />

          {/* TAGS */}

          {post.tags?.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="mb-4 font-semibold text-primary">
                Related Tags
              </h3>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-body"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </article>
      </section>

      {/* RELATED ARTICLES */}

      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-surface px-6 py-16">
          <div className="mx-auto max-w-6xl">

            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary md:text-3xl">
                  Related Insights
                </h2>

                <p className="mt-2 text-muted">
                  Explore more articles from our engineering team.
                </p>
              </div>

              <Link
                to="/blog"
                className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex"
              >
                All Articles <FaArrowRight />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((item) => (
                <Link
                  key={item._id}
                  to={`/blog/${item.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-background transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {item.coverImage?.url && (
                    <img
                      src={item.coverImage.url}
                      alt={item.coverImageAlt || item.title}
                      className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}

                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                      {item.category}
                    </span>

                    <h3 className="mt-3 line-clamp-2 text-lg font-bold text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                      {item.excerpt}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Read Article <FaArrowRight />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

    </main>
  );
};

export default BlogDetail;
