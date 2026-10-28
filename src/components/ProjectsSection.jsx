import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Title from "./Title";

const SCOPE = "Structural connection design and fabrication detailing.";
const STATUE_CLIENT = "Ram Sutar Fine Art Pvt. Ltd.";

// Statues come first so they lead the default "All" view.
const projects = [
  {
    id: "ambedkar-statue",
    title: "Dr. Babasaheb Ambedkar Statue",
    client: STATUE_CLIENT,
    location: "Mumbai, Maharashtra",
    detail: `351 ft statue. ${SCOPE}`,
    status: "Ongoing",
  },
  {
    id: "lachit-statue",
    title: "Lachit Borphukan Statue",
    client: STATUE_CLIENT,
    location: "Jorhat, Assam",
    detail: `125 ft statue. ${SCOPE}`,
  },
  {
    id: "shivaji-statue",
    title: "Chhatrapati Shivaji Maharaj Statue",
    client: STATUE_CLIENT,
    location: "Malvan, Maharashtra",
    detail: `91 ft statue. ${SCOPE}`,
  },
  {
    id: "ram-goa-statue",
    title: "Lord Ram Statue",
    client: STATUE_CLIENT,
    location: "Goa",
    detail: `77 ft statue. ${SCOPE}`,
  },
  {
    id: "ram-bareilly-statue",
    title: "Lord Ram Statue",
    client: STATUE_CLIENT,
    location: "Bareilly, Uttar Pradesh",
    detail: `51 ft statue. ${SCOPE}`,
  },
  {
    id: "technological-park",
    title: "Technological Park",
    client: "NOSI",
    location: "Cape Verde, Africa",
    detail:
      "Five composite buildings of unique shape for a data centre, incubation centre and business centre.",
  },
  {
    id: "iocl-rack",
    title: "Refinery Pipe & Cable Rack",
    client: "IOCL",
    detail:
      "Elevated pipe and cable rack, 35 m span trestle and drain crossing for an oil and gas refinery plant.",
  },
  {
    id: "bhel-jamalpur",
    title: "PEB Shed at Jamalpur",
    client: "BHEL",
    location: "Jamalpur",
    detail: "PEB shed of 50 m × 120 m with a 25 m span.",
  },
  {
    id: "bhel-kurja",
    title: "Pipe Rack, Store & Substation",
    client: "BHEL",
    location: "Kurja",
    detail:
      "Pipe and cable rack, construction store at Kurja and a thermal power substation.",
  },
  {
    id: "khurja-power",
    title: "Khurja Super Thermal Power Project",
    client: "THDCIL",
    location: "Khurja",
    detail: `${SCOPE} For the CWPH and RWPH units.`,
  },
  {
    id: "pgcil-stores",
    title: "GIS Substation Store Buildings",
    client: "Power Grid Corporation of India Ltd.",
    detail:
      "PEB store buildings of 16 m × 41 m at GIS-Jaipur and 33 m × 13 m at GIS-Koteshwar.",
  },
  {
    id: "lnt-store",
    title: "Construction Store & Watch Towers",
    client: "L&T",
    detail: "A 29 m × 70 m construction store and 7.5 m high watch towers.",
  },
  {
    id: "ne-railway-shed",
    title: "Sick Line Shed",
    client: "N.E. Railway",
    detail: "Standard sick line shed of 55 m × 18 m.",
  },
  {
    id: "ramnathpur-fob",
    title: "Foot Over Bridge, Ramnathpur",
    client: "RVNL",
    location: "Ramnathpur Station",
    detail: "FOB for the Bsb–Pryj doubling project.",
  },
  {
    id: "lc-72-rob",
    title: "ROB at LC No. 72",
    client: "RVNL",
    location: "Patna Sahib – Gulzarbagh",
    detail: "Road over bridge for two-wheeler traffic.",
  },
  {
    id: "assam-police-hq",
    title: "Assam Police Headquarters",
    client: "Assam PWD",
    detail: "PEB structure, G+2+T.",
  },
  {
    id: "assam-car-parking",
    title: "Multilevel Car Parking",
    client: "Assam PWD",
    detail: "PEB structure, G+2+T.",
  },
  {
    id: "radtech-office",
    title: "Office Building",
    client: "Radtech Buildcon Pvt. Ltd.",
    detail: "RCC structure of 36,000 sq ft, 2B+G+6+T.",
  },
  {
    id: "eligo-centre",
    title: "Eligo Experience Centre",
    client: "Wave Infratech",
    detail: "Experience centre building.",
  },
  {
    id: "bar-bending-yard",
    title: "Bar Bending Yard",
    client: "Wave Infratech",
    detail: "State-of-the-art bar bending yard in a PEB shed.",
  },
  {
    id: "narmada-nirvana",
    title: "Narmada Nirvana Phase III",
    client: "Melage Studio",
    location: "Indore, Madhya Pradesh",
    detail: "Villas.",
  },
  {
    id: "platinum-greens",
    title: "Platinum Greens",
    client: "Melage Studio",
    location: "Patna, Bihar",
    detail: "High-end luxury apartments.",
  },
  {
    id: "stp-tanks",
    title: "STP & Water Tanks",
    client: "Wave Infratech",
    detail: "7.5 MLD STP-SBR basin with underground and overhead water tanks.",
  },
  {
    id: "culvert-flue-stack",
    title: "Culvert, ESS & DG Flue Stack",
    client: "Wave Infratech",
    detail: "Culvert, ESS and a 36 m DG flue stack.",
  },
  {
    id: "club-community",
    title: "Club, Community Center & Pool",
    client: "Wave Infratech",
    detail: "Club building, community center and swimming pool.",
  },
  {
    id: "hoarding",
    title: "Hoarding & Signage",
    client: "Wave Infratech",
    detail: "8 m × 6 m hoarding, 36 m tall, plus signage and unipole.",
  },
];

/* ---------- Slider settings (change these to tune behaviour) ---------- */
const TRANSITION_MS = 500; // slide animation time
const AUTO_SCROLL_MS = 3500; // time between automatic slides
const GAP_PX = 24; // space between cards (matches Tailwind gap-6)
const MAX_DOTS = 12; // more pages than this -> show "3 / 27" instead of dots
// "all"        -> mouse wheel (up/down or left/right) moves the slider
// "horizontal" -> only horizontal wheel / trackpad / Shift+wheel moves it,
//                 normal vertical wheel keeps scrolling the page
const WHEEL_MODE = "all";

/* ---------- Helpers ---------- */
const getPerView = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

const usePerView = () => {
  const [perView, setPerView] = useState(getPerView);
  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return perView;
};

const usePrefersReducedMotion = () => {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

const chunk = (list, size) => {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
};

const ArrowIcon = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
  </svg>
);

/* ---------- Card ---------- */
const ProjectCard = ({
  title,
  client,
  location,
  detail,
  status,
}) => (
  <article className="flex h-full flex-col border border-border bg-background p-6">
    {status && (
      <div className="mb-2">
        <span className="bg-secondary px-2 py-0.5 text-xs font-semibold text-footer">
          {status}
        </span>
      </div>
    )}

    <h3 className="mt-4 text-lg font-semibold text-heading">{title}</h3>
    {location && <p className="mt-1 text-sm text-muted">{location}</p>}
    <p className="mt-3 text-sm leading-relaxed text-body">{detail}</p>

    <p className="mt-auto pt-5 text-sm text-muted">
      Client: <span className="font-medium text-body">{client}</span>
    </p>
  </article>
);

