import { memo, useState, useEffect, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { heroSectionImages } from "../assets/heroSectionImages/assets";

const images = [
  heroSectionImages.img1,
  heroSectionImages.img2,
  heroSectionImages.img3,
  heroSectionImages.img4,
  heroSectionImages.img5,
];

const heroSlides = [
  {
    title: "Engineering Precision.",
    highlight: "Built on Trust.",
    description:
      "We deliver precise steel detailing, rebar detailing and structural engineering solutions that bring complex construction projects to life.",
    buttonText: "Explore Our Services",
    buttonLink: "/services",
  },
  {
    title: "Smart Structural",
    highlight: "Design Solutions.",
    description:
      "From structural design to detailed drafting, we combine engineering expertise and innovation to create safe, efficient and reliable structures.",
    buttonText: "Discover Our Expertise",
    buttonLink: "/about-us",
  },
  {
    title: "Optimizing Every Project.",
    highlight: "Maximizing Value.",
    description:
      "Our value engineering and cost optimization services help reduce project costs, improve efficiency and maintain structural quality.",
    buttonText: "Discuss Your Project",
    buttonLink: "/contact-us",
  },
];

// Dynamic hero text
const HeroContent = memo(function HeroContent() {
  const [slideTextCount, setSlideTextCount] = useState(0);

  const slideData = heroSlides[slideTextCount];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideTextCount((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-content">
      <p className="hero-eyebrow">Tectonic Engineering</p>

      <div key={slideTextCount} className="hero-text-animation">
        <h1 className="hero-title">
          {slideData.title}
          <span className="hero-highlight">{slideData.highlight}</span>
        </h1>

        <p className="hero-description">{slideData.description}</p>

        <a href={slideData.buttonLink} className="hero-button">
          {slideData.buttonText}
        </a>
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
      {images.map((image, index) => (
        <img
          key={image}
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
        aria-label="Previous image"
        className="hero-arrow hero-arrow-left"
      >
        <FaChevronLeft />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next image"
        className="hero-arrow hero-arrow-right"
      >
        <FaChevronRight />
      </button>

      <div className="hero-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show image ${index + 1}`}
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
  const touchStartX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const distance =
      touchStartX.current - event.changedTouches[0].clientX;

    if (Math.abs(distance) > 50) {
      distance > 0 ? nextSlide() : prevSlide();
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

      <HeroContent />
    </section>
  );
};

export default HeroSection;
