import {
  FaClipboardCheck,
  FaEnvelope,
  FaHandshake,
  FaMapMarkerAlt,
  FaMonument,
  FaPhoneAlt,
  FaTools,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import Title from "../components/Title";

const CONTACT = {
  email: "tectoniceng@outlook.com",
  phone: "+91 8800683542",
  phoneHref: "tel:+918800683542",
  address: "1006, Hemkunt Tower-6, Rajendra Place, New Delhi – 110008",
};

// Add real openings here. Example:
// { id: "sr-engineer", title: "Senior Engineer", division: "Structure Design",
//   location: "New Delhi", type: "Full time", summary: "Short description" }
const openings = [];

const stats = [
  { value: "2019", label: "Year we were founded" },
  { value: "3 → 8", label: "Team size, 2019 to 2025" },
  { value: "13", label: "Esteemed clients" },
  { value: "5", label: "Landmark statues" },
];

const reasons = [
  {
    icon: FaMonument,
    title: "Landmark projects",
    text: "Work on statues up to 351 ft tall and a technology park in Cape Verde, Africa.",
  },
  {
    icon: FaHandshake,
    title: "Leading clients",
    text: "Design and detailing for IOCL, BHEL, L&T, Power Grid, DMRC, Indian Railway and more.",
  },
  {
    icon: FaUsers,
    title: "A team that values people",
    text: "Our team members are our assets, and we work together in a well-defined hierarchy.",
  },
  {
    icon: FaTools,
    title: "The right tools",
    text: "STAAD Pro, ETABS, SAFE, Tekla Structures and IDEA StatiCa, plus our own library of national and international codes and books.",
  },
  {
    icon: FaClipboardCheck,
    title: "Documented, reviewed work",
    text: "We work to ISO 9001 guidelines, document every piece of information, and study analysis results against codal requirements.",
  },
  {
    icon: FaUserGraduate,
    title: "Part of the professional community",
    text: "We are active in The Institution of Engineers and IAStructE, and take part in seminars and conferences.",
  },
];

const divisions = [
  {
    id: "structure-design",
    name: "Structure Design",
    lead: "Led by Er. Subhankar Petal, Chartered Engineer (IEI) with an M.Tech in Structural Engineering",
    description:
      "Structural design and drafting, peer review, value engineering, structural audit, cost optimisation, and BOQ & bar bending schedules.",
    roles: [
      "Sr. Engineer (Team Leader)",
      "Engineer / Jr. Engineer",
      "Sr. Detailer",
      "Jr. Draftsman",
    ],
    tools: ["STAAD Pro", "ETABS", "SAFE", "AutoCAD"],
  },
  {
    id: "steel-detailing",
    name: "Steel Detailing",
    lead: "Led by Chinmoy Mondal, B.Tech (Civil) with 10+ years in structural steel detailing",
    description:
      "Detail fabrication drawings with CAM data, general arrangement drawings and connection design.",
    roles: [
      "Manager / Team Leader",
      "Modeler",
      "Editor (Detailer)",
      "Checker",
      "QA / QC",
    ],
    tools: ["Tekla Structures", "AutoCAD", "IDEA StatiCa"],
  },
];

const applyHref = (subject) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

const SectionHeading = ({ children }) => (
  <div>
    <h2 className="text-2xl font-bold text-heading">{children}</h2>
    <span className="mt-2 block h-0.5 w-16 bg-primary" aria-hidden="true" />
  </div>
);

const Career = () => {
  return (
    <main>
      <header className="bg-primary py-16 text-surface sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">CAREERS</h1>
          <p className="mt-4 max-w-2xl text-xl text-surface/90">
            Join a team that designs and details complex structures across India
            and Africa.
          </p>
          <p className="mt-2 text-surface/80">
            We work because we love to work.
          </p>
        </div>
      </header>

      <section className="bg-surface py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-3">
            <SectionHeading>WORK WITH US</SectionHeading>
            <div className="mt-8 space-y-5 leading-relaxed text-body">
              <p>
                Tectonic Engineering Solution LLP began in 2019 as a team of 3
                and now has a technical team of 8. We believe in working for the
                love of the work, not only for money.
              </p>
              <p>
                Every project starts with a structural scheme that we discuss
                in-house. We then build a 3D model in design software and study
                the analysis results against codal requirements. Working here
                means seeing how a design goes from the first idea to the issued
                drawings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {stats.map(({ value, label }) => (
              <div key={label} className="border border-border bg-background p-5">
                <p className="text-3xl font-bold text-primary">{value}</p>
                <p className="mt-1 text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Title
            title="WHY WORK WITH US"
            subtitle="What you get to be part of at Tectonic Engineering"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }) => (
              <article key={title} className="border border-border bg-surface p-6">
                <span className="flex size-14 items-center justify-center rounded-full border border-primary text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-heading">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Title
            title="OUR TEAMS"
            subtitle="Two divisions, each with its own roles and tools"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {divisions.map(
              ({ id, name, lead, description, roles, tools }) => (
                <article
                  key={id}
                  className="border border-border bg-background p-8"
                >
                  <h3 className="text-xl font-semibold text-heading">{name}</h3>
                  <p className="mt-1 text-sm text-muted">{lead}</p>
                  <p className="mt-4 leading-relaxed text-body">{description}</p>

                  <p className="mt-6 text-sm font-semibold text-heading">
                    Roles in this team
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <li
                        key={role}
                        className="border border-border bg-surface px-3 py-1.5 text-sm text-body"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-sm font-semibold text-heading">
                    Tools you will use
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <li
                        key={tool}
                        className="bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            )}
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            Administrative staff support both divisions.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading>OPEN POSITIONS</SectionHeading>

            {openings.length > 0 ? (
              <ul className="mt-8 space-y-4">
                {openings.map(
                  ({ id, title, division, location, type, summary }) => (
                    <li key={id} className="border border-border bg-surface p-6">
                      <h3 className="text-lg font-semibold text-heading">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {[division, location, type].filter(Boolean).join(" · ")}
                      </p>
                      {summary && (
                        <p className="mt-3 text-sm leading-relaxed text-body">
                          {summary}
                        </p>
                      )}
                      <a
                        href={applyHref(`Application: ${title}`)}
                        className={`mt-4 inline-block text-sm font-semibold text-primary hover:text-secondary ${focusRing}`}
                      >
                        Apply by email
                      </a>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <div className="mt-8 border border-border bg-surface p-6">
                <p className="font-semibold text-heading">
                  No specific openings are listed on this page.
                </p>
                <p className="mt-2 leading-relaxed text-body">
                  Interested in working with us? Send your CV and tell us which
                  team and role you have in mind.
                </p>
              </div>
            )}
          </div>

          <div>
            <SectionHeading>HOW TO APPLY</SectionHeading>

            <div className="mt-8 border border-border bg-surface p-6">
              <ol className="list-decimal space-y-3 pl-5 text-body">
                <li>
                  Email your CV to{" "}
                  <span className="font-medium text-heading">
                    {CONTACT.email}
                  </span>
                  .
                </li>
                <li>
                  Mention the team (Structure Design or Steel Detailing) and the
                  role you are interested in.
                </li>
              </ol>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={applyHref("Job application")}
                  className={`flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-surface hover:bg-footer ${focusRing}`}
                >
                  <FaEnvelope className="size-4" aria-hidden="true" />
                  Email your CV
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className={`flex items-center gap-2 border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-surface ${focusRing}`}
                >
                  <FaPhoneAlt className="size-4" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </div>

              <p className="mt-6 flex gap-3 border-t border-border pt-5 text-sm text-body">
                <FaMapMarkerAlt
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>
                  {CONTACT.address}. Our office is equipped with modern
                  facilities.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Career;