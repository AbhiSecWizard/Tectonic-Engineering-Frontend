import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaHome,
  FaIndustry,
  FaMapMarkerAlt,
  FaMonument,
  FaPhoneAlt,
  FaRoad,
  FaSearch,
  FaTimes,
  FaTrain,
} from "react-icons/fa";

import Title from "../components/Title";

// ==========================================
// CONFIGURATION
// ==========================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const PROJECT_API = `${API_URL}/api/projects/website`;

const PAGE_SIZE = 9;

// Keep these aligned with your backend project categories.
const categories = [
  "All",
  "Statues",
  "Industrial & Energy",
  "Railway",
  "Commercial",
  "Residential",
  "Infrastructure",
];

// ==========================================
// CATEGORY ICONS
// ==========================================

const categoryIcons = {
  Statues: FaMonument,
  "Industrial & Energy": FaIndustry,
  Railway: FaTrain,
  Commercial: FaBuilding,
  Residential: FaHome,
  Infrastructure: FaRoad,
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

// ==========================================
// HELPERS
// ==========================================

const getImageUrl = (image) => {
  if (!image) return "";

  if (typeof image === "string") return image;

  return image.url || "";
};

const getLocation = (location) => {
  if (!location) return "";

  if (typeof location === "string") return location;

  return [
    location.address,
    location.city,
    location.state,
    location.country,
  ]
    .filter(Boolean)
    .join(", ");
};

const getSpecs = (specs) => {
  if (!specs) return [];

  if (Array.isArray(specs)) {
    return specs.filter(
      (item) => item?.label && item?.value !== undefined
    );
  }

  if (typeof specs === "object") {
    return Object.entries(specs)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([label, value]) => ({
        label,
        value:
          typeof value === "object"
            ? JSON.stringify(value)
            : String(value),
      }));
  }

  return [];
};

// ==========================================
// PROJECT IMAGE
// ==========================================

const ProjectImage = ({ src, alt, category }) => {
  const [failed, setFailed] = useState(false);

  const Icon = categoryIcons[category] || FaBuilding;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background text-primary/30">
        <Icon className="size-14" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
};

// ==========================================
// PROJECT CARD
// ==========================================


