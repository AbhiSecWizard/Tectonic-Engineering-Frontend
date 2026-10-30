import { useCallback, useEffect, useState } from "react";
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
import { capeVerdeGallery, categories, projects } from "../components/projectsData";

const PAGE_SIZE = 9;

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

const countFor = (category) =>
  category === "All"
    ? projects.length
    : projects.filter((project) => project.category === category).length;

// Shows the photo, or a category icon when there is no photo / the file is missing
const ProjectImage = ({ src, alt, category }) => {
  const [failed, setFailed] = useState(false);
  const Icon = categoryIcons[category] ?? FaBuilding;

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
      className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
    />
  );
};

const ProjectCard = ({
  title,
  category,
  client,
  location,
  detail,
  specs,
  scope,
  status,
  image,
}) => (
  <article className="group flex flex-col overflow-hidden border border-border bg-surface">
    <div className="relative aspect-[4/3] overflow-hidden bg-background">
      <ProjectImage
        src={image}
        alt={location ? `${title}, ${location}` : title}
        category={category}
      />
      <span className="absolute top-3 left-3 bg-surface px-2.5 py-1 text-xs font-semibold text-primary">
        {category}
      </span>
      {status && (
        <span className="absolute top-3 right-3 bg-secondary px-2.5 py-1 text-xs font-semibold text-footer">
          {status}
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6">
      <h3 className="text-lg font-semibold text-heading">{title}</h3>

      {location && (
        <p className="mt-1 flex items-center gap-2 text-sm text-muted">
          <FaMapMarkerAlt
            className="size-3.5 shrink-0 text-primary"
            aria-hidden="true"
          />
          {location}
        </p>
      )}

      <p className="mt-3 text-sm leading-relaxed text-body">{detail}</p>

      {specs?.length > 0 && (
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
          {specs.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="text-sm font-semibold text-heading">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {scope?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {scope.map((item) => (
            <li key={item} className="bg-background px-2.5 py-1 text-xs text-body">
              {item}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-auto pt-5 text-sm text-muted">
        Client: <span className="font-medium text-body">{client}</span>
      </p>
    </div>
  </article>
);

const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-footer/90 p-4"
    >
      <button
        type="button"
        autoFocus
        onClick={onClose}
        aria-label="Close image"
        className={`absolute top-4 right-4 flex size-11 items-center justify-center bg-surface text-primary ${focusRing}`}
      >
        <FaTimes className="size-5" aria-hidden="true" />
      </button>
      <img
        src={image.src}
        alt={image.alt}
        onClick={(event) => event.stopPropagation()}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
};

const Projects = () => {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeImage, setActiveImage] = useState(null);
  const closeImage = useCallback(() => setActiveImage(null), []);

  const search = query.trim().toLowerCase();

  const filtered = projects.filter((project) => {
    const inCategory = category === "All" || project.category === category;
    const inSearch =
      !search ||
      [
        project.title,
        project.client,
        project.location,
        project.detail,
        project.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search);
    return inCategory && inSearch;
  });

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  const changeCategory = (next) => {
    setCategory(next);
    setVisibleCount(PAGE_SIZE);
  };

  const changeQuery = (next) => {
    setQuery(next);
    setVisibleCount(PAGE_SIZE);
  };

  const resetFilters = () => {
    changeCategory("All");
    changeQuery("");
  };

  return (
    <main>
      <header className="bg-primary py-16 text-surface sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">OUR PROJECTS</h1>
          <p className="mt-4 max-w-2xl text-xl text-surface/90">
            A diverse portfolio of complex structures delivered across India and
            Africa.
          </p>
          <p className="mt-2 text-surface/80">
            {projects.length} projects across {categories.length - 1}{" "}
            categories, from landmark statues to industrial plants.
          </p>
        </div>
      </header>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
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
                    {item} ({countFor(item)})
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <label htmlFor="project-search" className="sr-only">
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
                onChange={(event) => changeQuery(event.target.value)}
                placeholder="Search by name, client or place"
                className="w-full border border-border bg-surface py-2.5 pr-3 pl-10 text-sm text-body placeholder:text-muted focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-muted" aria-live="polite">
            Showing {visible.length} of {filtered.length} projects
          </p>

          {filtered.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="mt-6 border border-border bg-surface p-10 text-center">
              <p className="text-body">No projects match your search.</p>
              <button
                type="button"
                onClick={resetFilters}
                className={`mt-4 text-sm font-semibold text-primary hover:text-secondary ${focusRing}`}
              >
                Clear filters
              </button>
            </div>
          )}

          {remaining > 0 && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className={`border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-surface ${focusRing}`}
              >
                Show more projects ({remaining} left)
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Title
            title="PROJECT AT A GLANCE"
            subtitle="Technological Park, Cape Verde, Africa"
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capeVerdeGallery.map((image) => (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActiveImage(image)}
                  aria-label={`Enlarge photo: ${image.alt}`}
                  className={`group block w-full overflow-hidden border border-border ${focusRing}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
              <FaEnvelope className="size-4" aria-hidden="true" />
              Email us
            </a>
            <a
              href="tel:+918800683542"
              className={`flex items-center gap-2 border border-surface px-5 py-3 text-sm font-semibold text-surface hover:bg-surface hover:text-primary ${focusRing}`}
            >
              <FaPhoneAlt className="size-4" aria-hidden="true" />
              +91 8800683542
            </a>
          </div>
        </div>
      </section>

      {activeImage && <Lightbox image={activeImage} onClose={closeImage} />}
    </main>
  );
};

export default Projects;