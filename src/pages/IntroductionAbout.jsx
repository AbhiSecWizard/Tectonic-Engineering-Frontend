import aboutIntroImage from "../assets/aboutIntro/aboutIntroImage.webp"
const stats = [
  { value: "2019", label: "Established" },
  { value: "India & Africa", label: "Projects Delivered" },
  { value: "351 ft", label: "Tallest Statue Engineered" },
  { value: "PSU & Govt.", label: "Trusted Clients" },
];

const highlights = [
  "Structural Design & Drafting",
  "Structural Peer Review & Audit",
  "Value Engineering & Cost Optimisation",
  "Structural Steel Detailing (Tekla)",
];

const IntroductionAbout = () => {
  return (
    <section className="bg-background py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <img
              src={aboutIntroImage}
              alt="Large steel and concrete structure under construction"
              className="w-full h-96 md:h-[480px] object-cover rounded-2xl shadow-lg"
            />

            {/* Accent frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-secondary rounded-2xl -z-10" />

            {/* Experience badge */}
            <div className="absolute -bottom-6 left-6 bg-primary text-white rounded-xl px-6 py-4 shadow-lg">
              <p className="text-3xl font-bold text-secondary leading-none">
                2019
              </p>
              <p className="text-sm mt-1">Engineering since</p>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
              About Our Company
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-heading leading-tight mb-5">
              We are defined by the problems we solve and the value we create
            </h2>

            <p className="text-body leading-7 mb-4">
              <span className="font-semibold text-primary">
                Tectonic Engineering Solution LLP
              </span>{" "}
              is a premier structural engineering consultancy based in Rajendra
              Place, New Delhi. Formally established in 2025 as the evolution
              of Tectonic Engineering, a proprietary firm operating since 2019,
              we are committed to scaled operations and long-term client
              partnerships.
            </p>

            <p className="text-muted leading-7 mb-6">
              We design new buildings and industrial structures, and evaluate,
              renovate and repair existing ones, serving Public Works
              Departments, Development Authorities and Public Sector
              Undertakings across India.
            </p>
           
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-body">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-white text-xs">
                    ✓
                  </span>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                window.location.href = "/about";
              }}
              className="bg-primary hover:bg-footer text-white px-7 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More →
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface border border-border rounded-2xl p-6 shadow-sm">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-2 py-3">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroductionAbout;