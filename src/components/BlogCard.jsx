const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const BlogCard = ({ post, featured = false }) => {
  const { title, slug, excerpt, coverImage, category, author, publishedAt, readTime } = post;

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:shadow-xl ${
        featured ? "lg:grid lg:grid-cols-2" : "flex flex-col"
      }`}
    >
      {/* Cover image */}
      <a
        href={`/blog/${slug}`}
        className={`relative block overflow-hidden bg-border ${
          featured ? "h-64 lg:h-full" : "h-56"
        }`}
      >
        <img
          src={coverImage}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {category}
        </span>
      </a>

      {/* Content */}
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-10" : ""}`}>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 text-xs font-medium text-muted">
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          <span aria-hidden="true">•</span>
          <span>{readTime} min read</span>
        </div>

        <h3
          className={`mb-3 font-bold leading-snug text-heading transition-colors group-hover:text-primary ${
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
        >
          <a href={`/blog/${slug}`}>{title}</a>
        </h3>

        <p className={`mb-6 leading-7 text-muted ${featured ? "" : "line-clamp-3 text-sm"}`}>
          {excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-semibold text-body">By {author}</span>
          <a
            href={`/blog/${slug}`}
            className="text-sm font-semibold text-primary transition-colors hover:text-secondary"
          >
            Read More →
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;