const ProjectCard = ({ project, onImageClick }) => {
  const {
    _id,
    name,
    category,
    description,
    structureType,
    location,
    specs,
    services,
    status,
    coverImage,
  } = project;

  const image = getImageUrl(coverImage);
  const projectLocation = getLocation(location);
  const projectSpecs = getSpecs(specs);

  return (
   <Link to={`/projects/${project._id}`}>
    <article className="group flex flex-col overflow-hidden border border-border bg-surface transition-shadow duration-300 hover:shadow-lg">

      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <button
          type="button"
          onClick={() =>
            image &&
            onImageClick({
              src: image,
              alt: name,
            })
          }
          disabled={!image}
          className="block h-full w-full"
        >
          <ProjectImage
            src={image}
            alt={name}
            category={category}
          />
        </button>

        {category && (
          <span className="absolute top-3 left-3 bg-surface px-3 py-1.5 text-xs font-semibold text-primary">
            {category}
          </span>
        )}

        {status && (
          <span className="absolute top-3 right-3 bg-secondary px-3 py-1.5 text-xs font-semibold text-footer">
            {status}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-6">

        <h3 className="text-lg font-semibold text-heading">
          {name}
        </h3>

        {projectLocation && (
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <FaMapMarkerAlt className="size-3.5 text-primary" />
            {projectLocation}
          </p>
        )}

        {structureType && (
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-secondary">
            {structureType}
          </p>
        )}

        {description && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-body">
            {description}
          </p>
        )}

        {projectSpecs.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
            {projectSpecs.slice(0, 4).map(({ label, value }) => (
              <div key={label}>
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="text-sm font-semibold text-heading">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {Array.isArray(services) && services.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {services.slice(0, 4).map((service, index) => (
              <li
                key={`${service}-${index}`}
                className="bg-background px-2.5 py-1 text-xs text-body"
              >
                {service}
              </li>
            ))}
          </ul>
        )}

        {/* VIEW DETAILS */}
        <Link
          to={`/projects/${_id}`}
          className="mt-6 inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-surface transition-colors hover:bg-footer"
        >
          View Project Details
          <span aria-hidden="true">→</span>
        </Link>

      </div>
    </article>
   </Link>
  );
};


// ==========================================
// LOADING SKELETON
// ==========================================

const ProjectSkeleton = () => (
  <div className="overflow-hidden border border-border bg-surface">
    <div className="aspect-[4/3] animate-pulse bg-border" />

    <div className="space-y-4 p-6">
      <div className="h-5 w-3/4 animate-pulse bg-border" />
      <div className="h-3 w-1/2 animate-pulse bg-border" />
      <div className="h-16 animate-pulse bg-border" />
      <div className="h-8 w-2/3 animate-pulse bg-border" />
    </div>
  </div>
);

// ==========================================
// LIGHTBOX
// ==========================================

const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-footer/95 p-4"
    >
      <button
        type="button"
        autoFocus
        onClick={onClose}
        aria-label="Close image"
        className={`absolute top-4 right-4 flex size-11 items-center justify-center bg-surface text-primary ${focusRing}`}
      >
        <FaTimes className="size-5" />
      </button>

      <img
        src={image.src}
        alt={image.alt}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] max-w-full object-contain"
      />
    </div>
  );
};

// ==========================================
// MAIN PROJECTS PAGE
// ==========================================

const Projects = () => {
  // ========================================
  // STATES
  // ========================================

  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("All");

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState("");

  const [activeImage, setActiveImage] = useState(null);

  // ========================================
  // DEBOUNCE SEARCH
  // ========================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // ========================================
  // FETCH PROJECTS
  // ========================================

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setError("");

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
        });

        if (category !== "All") {
          params.set("category", category);
        }

        if (debouncedQuery) {
          params.set("search", debouncedQuery);
        }

        const response = await fetch(
          `${PROJECT_API}?${params.toString()}`,
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch projects.");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(
            result.message || "Something went wrong."
          );
        }

        const newProjects = result.data || [];

        setProjects((previous) =>
          page === 1
            ? newProjects
            : [
                ...previous,
                ...newProjects.filter(
                  (item) =>
                    !previous.some(
                      (existing) => existing._id === item._id
                    )
                ),
              ]
        );

        setTotal(result.total || 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Projects API Error:", err);
          setError(err.message || "Failed to load projects.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, [category, debouncedQuery, page]);

  // ========================================
  // FILTER HANDLERS
  // ========================================

  const changeCategory = (nextCategory) => {
    setCategory(nextCategory);
    setPage(1);
    setProjects([]);
  };

  const changeSearch = (value) => {
    setQuery(value);
    setPage(1);
    setProjects([]);
  };

  const resetFilters = () => {
    setCategory("All");
    setQuery("");
    setDebouncedQuery("");
    setPage(1);
    setProjects([]);
  };

  // ========================================
  // IMAGE GALLERY
  // ========================================

  const galleryImages = useMemo(() => {
    return projects.flatMap((project) => {
      const images = [
        ...(project.coverImage ? [project.coverImage] : []),
        ...(project.images || []),
      ];

      return images
        .map((image) => ({
          src: getImageUrl(image),
          alt: project.name,
        }))
        .filter((image) => image.src);
    });
  }, [projects]);

  // ========================================
  // LIGHTBOX HANDLER
  // ========================================

  const closeImage = useCallback(() => {
    setActiveImage(null);
  }, []);

  // ========================================
  // LOAD MORE
  // ========================================

  const hasMore = projects.length < total;

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setPage((previous) => previous + 1);
    }
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <main>
      {/* ================================== */}
      {/* HERO */}
      {/* ================================== */}

      <header className="bg-primary py-16 text-surface sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Our Work
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            OUR PROJECTS
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-surface/90">
            A diverse portfolio of complex structures delivered
            across India and Africa.
          </p>

          <p className="mt-4 text-sm text-surface/75">
            {total} projects available on our website.
          </p>
        </div>
      </header>

      {/* ================================== */}
      {/* PROJECTS */}
      {/* ================================== */}

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* FILTERS + SEARCH */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* CATEGORY FILTER */}

            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap gap-2"
            >
              {categories.map((item) => {
                const isActive = item === category;

                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => changeCategory(item)}
                    className={`border px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
                      isActive
                        ? "border-primary bg-primary text-surface"
                        : "border-border bg-surface text-body hover:border-primary hover:text-primary"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* SEARCH */}

            <div className="relative w-full lg:max-w-xs">
              <label
                htmlFor="project-search"
                className="sr-only"
              >
                Search projects
              </label>

              <FaSearch
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />

              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(event) =>
                  changeSearch(event.target.value)
                }
                placeholder="Search projects..."
                className="w-full border border-border bg-surface py-3 pr-3 pl-10 text-sm text-body outline-none transition-colors placeholder:text-muted focus:border-primary"
              />
            </div>
          </div>

          {/* PROJECT COUNT */}

          <div className="mt-8 flex items-center justify-between border-b border-border pb-4">
            <p
              className="text-sm text-muted"
              aria-live="polite"
            >
              Showing {projects.length} of {total} projects
            </p>

            {(category !== "All" || query) && (
              <button
                type="button"
                onClick={resetFilters}
                className={`text-sm font-semibold text-primary hover:text-secondary ${focusRing}`}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-8 border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm text-red-700">{error}</p>

              <button
                type="button"
                onClick={() => setPage(1)}
                className="mt-3 text-sm font-semibold text-primary underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* LOADING */}

          {loading && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProjectSkeleton key={index} />
              ))}
            </div>
          )}

          {/* PROJECT GRID */}

          {!loading && !error && projects.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onImageClick={setActiveImage}
                />
              ))}
            </div>
          )}

          {/* EMPTY STATE */}

          {!loading && !error && projects.length === 0 && (
            <div className="mt-8 border border-border bg-surface px-6 py-16 text-center">
              <FaBuilding className="mx-auto size-12 text-primary/30" />

              <h3 className="mt-5 text-xl font-semibold text-heading">
                No projects found
              </h3>

              <p className="mt-2 text-sm text-muted">
                No projects match your search or selected category.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className={`mt-5 bg-primary px-5 py-3 text-sm font-semibold text-surface hover:bg-footer ${focusRing}`}
              >
                View all projects
              </button>
            </div>
          )}

          {/* LOAD MORE */}

          {!loading && !error && hasMore && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className={`border border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-surface disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
              >
                {loadingMore
                  ? "Loading..."
                  : `Show More Projects (${total - projects.length} left)`}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ================================== */}
      {/* DYNAMIC PROJECT GALLERY */}
      {/* ================================== */}

      {galleryImages.length > 0 && (
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Title
              title="PROJECT GALLERY"
              subtitle="Explore our engineering work and completed structures."
            />

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <li key={`${image.src}-${index}`}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(image)}
                    aria-label={`Enlarge project photo ${index + 1}`}
                    className={`group block w-full overflow-hidden border border-border ${focusRing}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================================== */}
      {/* CONTACT CTA */}
      {/* ================================== */}

      <section className="bg-primary py-14 text-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Have a structure to design or detail?
            </h2>

            <p className="mt-2 text-surface/80">
              Share your requirements and our team will get back to you.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:tectoniceng@outlook.com"
              className={`flex items-center gap-2 bg-secondary px-5 py-3 text-sm font-semibold text-footer hover:bg-surface ${focusRing}`}
            >
              <FaEnvelope className="size-4" />
              Email us
            </a>

            <a
              href="tel:+918800683542"
              className={`flex items-center gap-2 border border-surface px-5 py-3 text-sm font-semibold text-surface hover:bg-surface hover:text-primary ${focusRing}`}
            >
              <FaPhoneAlt className="size-4" />
              +91 8800683542
            </a>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}

      {activeImage && (
        <Lightbox
          image={activeImage}
          onClose={closeImage}
        />
      )}
    </main>
  );
};

export default Projects;
