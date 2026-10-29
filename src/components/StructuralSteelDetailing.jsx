import Title from "../components/Title";

const offerings = [
  {
    number: "01",
    title: "Detail Fabrication Drawing",
    text: "CAM data for the manufacturing process and material supply, with detailed material lists.",
  },
  {
    number: "02",
    title: "General Arrangement Drawing",
    text: "Prepared using advanced detailing software such as Tekla and AutoCAD.",
  },
  {
    number: "03",
    title: "Connection Design",
    text: "Using FEM in IDEA StatiCa and manual design calculation spreadsheets.",
  },
];

const workflow = ["Modeler", "Editor (Detailer)", "Checker", "QA / QC"];

const projects = [
  "Statue steel structures for Ram Sutar Fine Art",
  "Khurja Super Thermal Power Project (THDCIL)",
  "PEB store buildings for Power Grid",
  "Railway structures for RVNL and N.E. Railway",
];

const StructuralSteelDetailing = () => {
  return (
    <section id="structural-steel-detailing" className="bg-footer py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Title
          light
          title="Structural Steel Detailing"
          subtitle="Accurate, fabrication-ready drawings produced with advanced detailing software."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <p className="mb-6 leading-8 text-slate-300">
              Our steel detailing team uses Tekla Structures with AutoCAD to
              produce drawings that fabricators can build from directly. The
              team coordinates closely with client and site teams throughout
              the project.
            </p>

            <h3 className="mb-4 text-lg font-bold text-secondary">
              Our Quality Workflow
            </h3>
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {workflow.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                    {step}
                  </span>
                  {index < workflow.length - 1 && (
                    <span className="text-secondary">→</span>
                  )}
                </div>
              ))}
            </div>

            <h3 className="mb-4 text-lg font-bold text-secondary">
              Featured Projects
            </h3>
            <ul className="space-y-3">
              {projects.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/images/services/steel-detailing.jpg"
              alt="Steel structure with beams and bolted connections"
              className="h-96 w-full rounded-2xl object-cover shadow-lg"
            />
            <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl border-2 border-secondary" />
          </div>
        </div>

        {/* Offerings */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {offerings.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <span className="mb-4 block text-3xl font-extrabold text-secondary">
                {item.number}
              </span>
              <h4 className="mb-2 font-bold text-white">{item.title}</h4>
              <p className="text-sm leading-6 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StructuralSteelDetailing;