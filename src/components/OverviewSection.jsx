
import Title from "./Title";
import engineeringImage1 from "../assets/imagesForOverViewAndFacts/Engineers_Inspect_Steel_Framework.webp"
import engineeringImage2 from "../assets/imagesForOverViewAndFacts/Engineers_Overseeing_High-Rise_Construction.webp"
const facts = [
  { number: "2019", label: "Established", detail: "Our journey began" },
  { number: "08", label: "Team Members", detail: "Engineering professionals" },
  { number: "20+", label: "Projects", detail: "Completed by 2021" },
  { number: "2 Continents", label: "Project Reach", detail: "India and Africa" },
];

const services = [
  "Structural Design & Drafting",
  "Structural Peer Review",
  "Structural Audit",
  "Value Engineering",
  "Cost Optimisation",
  "BOQ & Bar Bending Schedules",
  "Structural Steel Detailing",
  "Connection Design",
];

const projects = [
  {
    number: "01",
    title: "Dr. Babasaheb Ambedkar Statue",
    location: "Mumbai, India",
    description:
      "Structural connection design and fabrication detailing for the 351 ft statue. Project ongoing.",
  },
  {
    number: "02",
    title: "NOSI Technological Park",
    location: "Cape Verde, Africa",
    description:
      "Structural design for five uniquely shaped composite buildings.",
  },
  {
    number: "03",
    title: "Khurja Super Thermal Power Project",
    location: "Khurja, India",
    description:
      "Connection design and fabrication detailing for CWPH and RWPH units for THDCIL.",
  },
  {
    number: "04",
    title: "Infrastructure & Industrial Projects",
    location: "Across India",
    description:
      "Selected works for IOCL, BHEL, Power Grid, RVNL and Assam PWD.",
  },
];

const software = [
  "STAAD Pro",
  "ETABS",
  "SAFE",
  "AutoCAD",
  "Tekla Structures",
  "IDEA StatiCa",
];

const OverviewSection = () => {
  return (
    <section
      id="overview"
      className="overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Company Overview */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Title
              title="Engineering Excellence, Built on Trust"
              subtitle="A structural engineering consultancy delivering design, detailing and review for complex structures across India and Africa."
            />

            <p className="leading-8 text-body">
              Tectonic Engineering Solution LLP is a structural engineering
              consultancy based in Rajendra Place, New Delhi. Established in
              2019 as a proprietary firm, it was formally restructured as an
              LLP in 2025.
            </p>

            <p className="mt-4 leading-8 text-body">
              Our team delivers engineering solutions for buildings,
              industrial structures and infrastructure projects, as well as
              the evaluation, renovation and repair of existing structures.
              We combine technical expertise with modern design and detailing
              tools to support projects from design through fabrication.
            </p>

            <div className="mt-7">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-heading">
                Engineering Software
              </h3>

              <div className="flex flex-wrap gap-2">
                {software.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-body transition hover:border-secondary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Two Project Images */}
          <div className="relative pb-10 pl-4 sm:pl-10">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={engineeringImage1}
                alt="Structural engineering project"
                className="h-72 w-full object-cover sm:h-96"
                loading="lazy"
              />
            </div>

            <div className="relative -mt-24 w-3/5 overflow-hidden rounded-xl border-4 border-surface shadow-xl">
              <img
                src={engineeringImage2}
                alt="Engineering detailing and construction"
                className="h-40 w-full object-cover sm:h-52"
                loading="lazy"
              />
            </div>

            <div className="absolute right-0 top-5 hidden rounded-xl bg-primary px-5 py-4 text-surface shadow-lg sm:block">
              <p className="text-3xl font-extrabold text-secondary">2019</p>
              <p className="mt-1 text-xs text-surface/80">
                Established in New Delhi
              </p>
            </div>
          </div>
        </div>

        {/* Fast Facts */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:mt-24 lg:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border border-border bg-surface p-5 transition duration-300 hover:-translate-y-1 hover:border-secondary/60 hover:shadow-lg sm:p-7"
            >
              <p className="text-2xl font-extrabold text-primary sm:text-3xl">
                {fact.number}
              </p>

              <h3 className="mt-3 font-bold text-heading">
                {fact.label}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                {fact.detail}
              </p>
            </div>
          ))}
        </div>

    
    
      </div>
    </section>
  );
};

export default OverviewSection;