/* ---------- Infinite slider ---------- */
const Slider = ({ items, perView }) => {
  const pages = useMemo(() => chunk(items, perView), [items, perView]);
  const total = pages.length;

  const reduced = usePrefersReducedMotion();
  const duration = reduced ? 0 : TRANSITION_MS;

  // page: -1 = clone of last page, 0..total-1 = real pages, total = clone of first page
  const [page, setPage] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const viewportRef = useRef(null);
  const drag = useRef({ active: false, dragging: false, id: null, startX: 0, dx: 0 });

  const isSettled = (value) => value >= 0 && value < total;

  const move = useCallback(
    (delta) =>
      setPage((current) =>
        current < 0 || current >= total ? current : current + delta
      ),
    [total]
  );

  const goTo = (index) =>
    setPage((current) => (current < 0 || current >= total ? current : index));

  // Automatically advance slides; pause while hovered or being dragged.
  useEffect(() => {
    if (total < 2 || isHovered || dragging || reduced) return undefined;

    const timer = setInterval(() => move(1), AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [total, isHovered, dragging, reduced, move]);

  // After sliding onto a clone page, silently jump to the matching real page.
  useEffect(() => {
    if (isSettled(page)) return undefined;
    const timer = setTimeout(() => {
      setAnimate(false);
      setPage(page < 0 ? total - 1 : 0);
    }, duration + 30);
    return () => clearTimeout(timer);
  }, [page, total, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-enable the animation right after the silent jump has painted.
  useEffect(() => {
    if (animate) return undefined;
    let inner;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animate]);

  // Mouse wheel / trackpad (native listener so we can call preventDefault).
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || total < 2) return undefined;

    let acc = 0;
    let lockedUntil = 0;
    let resetTimer;

    const onWheel = (event) => {
      const horizontalIntent =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
      if (WHEEL_MODE === "horizontal" && !horizontalIntent) return;

      event.preventDefault();
      const now = Date.now();
      if (now < lockedUntil) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      acc += delta;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        acc = 0;
      }, 150);

      if (Math.abs(acc) >= 40) {
        move(acc > 0 ? 1 : -1);
        acc = 0;
        lockedUntil = now + duration + 300;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(resetTimer);
    };
  }, [total, move, duration]);

  // Mouse drag + touch swipe (pointer events).
  const onPointerDown = (event) => {
    if (total < 2 || !isSettled(page)) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = {
      active: true,
      dragging: false,
      id: event.pointerId,
      startX: event.clientX,
      dx: 0,
    };
  };

  const onPointerMove = (event) => {
    const d = drag.current;
    if (!d.active || event.pointerId !== d.id) return;
    const dx = event.clientX - d.startX;
    if (!d.dragging) {
      if (Math.abs(dx) < 6) return;
      d.dragging = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    d.dx = dx;
    setDragX(dx);
  };

  const finishDrag = (event) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (!d.dragging) return;

    const width = viewportRef.current ? viewportRef.current.offsetWidth : 0;
    const threshold = Math.max(50, width * 0.12);
    const dx = d.dx;
    d.dragging = false;
    d.dx = 0;

    setDragging(false);
    setDragX(0);
    if (dx <= -threshold) move(1);
    else if (dx >= threshold) move(-1);

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event) => {
    if (total < 2) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };

  /* Only one page worth of cards: plain grid, no slider controls. */
  if (total < 2) {
    return (
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    );
  }

  const activePage = page < 0 ? total - 1 : page >= total ? 0 : page;
  const track = [pages[total - 1], ...pages, pages[0]];
  const half = GAP_PX / 2;

  return (
    <div className="mt-10">
      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onDragStart={(event) => event.preventDefault()}
        style={{
          touchAction: "pan-y",
          marginLeft: -half,
          marginRight: -half,
        }}
        className={`overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        <div
          className="flex"
          style={{
            transform: `translate3d(calc(${-(page + 1) * 100}% + ${dragX}px), 0, 0)`,
            transition:
              animate && !dragging
                ? `transform ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
                : "none",
            willChange: "transform",
          }}
        >
          {track.map((group, index) => {
            const isClone = index === 0 || index === track.length - 1;
            return (
              <div
                key={isClone ? `clone-${index}` : `page-${index - 1}`}
                aria-hidden={isClone || undefined}
                className="grid w-full shrink-0 items-stretch"
                style={{
                  gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))`,
                }}
              >
                {group.map((project) => (
                  <div
                    key={project.id}
                    className="h-full"
                    style={{ paddingLeft: half, paddingRight: half }}
                  >
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Page {activePage + 1} of {total}
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous projects"
          className="flex h-10 w-10 items-center justify-center border border-primary text-primary transition-colors hover:bg-primary hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <ArrowIcon direction="left" />
        </button>

        {total <= MAX_DOTS ? (
          <div className="flex flex-wrap items-center justify-center">
            {pages.map((_, index) => {
              const isActive = index === activePage;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group p-1.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-secondary"
                >
                  <span
                    className={`block h-2.5 transition-all ${
                      isActive
                        ? "w-6 bg-primary"
                        : "w-2.5 bg-border group-hover:bg-muted"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        ) : (
          <p className="min-w-16 text-center text-sm font-medium text-body">
            {activePage + 1} / {total}
          </p>
        )}

        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next projects"
          className="flex h-10 w-10 items-center justify-center border border-primary text-primary transition-colors hover:bg-primary hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
};

/* ---------- Section ---------- */
const ProjectsSection = () => {
  const perView = usePerView();

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Title
          title="OUR PROJECTS"
          subtitle="A diverse portfolio of complex structures delivered across India and Africa"
        />

        <Slider
          key={perView}
          items={projects}
          perView={perView}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
