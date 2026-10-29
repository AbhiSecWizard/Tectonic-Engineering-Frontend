import { FaBullseye, FaCheck, FaHandshake } from "react-icons/fa";
import Title from "../components/Title";
import TeamSection from "../components/TeamSection";
import ClientsSection from "../components/ClientSection";

const snapshot = [
  { label: "Legal name", value: "Tectonic Engineering Solution LLP" },
  {
    label: "Founded",
    value: "2019 as a proprietary firm; restructured as an LLP in 2025",
  },
  {
    label: "Office",
    value: "1006, Hemkunt Tower-6, Rajendra Place, New Delhi – 110008",
  },
  { label: "Team", value: "8 people" },
  { label: "Reach", value: "Projects across India and in Cape Verde, Africa" },
  { label: "Managing Partner", value: "Er. Subhankar Petal" },
];

const pillars = [
  {
    id: "approach",
    icon: FaHandshake,
    title: "Our Approach",
    text: "We are highly responsive to client needs, flexible in outlook, and creative within the practical bounds of each project. Our goal is outcomes that are brilliant, but functional.",
  },
  {
    id: "vision",
    icon: FaBullseye,
    title: "Our Vision",
    text: "To turn our current successes into greater value by taking on the next generation of challenges with pioneering solutions and sustainable strategies.",
  },
];

const journey = [
  {
    year: "2019",
    title: "Inception",
    text: "Started as Tectonic Engineering, a proprietary firm, with a team of 3.",
  },
  {
    year: "2021",
    title: "Project milestone",
    text: "Successfully completed 20 projects.",
  },
  {
    year: "2023",
    title: "Team expansion",
    text: "The team grew to 5 people.",
  },
  {
    year: "2025",
    title: "Formal restructuring",
    text: "Established as Tectonic Engineering Solution LLP, with a team of 8.",
  },
];

const serviceGroups = [
  {
    title: "Structural Design Consultancy",
    items: [
      { name: "Structural Design & Drafting" },
      {
        name: "Structural Peer Review",
        note: "Proof checking and value engineering.",
      },
      {
        name: "Value Engineering",
        note: "Cost-effective alternatives without compromising quality.",
      },
      {
        name: "Structural Audit",
        note: "Strength assessment and rehabilitation of distressed buildings, repair and retrofitting.",
      },
      { name: "Cost Optimisation" },
      { name: "BOQ & Bar Bending Schedule" },
    ],
  },
  {
    title: "Structural Steel Detailing",
    items: [
      {
        name: "Detail Fabrication Drawings",
        note: "CAM data for manufacturing and material supply, with detailed material lists.",
      },
      {
        name: "General Arrangement Drawings",
        note: "Prepared in Tekla and AutoCAD.",
      },
      {
        name: "Connection Design",
        note: "FEM on IDEA StatiCa, plus manual design calculation spreadsheets.",
      },
    ],
  },
];

const sectors = [
  "High-rise residential buildings",
  "Industrial sheds",
  "PEB structures",
  "Hospitals & medical facilities",
  "Railway structures",
  "Sports facilities",
  "Gigantic concrete & steel statues",
  "Earth & liquid retention structures",
  "Sewage treatment plants",
  "Hoardings",
  "Machine foundations",
];

const steps = [
  {
    title: "Formulate the scheme",
    text: "We formulate a structural scheme for the project.",
  },
  {
    title: "Discuss in-house",
    text: "We discuss it in-house, and consult academicians if needed.",
  },
  {
    title: "Get approval",
    text: "The proposed structural system goes to the architects or clients for approval.",
  },
  {
    title: "Model in 3D",
    text: "We build a 3D structural model in design software, simulating how the structure behaves in an actual building.",
  },
  {
    title: "Study the results",
    text: "We study the analysis results thoroughly, with special attention to codal requirements.",
  },
  {
    title: "Issue design and details",
    text: "We issue the design and details within Indian Standards, and refer to international standards where the Indian ones are silent.",
  },
];

const tools = [
  {
    title: "Design",
    text: "STAAD Pro, ETABS and SAFE, plus in-house worksheets built from past experience to speed up analysis and design.",
  },
  { title: "Drafting", text: "Drawings are drafted in AutoCAD." },
  { title: "Steel detailing", text: "Tekla Structures with AutoCAD." },
  {
    title: "Connection design",
    text: "FEM on IDEA StatiCa, plus manual design calculation spreadsheets.",
  },
  {
    title: "Quality",
    text: "We work to ISO 9001 guidelines, and every piece of information in our organisation is documented.",
  },
  {
    title: "Code library",
    text: "Our own library of national and international codes and books on civil and structural engineering.",
  },
];

const memberships = [
  { name: "The Institution of Engineers – Chartered Engineer", tag: "C.E." },
  { name: "The Institution of Engineers – Member", tag: "M.I.E." },
  { name: "Indian Association of Structural Engineers", tag: "IAStructE" },
  { name: "Delhi Development Authority", tag: "Licence" },
  { name: "Municipal Corporation of Delhi", tag: "Licence" },
];

const divisions = [
  {
    title: "Structure Design",
    levels: [
      "Head – Structure Design",
      "Sr. Engineer (Team Leader)",
      "Engineer / Jr. Engineer · Sr. Detailer",
      "Jr. Draftsman",
    ],
  },
  {
    title: "Steel Detailing",
    levels: [
      "Head – Steel Detailing (LPM)",
      "Manager / Team Leader",
      "Modeler · Editor (Detailer) · Checker · QA/QC",
    ],
  },
];

const indent = ["ml-0", "ml-4", "ml-8", "ml-12"];

const tones = { surface: "bg-surface", background: "bg-background" };
const cardOnSurface = "border border-border bg-background";
const cardOnBackground = "border border-border bg-surface";

const SectionHeading = ({ children }) => (
  <div>
    <h2 className="text-2xl font-bold text-heading">{children}</h2>
    <span className="mt-2 block h-0.5 w-16 bg-primary" aria-hidden="true" />
  </div>
);

const Section = ({ tone, title, subtitle, children }) => (
  <section className={`${tones[tone]} py-16`}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {title && <Title title={title} subtitle={subtitle} />}
      <div className={title ? "mt-12" : undefined}>{children}</div>
    </div>
  </section>
);

const About = () => {
  return (
    <main>
      <header className="bg-primary py-16 text-surface sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">ABOUT US</h1>
          <p className="mt-4 text-xl text-surface/90">
            Premier Structure Design &amp; Detailing Company
          </p>
          <p className="mt-2 max-w-2xl text-surface/80">
            Based in Rajendra Place, New Delhi, delivering structural
            engineering across India and Africa.
          </p>
        </div>
      </header>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeading>WHO WE ARE</SectionHeading>
            <div className="mt-8 space-y-5 leading-relaxed text-body">
              <p>
                Tectonic Engineering Solution LLP is a structural engineering
                consultancy with expertise in designing new buildings and
                industrial structures, and in evaluating, renovating and
                repairing existing ones.
              </p>
              <p>
                We give clients complete engineering services based on thorough
                investigation, analysis, design, economic considerations and
                functional requirements. We have worked for government and
                private clients, Public Works Departments, Development
                Authorities, and state and central government PSUs.
              </p>
            </div>
          </div>

          <div className={`${cardOnSurface} p-6 lg:col-span-2`}>
            <h3 className="text-lg font-semibold text-heading">
              Company at a glance
            </h3>
            <dl className="mt-4">
              {snapshot.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-3 gap-4 border-b border-border py-3 last:border-b-0"
                >
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="col-span-2 text-sm font-medium text-body">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="background">
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map(({ id, icon: Icon, title, text }) => (
            <article
              key={id}
              className={`${cardOnBackground} flex gap-5 p-8`}
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-heading">{title}</h3>
                <p className="mt-3 leading-relaxed text-body">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="surface"
        title="OUR JOURNEY"
        subtitle="How Tectonic Engineering has grown since 2019"
      >
        <ol className="mx-auto max-w-3xl border-l-2 border-border">
          {journey.map(({ year, title, text }) => (
            <li key={year} className="relative pb-10 pl-8 last:pb-0">
              <span
                className="absolute top-1.5 -left-[7px] size-3 rounded-full bg-secondary ring-4 ring-surface"
                aria-hidden="true"
              />
              <p className="text-sm font-bold text-primary">{year}</p>
              <h3 className="mt-1 text-lg font-semibold text-heading">
                {title}
              </h3>
              <p className="mt-1 text-body">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        tone="background"
        title="WHAT WE DO"
        subtitle="Structural design consultancy and structural steel detailing"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {serviceGroups.map(({ title, items }) => (
            <article key={title} className={`${cardOnBackground} p-8`}>
              <h3 className="text-xl font-semibold text-heading">{title}</h3>
              <ul className="mt-6 space-y-4">
                {items.map(({ name, note }) => (
                  <li key={name} className="flex gap-3">
                    <FaCheck
                      className="mt-1.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-heading">{name}</p>
                      {note && (
                        <p className="mt-0.5 text-sm text-muted">{note}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-heading">
            Sectors we design for
          </h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {sectors.map((sector) => (
              <li
                key={sector}
                className="border border-border bg-surface px-4 py-2 text-sm text-body"
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        tone="surface"
        title="HOW WE WORK"
        subtitle="A clear process from the first scheme to the issued drawings"
      >
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ title, text }, index) => (
            <li key={title} className={`${cardOnSurface} p-6`}>
              <span className="flex size-10 items-center justify-center rounded-full bg-primary font-semibold text-surface">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-heading">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        tone="background"
        title="TOOLS & RESOURCES"
        subtitle="The software, standards and references behind our work"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ title, text }) => (
            <article key={title} className={`${cardOnBackground} p-6`}>
              <h3 className="text-lg font-semibold text-heading">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading>TE CULTURE</SectionHeading>
            <div className="mt-8 space-y-5 leading-relaxed text-body">
              <p>
                We believe in working for the love of the work, not only for
                money. Tectonic Engineering works as a team within a
                well-defined hierarchy, and our team members are our assets.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading>MEMBERSHIPS &amp; LICENCES</SectionHeading>
            <ul className={`${cardOnSurface} mt-8 divide-y divide-border`}>
              {memberships.map(({ name, tag }) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <span className="text-body">{name}</span>
                  <span className="shrink-0 text-sm font-semibold text-primary">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        tone="background"
        title="ORGANISATION STRUCTURE"
        subtitle="When the structure is clear, the decisions are fast"
      >
        <div className="flex justify-center">
          <p className="bg-primary px-8 py-3 font-semibold text-surface">
            Managing Partner
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {divisions.map(({ title, levels }) => (
            <article key={title} className={`${cardOnBackground} p-6`}>
              <h3 className="text-lg font-semibold text-heading">{title}</h3>
              <ol className="mt-5 space-y-3">
                {levels.map((level, index) => (
                  <li
                    key={level}
                    className={`${indent[index]} border border-border bg-background px-4 py-3 text-sm text-body`}
                  >
                    {level}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Administrative staff support both divisions.
        </p>
      </Section>

      <TeamSection />
      <ClientsSection />
    </main>
  );
};

export default About;