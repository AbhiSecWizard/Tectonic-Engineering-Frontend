import Title from "../components/Title";
const offerings = [
  {
    number: "01",
    title: "Structural Peer Review",
    text: "Independent proof checking of structural design and drawings prepared by others, with review of analysis models, assumptions and code compliance.",
  },
  {
    number: "02",
    title: "Value Engineering",
    text: "Cost-effective alternatives and innovative solutions without compromising quality.",
  },
  {
    number: "03",
    title: "Cost Optimisation",
    text: "Optimising structural systems to reduce material and construction cost while keeping the structure safe and functional.",
  },
];

const benefits = [
  "A second set of expert eyes before construction",
  "Lower material and construction cost",
  "Quality and safety are not reduced",
];

const PeerReviewValueEngineering = () => {
  return (
    <section id="peer-review-value-engineering" className="bg-surface py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Title
          title="Peer Review & Value Engineering"
          subtitle="An independent check, and smarter ways to build for less."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="mb-8 leading-8 text-body">
              We review structural designs through proof checking and suggest
              cost-effective alternatives and innovative solutions. Our cost
              optimisation work helps clients reduce material and construction
              cost without reducing the quality or safety of the structure.
            </p>

            <div className="space-y-4">
              {offerings.map((item) => (
                <div
                  key={item.number}
                  className="flex gap-4 rounded-xl border border-border bg-background p-5 transition hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-lg font-bold text-secondary">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="mb-1 font-bold text-heading">{item.title}</h3>
                    <p className="text-sm leading-6 text-muted">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image + benefits */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src="/images/services/peer-review.jpg"
                alt="Engineers reviewing structural drawings"
                className="h-80 w-full rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl border-2 border-secondary" />
            </div>

            <div className="mt-10 rounded-2xl bg-primary p-6 text-white">
              <h3 className="mb-4 text-lg font-bold text-secondary">Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeerReviewValueEngineering;