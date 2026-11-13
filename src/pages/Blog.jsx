
import { useCallback, useEffect, useState } from "react";
import Title from "../components/Title";
import BlogCard from "../components/BlogCard";

// ==========================================
// API CONFIGURATION
// ==========================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const BLOG_API = `${API_URL}/api/blogs`;

// ==========================================
// COMPONENT
// ==========================================

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  const [activeCategory, setActiveCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${BLOG_API}/categories`);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch categories");
      }

      const categoryNames = (result.data || []).map(
        (item) => item.category
      );

      setCategories(["All", ...categoryNames]);
    } catch (error) {
      console.error("Category Error:", error);
    }
  }, []);

  // ==========================================
  // FETCH BLOGS
  // ==========================================

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: String(page),
        limit: "12",
      });

      if (activeCategory !== "All") {
        params.set("category", activeCategory);
      }

      const response = await fetch(
        `${BLOG_API}?${params.toString()}`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch blogs");
      }

      setPosts(result.data || []);
      setPages(result.pages || 1);
      setTotal(result.total || 0);
    } catch (error) {
      console.error("Blog Fetch Error:", error);
      setError(error.message || "Unable to load articles.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [page, activeCategory]);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // ==========================================
  // CATEGORY FILTER
  // ==========================================

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPage(1);
  };

  // ==========================================
  // NORMALIZE BLOG DATA FOR BLOG CARD
  // ==========================================

  const formatPost = (post) => ({
    ...post,
    coverImage: post.coverImage?.url || "",
    publishedAt: post.publishedAt || post.createdAt,
    author: post.author || "Tectonic Engineering",
    readTime: post.readTime || 1,
  });

  // ==========================================
  // FEATURED BLOG
  // ==========================================

  const featuredPost =
    posts.find((post) => post.isFeatured) || posts[0];

  const otherPosts = featuredPost
    ? posts.filter((post) => post._id !== featuredPost._id)
    : [];

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      id="blog"
      className="bg-background px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">

        <Title
          title="Latest Insights"
          subtitle="Practical articles on structural design, peer review, audit and steel detailing from our engineering team."
        />

        {/* CATEGORY FILTER */}

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-body hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* LOADING */}

        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-xl bg-border/60"
              />
            ))}
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="py-16 text-center">
            <p className="mb-4 text-red-500">{error}</p>

            <button
              onClick={fetchBlogs}
              className="rounded-lg bg-primary px-5 py-2 text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* BLOG POSTS */}

        {!loading && !error && posts.length === 0 && (
          <p className="py-16 text-center text-muted">
            No articles in this category yet.
          </p>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            {/* FEATURED POST */}

            {featuredPost && (
              <div className="mb-8">
                <BlogCard
                  post={formatPost(featuredPost)}
                  featured
                />
              </div>
            )}

            {/* OTHER POSTS */}

            {otherPosts.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {otherPosts.map((post) => (
                  <BlogCard
                    key={post._id}
                    post={formatPost(post)}
                  />
                ))}
              </div>
            )}

            {/* PAGINATION */}

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4">

              <p className="text-sm text-muted">
                Showing {posts.length} articles on this page
                {total > 0 && ` out of ${total}`}
              </p>

              <div className="flex items-center gap-3">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="rounded-lg border border-border px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm text-body">
                  {page} / {pages}
                </span>

                <button
                  disabled={page >= pages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="rounded-lg border border-border px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
