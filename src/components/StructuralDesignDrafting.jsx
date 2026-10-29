import Title from "../components/Title";

const sectors = [
  "High-Rise Residential Buildings",
  "Industrial Sheds & PEB Structures",
  "Hospitals & Medical Facilities",
  "Railway Structures",
  "Sports Facilities",
  "Concrete & Steel Statues",
  "Earth & Liquid Retention Structures",
  "Sewage Treatment Plants",
  "Hoarding Design",
  "Machine Foundations",
];

const tools = ["STAAD Pro", "ETABS", "SAFE", "AutoCAD"];

const projects = [
  "351 ft Dr. Babasaheb Ambedkar Statue, Mumbai",
  "36 m Tall Hoarding (8 m x 6 m)",
  "7.5 MLD STP-SBR Basin",
  "Technological Park, Cape Verde",
];

const StructuralDesignDrafting = () => {
  return (
    <section id="structural-design-drafting" className="bg-background py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Title
          title="Structural Design & Drafting"
          subtitle="Safe, economical structures designed from concept to drawing."
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <img
              src="/images/services/structural-design.jpg"
              alt="Structural design model of a large building"
              className="h-96 w-full rounded-2xl object-cover shadow-lg lg:h-[520px]"
            />
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-secondary" />
          </div>

          {/* Content */}
          <div>
            <p className="mb-4 leading-8 text-body">
              We begin every project by formulating a structural scheme,
              discussing it in-house, and consulting academicians where
              required. The proposed system goes to the architect or client for
              approval, and we then build a three-dimensional model that
              simulates the structure as it behaves in real buildings.
            </p>
            <p className="mb-8 leading-8 text-muted">
              We study the analysis results carefully and give special
              attention to codal requirements. Our designs and details stay
              within Indian Standards, and we refer to International Standards
              where Indian Standards are silent.
            </p>

            <h3 className="mb-4 text-lg font-bold text-heading">
              Sectors We Design For
            </h3>
            <ul className="mb-8 grid gap-3 sm:grid-cols-2">
              {sectors.map((item) => (
                <li key={item} className="flex items-start gap-2 text-body">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-white">
                    ✓
                  </span>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mb-8 rounded-xl border border-border bg-surface p-5">
              <p className="mb-1 text-sm font-bold uppercase tracking-wider text-primary">
                Also Included
              </p>
              <p className="text-body">BOQ & Bar Bending Schedule</p>
            </div>

            <h3 className="mb-3 text-lg font-bold text-heading">Tools We Use</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured projects */}
        <div className="mt-16 rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8">
          <h3 className="mb-5 text-lg font-bold text-heading">Featured Projects</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <div
                key={project}
                className="rounded-xl border-l-4 border-secondary bg-background p-4 text-sm font-medium text-body"
              >
                {project}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructuralDesignDrafting;