
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 20, suffix: "+", label: "Projects Completed", note: "By 2021" },
  { value: 13, suffix: "", label: "Esteemed Clients", note: "Across sectors" },
  { value: 8, suffix: "", label: "Team Members", note: "As of 2025" },
  { value: 5, suffix: "", label: "Landmark Statues", note: "Including ongoing work" },
];

const useCountUp = (target, active, duration = 1400) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frameId;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [target, active, duration]);

  return count;
};

const StatCard = ({ stat, active }) => {
  const count = useCountUp(stat.value, active);

  return (
    <div className="px-3 py-5 text-center sm:px-5">
      <p className="text-4xl font-extrabold tracking-tight text-surface sm:text-5xl">
        {count}
        {stat.suffix}
      </p>

      <h3 className="mt-3 text-sm font-semibold text-surface sm:text-base">
        {stat.label}
      </h3>

      <p className="mt-1 text-xs text-surface/65 sm:text-sm">
        {stat.note}
      </p>

      <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-secondary" />
    </div>
  );
};

const CompanyStats = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-footer px-5 py-14 sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary sm:text-sm">
            Tectonic Engineering Solution LLP
          </p>

          <h2 className="mt-4 text-2xl font-light leading-tight text-surface sm:text-4xl lg:text-5xl">
            Engineering Excellence.
            <span className="mt-2 block font-semibold">
              Built on Trust.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-surface/70 sm:text-base">
            Delivering structural engineering, detailing and design solutions
            for complex projects across India and Africa.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 divide-x divide-y divide-surface/15 border-y border-surface/15 sm:mt-14 sm:grid-cols-4 sm:divide-y-0">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              stat={stat}
              active={active}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-surface/55">
          Figures reflect the supplied company profile. Project and client
          totals are reported as stated, not as current lifetime totals.
        </p>
      </div>
    </section>
  );
};

export default CompanyStats;
