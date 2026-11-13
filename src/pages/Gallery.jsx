
import { useEffect, useState } from "react";
import Title from "../components/Title";

// ==========================================
// API CONFIGURATION
// ==========================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const GALLERY_API = `${API_URL}/api/gallery`;

// ==========================================
// GALLERY COMPONENT
// ==========================================

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(null);

  // ==========================================
  // FETCH GALLERY
  // ==========================================

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(GALLERY_API);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to fetch gallery images"
        );
      }

      setGalleryItems(result.data || []);
    } catch (error) {
      console.error("Gallery Fetch Error:", error);

      setError(
        error.message || "Unable to load gallery images."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL FETCH
  // ==========================================

  useEffect(() => {
    fetchGallery();
  }, []);

  // ==========================================
  // LIGHTBOX CONTROLS
  // ==========================================

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current + 1) % galleryItems.length
    );
  };

  const previousImage = () => {
    setSelectedIndex((current) =>
      current === null
        ? null
        : (current - 1 + galleryItems.length) %
          galleryItems.length
    );
  };

  // ==========================================
  // KEYBOARD CONTROLS
  // ==========================================

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedIndex, galleryItems.length]);

  // ==========================================
  // SELECTED IMAGE
  // ==========================================

  const selected =
    selectedIndex !== null
      ? galleryItems[selectedIndex]
      : null;

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      id="gallery"
      className="bg-background px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">

        {/* SECTION TITLE */}

        <Title
          title="Project Gallery"
          subtitle="A look at structures we have designed and detailed across India and Africa, from giant statues to technological parks."
        />

        {/* LOADING */}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="aspect-[4/3] animate-pulse rounded-2xl bg-border"
              />
            ))}
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="py-16 text-center">
            <p className="mb-5 text-red-500">{error}</p>

            <button
              onClick={fetchGallery}
              className="rounded-lg bg-primary px-6 py-3 text-white transition hover:opacity-90"
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}

        {!loading && !error && galleryItems.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="mb-3 text-xl font-semibold text-primary">
              No Gallery Images Yet
            </h3>

            <p className="text-muted">
              Our project gallery will be updated soon.
            </p>
          </div>
        )}

        {/* GALLERY GRID */}

        {!loading && !error && galleryItems.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted">
                Showing {galleryItems.length} projects
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item, index) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-border text-left shadow-sm transition hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  {/* IMAGE */}

                  <img
                    src={item.image?.url}
                    alt={item.imageName || "Tectonic project"}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* IMAGE OVERLAY */}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-footer/95 via-footer/60 to-transparent p-5 pt-16 opacity-100 transition md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <h3 className="text-base font-bold text-white">
                      {item.imageName}
                    </h3>
                  </div>

                  {/* HOVER ICON */}

                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-md transition group-hover:opacity-100">
                    <span className="text-xl">↗</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ======================================
          LIGHTBOX
      ====================================== */}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-footer/95 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selected.imageName}
        >
          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-secondary"
          >
            ×
          </button>

          {/* PREVIOUS */}

          {galleryItems.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-secondary md:left-6"
            >
              ‹
            </button>
          )}

          {/* NEXT */}

          {galleryItems.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-secondary md:right-6"
            >
              ›
            </button>
          )}

          {/* SELECTED IMAGE */}

          <figure
            className="w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selected.image?.url}
              alt={selected.imageName}
              className="mx-auto max-h-[75vh] w-full rounded-xl object-contain"
            />

            <figcaption className="mt-5 text-center">
              <h3 className="text-lg font-bold text-white md:text-xl">
                {selected.imageName}
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                {selectedIndex + 1} / {galleryItems.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

export default Gallery;
