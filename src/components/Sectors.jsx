import {
  FaAd,
  FaBolt,
  FaBuilding,
  FaCogs,
  FaCubes,
  FaFutbol,
  FaHospital,
  FaMonument,
  FaOilCan,
  FaRecycle,
  FaRegBuilding,
  FaRoad,
  FaTint,
  FaTrain,
  FaWarehouse,
} from "react-icons/fa";
import Title from "./Title";
import { projects } from "./projectsData";
import { alsoDelivered, pdfSectors } from "../assets/sectorsData";

const sectorIcons = {
  "high-rise-residential": FaBuilding,
  "industrial-sheds": FaWarehouse,
  "peb-structures": FaCubes,
  "hospitals-medical": FaHospital,
  "railway-structures": FaTrain,
  "sports-facilities": FaFutbol,
  statues: FaMonument,
  "retention-structures": FaTint,
  "sewage-treatment": FaRecycle,
  hoarding: FaAd,
  "machine-foundations": FaCogs,
  "oil-gas": FaOilCan,
  power: FaBolt,
  commercial: FaRegBuilding,
  bridges: FaRoad,
};

// Section and card colors for the two background styles
const tones = {
  background: { section: "bg-background", card: "bg-surface" },
  surface: { section: "bg-surface", card: "bg-background" },
};

const projectById = Object.fromEntries(
  projects.map((project) => [project.id, project])
);

// Replace project ids with the full project details
const withExamples = (sector) => ({
  ...sector,
  examples: sector.projectIds
    .map((projectId) => projectById[projectId])
    .filter(Boolean),
});

const SectorCard = ({ sector, cardClass }) => {
  const { id, name, description, facts = [], examples } = sector;
  const Icon = sectorIcons[id] ?? FaBuilding;
  const count = examples.length;

  return (
    <article className={`flex flex-col border border-border p-6 ${cardClass}`}>
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-primary text-primary">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <p className="pt-1 text-sm font-medium text-primary">
          {count > 0
            ? `${count} ${count === 1 ? "project" : "projects"}`
            : "In our design scope"}
        </p>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-heading">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-body">{description}</p>

      {facts.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {facts.map((fact) => (
            <li
              key={fact}
              className="border border-border px-2.5 py-1 text-xs font-medium text-heading"
            >
              {fact}
            </li>
          ))}
        </ul>
      )}

      {count > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-sm font-semibold text-heading">Projects delivered</p>
          <ul className="mt-3 space-y-2">
            {examples.map((project) => (
              <li key={project.id} className="text-sm">
                <span className="text-body">{project.title}</span>
                <span className="block text-xs text-muted">
                  {project.location ?? project.client}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

const Sectors = ({ tone = "background" }) => {
  const { section, card } = tones[tone] ?? tones.background;

  return (
    <section className={`${section} py-16`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Title
          title="SECTORS WE DESIGN FOR"
          subtitle="Structural design and detailing for a wide range of sectors, from landmark statues to industrial plants"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pdfSectors.map((sector) => (
            <SectorCard
              key={sector.id}
              sector={withExamples(sector)}
              cardClass={card}
            />
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-heading">
            More sectors from our project list
          </h3>
          <p className="mt-2 max-w-2xl text-body">
            Beyond the sectors above, our portfolio also covers these areas.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {alsoDelivered.map((sector) => (
              <SectorCard
                key={sector.id}
                sector={withExamples(sector)}
                cardClass={card}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sectors;