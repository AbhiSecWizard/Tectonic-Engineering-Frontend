import { useEffect, useState } from "react";
import Title from "../components/Title";

const galleryItems = [
  // Statues
  {
    id: 1,
    title: "125 ft Statue of Lachit Borphukan",
    location: "Jorhat, Assam",
    category: "Statues",
    image: "/images/gallery/lachit-borphukan-statue.jpg",
  },
  {
    id: 2,
    title: "77 ft Statue of Lord Ram",
    location: "Goa",
    category: "Statues",
    image: "/images/gallery/lord-ram-statue-goa.jpg",
  },
  {
    id: 3,
    title: "51 ft Statue of Lord Ram",
    location: "Bareilly, Uttar Pradesh",
    category: "Statues",
    image: "/images/gallery/lord-ram-statue-bareilly.jpg",
  },
  {
    id: 4,
    title: "91 ft Statue of Chhatrapati Shivaji Maharaj",
    location: "Malvan, Maharashtra",
    category: "Statues",
    image: "/images/gallery/shivaji-maharaj-statue.jpg",
  },
  {
    id: 5,
    title: "351 ft Statue of Dr. Babasaheb Ambedkar (Ongoing)",
    location: "Mumbai, Maharashtra",
    category: "Statues",
    image: "/images/gallery/ambedkar-statue-mumbai.jpg",
  },

  // Commercial
  {
    id: 6,
    title: "Technological Park",
    location: "Cape Verde, Africa",
    category: "Commercial",
    image: "/images/gallery/cape-verde-1.jpg",
  },
  {
    id: 7,
    title: "Technological Park: Composite Structure",
    location: "Cape Verde, Africa",
    category: "Commercial",
    image: "/images/gallery/cape-verde-2.jpg",
  },
  {
    id: 8,
    title: "Technological Park: Steel Framing",
    location: "Cape Verde, Africa",
    category: "Commercial",
    image: "/images/gallery/cape-verde-3.jpg",
  },

  // Residential
  {
    id: 9,
    title: "Narmada Nirvana Phase III Villas",
    location: "Indore, Madhya Pradesh",
    category: "Residential",
    image: "/images/gallery/narmada-nirvana.jpg",
  },
  {
    id: 10,
    title: "Platinum Greens Luxury Apartments",
    location: "Patna, Bihar",
    category: "Residential",
    image: "/images/gallery/platinum-greens.jpg",
  },

  // Infrastructure
  {
    id: 11,
    title: "7.5 MLD STP-SBR Basin",
    location: "Wave Infratech",
    category: "Infrastructure",
    image: "/images/gallery/stp-sbr-basin.jpg",
  },
  {
    id: 12,
    title: "Culvert",
    location: "Wave Infratech",
    category: "Infrastructure",
    image: "/images/gallery/culvert.jpg",
  },
  {
    id: 13,
    title: "Hoarding 8 m x 6 m, 36 m Tall",
    location: "Wave Infratech",
    category: "Infrastructure",
    image: "/images/gallery/hoarding.jpg",
  },
];

const categories = ["All", ...new Set(galleryItems.map((item) => item.category))];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const selected = selectedIndex !== null ? filtered[selectedIndex] : null;

  const close = () => setSelectedIndex(null);
  const next = () => setSelectedIndex((i) => (i + 1) % filtered.length);
  const prev = () =>
    setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);

  // Keyboard controls and scroll lock while the lightbox is open
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, filtered.length]);

  const changeCategory = (category) => {
    setActiveCategory(category);
    setSelectedIndex(null);
  };

  return (
    <section id="gallery" className="bg-background py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Title
          title="Project Gallery"
          subtitle="A look at structures we have designed and detailed across India and Africa, from giant statues to technological parks."
        />

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => changeCategory(category)}
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

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-border text-left shadow-sm transition hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {item.category}
              </span>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-footer/95 via-footer/60 to-transparent p-5 pt-16 opacity-100 transition md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.location}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-footer/95 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-secondary"
          >
            ×
          </button>

          {filtered.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-secondary md:left-6"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-secondary md:right-6"
              >
                ›
              </button>
            </>
          )}

          <figure
            className="max-h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.image}
              alt={selected.title}
              className="max-h-[75vh] w-full rounded-xl object-contain"
            />
            <figcaption className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white">{selected.title}</h3>
              <p className="mt-1 text-sm text-slate-300">
                {selected.location} · {selectedIndex + 1} / {filtered.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

export default Gallery;