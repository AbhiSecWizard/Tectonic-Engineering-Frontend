import { useState } from "react";
import Title from "./Title";

const categories = [
  "All",
  "Statues",
  "Industrial & Energy",
  "Railway",
  "Commercial",
  "Residential",
  "Infrastructure",
];

const SCOPE = "Structural connection design and fabrication detailing.";
const STATUE_CLIENT = "Ram Sutar Fine Art Pvt. Ltd.";

// Statues come first so they lead the default "All" view.
const projects = [
  {
    id: "ambedkar-statue",
    title: "Dr. Babasaheb Ambedkar Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Mumbai, Maharashtra",
    detail: `351 ft statue. ${SCOPE}`,
    status: "Ongoing",
  },
  {
    id: "lachit-statue",
    title: "Lachit Borphukan Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Jorhat, Assam",
    detail: `125 ft statue. ${SCOPE}`,
  },
  {
    id: "shivaji-statue",
    title: "Chhatrapati Shivaji Maharaj Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Malvan, Maharashtra",
    detail: `91 ft statue. ${SCOPE}`,
  },
  {
    id: "ram-goa-statue",
    title: "Lord Ram Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Goa",
    detail: `77 ft statue. ${SCOPE}`,
  },
  {
    id: "ram-bareilly-statue",
    title: "Lord Ram Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Bareilly, Uttar Pradesh",
    detail: `51 ft statue. ${SCOPE}`,
  },
  {
    id: "technological-park",
    title: "Technological Park",
    category: "Commercial",
    client: "NOSI",
    location: "Cape Verde, Africa",
    detail:
      "Five composite buildings of unique shape for a data centre, incubation centre and business centre.",
  },
  {
    id: "iocl-rack",
    title: "Refinery Pipe & Cable Rack",
    category: "Industrial & Energy",
    client: "IOCL",
    detail:
      "Elevated pipe and cable rack, 35 m span trestle and drain crossing for an oil and gas refinery plant.",
  },
  {
    id: "bhel-jamalpur",
    title: "PEB Shed at Jamalpur",
    category: "Industrial & Energy",
    client: "BHEL",
    location: "Jamalpur",
    detail: "PEB shed of 50 m × 120 m with a 25 m span.",
  },
  {
    id: "bhel-kurja",
    title: "Pipe Rack, Store & Substation",
    category: "Industrial & Energy",
    client: "BHEL",
    location: "Kurja",
    detail:
      "Pipe and cable rack, construction store at Kurja and a thermal power substation.",
  },
  {
    id: "khurja-power",
    title: "Khurja Super Thermal Power Project",
    category: "Industrial & Energy",
    client: "THDCIL",
    location: "Khurja",
    detail: `${SCOPE} For the CWPH and RWPH units.`,
  },
  {
    id: "pgcil-stores",
    title: "GIS Substation Store Buildings",
    category: "Industrial & Energy",
    client: "Power Grid Corporation of India Ltd.",
    detail:
      "PEB store buildings of 16 m × 41 m at GIS-Jaipur and 33 m × 13 m at GIS-Koteshwar.",
  },
  {
    id: "lnt-store",
    title: "Construction Store & Watch Towers",
    category: "Industrial & Energy",
    client: "L&T",
    detail: "A 29 m × 70 m construction store and 7.5 m high watch towers.",
  },
  {
    id: "ne-railway-shed",
    title: "Sick Line Shed",
    category: "Railway",
    client: "N.E. Railway",
    detail: "Standard sick line shed of 55 m × 18 m.",
  },
  {
    id: "ramnathpur-fob",
    title: "Foot Over Bridge, Ramnathpur",
    category: "Railway",
    client: "RVNL",
    location: "Ramnathpur Station",
    detail: "FOB for the Bsb–Pryj doubling project.",
  },
  {
    id: "lc-72-rob",
    title: "ROB at LC No. 72",
    category: "Railway",
    client: "RVNL",
    location: "Patna Sahib – Gulzarbagh",
    detail: "Road over bridge for two-wheeler traffic.",
  },
  {
    id: "assam-police-hq",
    title: "Assam Police Headquarters",
    category: "Commercial",
    client: "Assam PWD",
    detail: "PEB structure, G+2+T.",
  },
  {
    id: "assam-car-parking",
    title: "Multilevel Car Parking",
    category: "Commercial",
    client: "Assam PWD",
    detail: "PEB structure, G+2+T.",
  },
  {
    id: "radtech-office",
    title: "Office Building",
    category: "Commercial",
    client: "Radtech Buildcon Pvt. Ltd.",
    detail: "RCC structure of 36,000 sq ft, 2B+G+6+T.",
  },
  {
    id: "eligo-centre",
    title: "Eligo Experience Centre",
    category: "Commercial",
    client: "Wave Infratech",
    detail: "Experience centre building.",
  },
  {
    id: "bar-bending-yard",
    title: "Bar Bending Yard",
    category: "Industrial & Energy",
    client: "Wave Infratech",
    detail: "State-of-the-art bar bending yard in a PEB shed.",
  },
  {
    id: "narmada-nirvana",
    title: "Narmada Nirvana Phase III",
    category: "Residential",
    client: "Melage Studio",
    location: "Indore, Madhya Pradesh",
    detail: "Villas.",
  },
  {
    id: "platinum-greens",
    title: "Platinum Greens",
    category: "Residential",
    client: "Melage Studio",
    location: "Patna, Bihar",
    detail: "High-end luxury apartments.",
  },
  {
    id: "stp-tanks",
    title: "STP & Water Tanks",
    category: "Infrastructure",
    client: "Wave Infratech",
    detail: "7.5 MLD STP-SBR basin with underground and overhead water tanks.",
  },
  {
    id: "culvert-flue-stack",
    title: "Culvert, ESS & DG Flue Stack",
    category: "Infrastructure",
    client: "Wave Infratech",
    detail: "Culvert, ESS and a 36 m DG flue stack.",
  },
  {
    id: "club-community",
    title: "Club, Community Center & Pool",
    category: "Infrastructure",
    client: "Wave Infratech",
    detail: "Club building, community center and swimming pool.",
  },
  {
    id: "hoarding",
    title: "Hoarding & Signage",
    category: "Infrastructure",
    client: "Wave Infratech",
    detail: "8 m × 6 m hoarding, 36 m tall, plus signage and unipole.",
  },
];

const INITIAL_COUNT = 6;

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(false);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((project) => project.category === active);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);

  const selectCategory = (category) => {
    setActive(category);
    setExpanded(false);
  };

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Title
          title="OUR PROJECTS"
          subtitle="A diverse portfolio of complex structures delivered across India and Africa"
        />

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectCategory(category)}
                className={`border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                  isActive
                    ? "border-primary bg-primary text-surface"
                    : "border-border bg-surface text-body hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(
            ({ id, title, category, client, location, detail, status }) => (
              <article
                key={id}
                className="flex flex-col border border-border bg-background p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-primary">{category}</p>
                  {status && (
                    <span className="bg-secondary px-2 py-0.5 text-xs font-semibold text-footer">
                      {status}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-heading">
                  {title}
                </h3>
                {location && (
                  <p className="mt-1 text-sm text-muted">{location}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {detail}
                </p>

                <p className="mt-auto pt-5 text-sm text-muted">
                  Client: <span className="font-medium text-body">{client}</span>
                </p>
              </article>
            )
          )}
        </div>

        {filtered.length > INITIAL_COUNT && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              {expanded
                ? "Show fewer projects"
                : `Show all ${filtered.length} projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;