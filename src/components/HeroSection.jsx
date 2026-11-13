import { memo, useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { heroSectionImages } from "../assets/heroSectionImages/assets";
const PROJECTS_PAGE = "/projects"; // adjust if your Projects page uses another path
const BUTTON_TEXT = "View Project";
const SLIDE_INTERVAL = 6000; // one timer for the image AND its text

// One slide = one background image + the project shown on top of it.
// The text always matches the image, because both come from the same slide.
// If a photo does not match its project, change that slide's `image`.
// `searchTerm` opens the Projects page with that project already searched.
const heroSlides = [
  {
    image: heroSectionImages.img1,
    category: "Landmark Statue · Ongoing",
    title: "Dr. Babasaheb Ambedkar Statue,",
    highlight: "351 ft in Mumbai.",
    description:
      "A 351 ft concrete and steel statue in Mumbai, Maharashtra. We are doing the structural connection design and fabrication detail drawings.",
    facts: [
      { label: "Height", value: "351 ft" },
      { label: "Location", value: "Mumbai, Maharashtra" },
      { label: "Client", value: "Ram Sutar Fine Art Pvt. Ltd." },
    ],
    searchTerm: "Ambedkar",
  },
  {
    image: heroSectionImages.img2,
    category: "International · Commercial",
    title: "Technological Park,",
    highlight: "Cape Verde, Africa.",
    description:
      "Five composite building structures of unique shape, housing a data centre, an incubation centre and a business centre.",
    facts: [
      { label: "Buildings", value: "5 composite" },
      { label: "Location", value: "Cape Verde, Africa" },
      { label: "Client", value: "NOSI" },
    ],
    searchTerm: "Technological Park",
  },
  {
    image: heroSectionImages.img3,
    category: "Landmark Statue",
    title: "Lachit Borphukan Statue,",
    highlight: "125 ft in Jorhat.",
    description:
      "A 125 ft concrete and steel statue in Jorhat, Assam, with structural connection design and fabrication detail drawings by our team.",
    facts: [
      { label: "Height", value: "125 ft" },
      { label: "Location", value: "Jorhat, Assam" },
      { label: "Client", value: "Ram Sutar Fine Art Pvt. Ltd." },
    ],
    searchTerm: "Lachit",
  },
  {
    image: heroSectionImages.img4,
    category: "Industrial & Energy",
    title: "Khurja Super Thermal",
    highlight: "Power Project.",
    description:
      "Structural connection design and fabrication detail drawings for the CWPH and RWPH units at the Khurja Super Thermal Power Project.",
    facts: [
      { label: "Client", value: "THDCIL" },
      { label: "Units", value: "CWPH and RWPH" },
      { label: "Scope", value: "Connection design and detailing" },
    ],
    searchTerm: "Khurja",
  },
  {
    image: heroSectionImages.img5,
    category: "Residential",
    title: "Platinum Greens,",
    highlight: "Luxury Apartments.",
    description:
      "High-end luxury apartments in Patna, Bihar, designed by our structural team for Melage Studio.",
    facts: [
      { label: "Location", value: "Patna, Bihar" },
      { label: "Client", value: "Melage Studio" },
    ],
    searchTerm: "Platinum Greens",
  },
];

// Hero text for the current slide
const HeroContent = memo(function HeroContent({ slide, onPauseChange }) {
  return (
    <div
      className="hero-content"
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => onPauseChange(false)}
      onFocus={() => onPauseChange(true)}
      onBlur={() => onPauseChange(false)}
    >
      <p className="hero-eyebrow">Featured Project</p>

      {/* key restarts the enter animation every time the slide changes */}
      <div key={slide.searchTerm} className="hero-text-animation">
        <p className="hero-category">{slide.category}</p>

        <h1 className="hero-title">
          {slide.title}
          <span className="hero-highlight">{slide.highlight}</span>
        </h1>

        <p className="hero-description">{slide.description}</p>

        <dl className="hero-facts">
          {slide.facts.map(({ label, value }) => (
            <div key={label}>
              <dt className="hero-fact-label">{label}</dt>
              <dd className="hero-fact-value">{value}</dd>
            </div>
          ))}
        </dl>

        <Link
          to={`${PROJECTS_PAGE}?search=${encodeURIComponent(slide.searchTerm)}`}
          className="hero-button"
        >
          {BUTTON_TEXT}
        </Link>
      </div>
    </div>
  );
});

// Background image slider
const BackgroundSlider = memo(function BackgroundSlider({
  current,
  onPrevious,
  onNext,
  onSelect,
}) {
  return (
    <>
      {heroSlides.map(({ image, searchTerm }, index) => (
        <img
          key={searchTerm}
          src={image}
          alt={`Tectonic Engineering project ${index + 1}`}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          draggable="false"
          className={`hero-background ${
            current === index ? "hero-background-active" : ""
          }`}
        />
      ))}

      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous project"
        className="hero-arrow hero-arrow-left"
      >
        <FaChevronLeft />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next project"
        className="hero-arrow hero-arrow-right"
      >
        <FaChevronRight />
      </button>

      <div className="hero-indicators">
        {heroSlides.map(({ searchTerm }, index) => (
          <button
            key={searchTerm}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show project ${index + 1}`}
            aria-pressed={current === index}
            className={`hero-indicator ${
              current === index ? "hero-indicator-active" : ""
            }`}
          />
        ))}
      </div>
    </>
  );
});

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // One timer for image and text. It restarts after every change,
  // so clicking an arrow or dot gives the new slide its full time.
  useEffect(() => {
    if (paused) return undefined; // stop while the visitor is reading

    const timer = setTimeout(nextSlide, SLIDE_INTERVAL);
    return () => clearTimeout(timer);
  }, [current, paused, nextSlide]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const distance = touchStartX.current - event.changedTouches[0].clientX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section
      className="hero-section"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <BackgroundSlider
        current={current}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={setCurrent}
      />

      <div className="hero-overlay" />

      <HeroContent slide={heroSlides[current]} onPauseChange={setPaused} />
    </section>
  );
};

export default HeroSection;