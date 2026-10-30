import { useState } from "react";
import Title from "../components/Title";
import BlogCard from "../components/BlogCard";

// Sample posts. Field names match the blog schema that will be created next,
// so this array can be replaced by an API response later.
const posts = [
  {
    _id: "1",
    title: "Why Peer Review Matters Before Construction Begins",
    slug: "why-peer-review-matters",
    excerpt:
      "An independent proof check catches design errors early, when fixing them costs the least. Here is what a structural peer review covers and when to ask for one.",
    coverImage: "/images/blog/peer-review.jpg",
    category: "Peer Review",
    author: "Er. Subhankar Petal",
    publishedAt: "2026-10-20",
    readTime: 5,
  },
  {
    _id: "2",
    title: "Value Engineering: Reducing Cost Without Reducing Safety",
    slug: "value-engineering-reduce-cost",
    excerpt:
      "Value engineering looks for smarter structural systems, not cheaper materials. Learn how design choices can lower project cost while keeping quality intact.",
    coverImage: "/images/blog/value-engineering.jpg",
    category: "Value Engineering",
    author: "Er. Subhankar Petal",
    publishedAt: "2026-10-12",
    readTime: 6,
  },
  {
    _id: "3",
    title: "Signs Your Building Needs a Structural Audit",
    slug: "signs-building-needs-structural-audit",
    excerpt:
      "Cracks, dampness, corroded reinforcement and added floors are all reasons to get a strength assessment. Know the warning signs before repairs become costly.",
    coverImage: "/images/blog/structural-audit.jpg",
    category: "Structural Audit",
    author: "Tectonic Engineering",
    publishedAt: "2026-10-05",
    readTime: 4,
  },
  {
    _id: "4",
    title: "From Tekla Model to Fabrication Drawing: How Steel Detailing Works",
    slug: "tekla-model-to-fabrication-drawing",
    excerpt:
      "A look at the steel detailing workflow, from the 3D model to general arrangement and fabrication drawings, and why checking at every stage matters.",
    coverImage: "/images/blog/steel-detailing.jpg",
    category: "Steel Detailing",
    author: "Chinmoy Mondal",
    publishedAt: "2026-09-28",
    readTime: 7,
  },
  {
    _id: "5",
    title: "Engineering Giant Statues: Lessons from Concrete and Steel",
    slug: "engineering-giant-statues",
    excerpt:
      "Tall statues face wind, seismic and self-weight loads that ordinary buildings do not. See how structural design makes them stand safely for decades.",
    coverImage: "/images/blog/statue.jpg",
    category: "Design",
    author: "Er. Subhankar Petal",
    publishedAt: "2026-09-15",
    readTime: 8,
  },
  {
    _id: "6",
    title: "Why PEB Structures Are Popular for Industrial Sheds",
    slug: "peb-structures-industrial-sheds",
    excerpt:
      "Pre-engineered buildings offer speed, economy and large clear spans. Understand where they work best and what design checks they need.",
    coverImage: "/images/blog/peb.jpg",
    category: "Design",
    author: "Tectonic Engineering",
    publishedAt: "2026-09-02",
    readTime: 5,
  },
];

const Blog = () => {
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const [featuredPost, ...otherPosts] = filtered;

  return (
    <section id="blog" className="bg-background py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Title
          title="Latest Insights"
          subtitle="Practical articles on structural design, peer review, audit and steel detailing from our engineering team."
        />

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                activeCategory === category
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-body hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted">
            No articles in this category yet.
          </p>
        ) : (
          <>
            {/* Featured post */}
            <div className="mb-8">
              <BlogCard post={featuredPost} featured />
            </div>

            {/* Other posts */}
            {otherPosts.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {otherPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;