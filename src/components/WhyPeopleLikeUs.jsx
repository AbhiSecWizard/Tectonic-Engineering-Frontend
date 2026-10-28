import {
  FaBuilding,
  FaClipboardCheck,
  FaWrench,
  FaPencilRuler,
} from "react-icons/fa";
import Title from "./Title";

const services = [
  {
    id: "design-drafting",
    title: "Structural Design & Drafting",
    icon: FaBuilding,
    description:
      "We design new buildings, industrial structures, PEB sheds, hospitals and railway structures using STAAD Pro, ETABS and SAFE, strictly within Indian Standards.",
    href: "#",
  },
  {
    id: "peer-review",
    title: "Peer Review & Value Engineering",
    icon: FaClipboardCheck,
    description:
      "Independent proof checking and cost-effective alternatives that reduce project cost without compromising quality.",
    href: "#",
  },
  {
    id: "audit-repair",
    title: "Structural Audit & Repair",
    icon: FaWrench,
    description:
      "Strength assessment and rehabilitation of distressed buildings, with repair and retrofitting of existing structures.",
    href: "#",
  },
  {
    id: "steel-detailing",
    title: "Structural Steel Detailing",
    icon: FaPencilRuler,
    description:
      "Fabrication drawings with CAM data, general arrangement drawings and connection design using Tekla Structures and IDEA StatiCa.",
    href: "#",
  },
];

const WhyPeopleLikeUs = () => {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Title
          title="WHY PEOPLE LIKE US?"
          subtitle="Tectonic Engineering has been a trusted name in structural design and detailing since its inception in 2019"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ id, title, description, href, icon: Icon }) => (
            <article
              key={id}
              className="group flex flex-col items-center bg-surface px-6 py-10 text-center"
            >
              <span className="flex size-15 items-center justify-center rounded-full border border-primary text-primary transition-colors group-hover:bg-primary group-hover:text-surface">
                <Icon className="size-6" aria-hidden="true" />
              </span>

              <h3 className="mt-6 text-lg font-semibold text-heading">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {description}
              </p>

              <a
                href={href}
                className="mt-auto pt-5 text-sm font-medium text-primary hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
              >
                Read More
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPeopleLikeUs;