import Title from "../components/Title";

const steps = [
  {
    title: "Strength Assessment",
    text: "Evaluating the present condition and load-carrying capacity of existing buildings.",
  },
  {
    title: "Rehabilitation",
    text: "Restoring distressed buildings to a safe and serviceable condition.",
  },
  {
    title: "Repair",
    text: "Engineered repair of damaged structural elements.",
  },
  {
    title: "Retrofitting",
    text: "Strengthening existing structures to extend their service life.",
  },
];

const clients = [
  "Owners of old or damaged buildings",
  "Industrial facilities",
  "Government and private clients",
];

const StructuralAuditRepair = () => {
  return (
    <section id="structural-audit-repair" className="bg-background py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Title
          title="Structural Audit & Repair"
          subtitle="Assess, strengthen and extend the life of existing structures."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <img
              src="/images/services/structural-audit.jpg"
              alt="Engineer inspecting an existing concrete structure"
              className="h-96 w-full rounded-2xl object-cover shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-secondary" />
          </div>

          {/* Content */}
          <div>
            <p className="mb-4 leading-8 text-body">
              We have extensive expertise in evaluating, renovating and
              repairing existing structures. Our audit work starts with a
              strength assessment, followed by rehabilitation of distressed
              buildings, repair and retrofitting.
            </p>
            <p className="mb-8 leading-8 text-muted">
              Every recommendation is based on thorough investigation and
              analysis, so clients can decide on repair or renovation with
              confidence.
            </p>

            <h3 className="mb-4 text-lg font-bold text-heading">Who It's For</h3>
            <ul className="flex flex-wrap gap-2">
              {clients.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process steps */}
        <div className="mt-16">
          <h3 className="mb-6 text-lg font-bold text-heading">What We Do</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:shadow-lg"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-secondary">
                  {index + 1}
                </span>
                <h4 className="mb-2 font-bold text-heading">{step.title}</h4>
                <p className="text-sm leading-6 text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructuralAuditRepair;