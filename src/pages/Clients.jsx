import { useState } from "react";
import Title from "../components/Title";

// Logos live in public/logos/ (extract client-logos.zip there).
// A client without a logo, or whose file is missing, shows its short name instead.
const logo = (name) => `/logos/${name}.png`;

const MAX_WORK = 4;

const clientGroups = [
  {
    id: "government",
    heading: "Government & public sector",
    clients: [
      {
        id: "iocl",
        short: "IOCL",
        name: "Indian Oil Corporation Limited",
        logo: logo("iocl"),
        work: [
          "Elevated pipe and cable rack, 35 m span trestle and drain crossing for a refinery plant",
        ],
      },
      {
        id: "dmrc",
        short: "DMRC",
        name: "Delhi Metro Rail Corporation Limited",
        logo: logo("dmrc"),
        work: [],
      },
      {
        id: "bhel",
        short: "BHEL",
        name: "Bharat Heavy Electricals Limited",
        logo: logo("bhel"),
        work: [
          "Pipe and cable rack",
          "Construction store at Kurja",
          "Thermal power substation",
          "PEB shed, 50 m × 120 m, at Jamalpur",
        ],
      },
      {
        id: "power-grid",
        short: "Power Grid",
        name: "Power Grid Corporation of India",
        logo: logo("power-grid"),
        work: [
          "PEB store building, 16 m × 41 m, at GIS-Jaipur substation",
          "PEB store building, 33 m × 13 m, at GIS-Koteshwar substation",
        ],
      },
      {
        id: "indian-railway",
        short: "Indian Railway",
        name: "Indian Railway",
        logo: logo("indian-railway"),
        work: ["Standard sick line shed, 55 m × 18 m (N.E. Railway)"],
      },
      {
        id: "rvnl",
        short: "RVNL",
        name: "Rail Vikas Nigam Limited",
        logo: logo("rvnl"),
        work: [
          "Foot over bridge at Ramnathpur Station, for the Bsb–Pryj doubling",
          "Road over bridge at LC No. 72, Patna Sahib – Gulzarbagh",
        ],
      },
      {
        id: "ircon",
        short: "IRCON",
        name: "IRCON International Limited",
        logo: logo("ircon"),
        work: [],
      },
    ],
  },
  {
    id: "private",
    heading: "Private sector",
    clients: [
      {
        id: "lt",
        short: "L&T",
        name: "Larsen & Toubro",
        logo: logo("lt"),
        work: [
          "Construction store, 29 m × 70 m",
          "Watch towers, 7.5 m high",
        ],
      },
      {
        id: "ecr-buildtech",
        short: "ECR Buildtech",
        name: "ECR Buildtech Pvt. Ltd.",
        logo: logo("ecr-buildtech"),
        work: [],
      },
      {
        id: "radtech",
        short: "Radtech Buildcon",
        name: "Radtech Buildcon Pvt. Ltd.",
        work: ["Office building, RCC structure, 36,000 sq ft (2B+G+6+T)"],
      },
      {
        id: "ram-sutar",
        short: "Ram Sutar Fine Art",
        name: "Ram Sutar Fine Art Pvt. Ltd.",
        scope: "Structural connection design and fabrication detail drawings",
        work: [
          "351 ft Dr. Babasaheb Ambedkar statue, Mumbai (ongoing)",
          "125 ft Lachit Borphukan statue, Jorhat",
          "91 ft Chhatrapati Shivaji Maharaj statue, Malvan",
          "77 ft and 51 ft Lord Ram statues, Goa and Bareilly",
        ],
      },
      {
        id: "wave-infratech",
        short: "Wave Infratech",
        name: "Wave Infratech",
        work: [
          "7.5 MLD STP-SBR basin and water tanks",
          "Eligo Experience Centre",
          "Bar bending yard in a PEB shed",
          "Culvert, ESS and 36 m DG flue stack",
          "Club building, community center and swimming pool",
          "Hoarding and signage",
        ],
      },
    ],
  },
  {
    id: "international",
    heading: "International",
    clients: [
      {
        id: "nosi",
        short: "NOSI",
        name: "NOSI, Cape Verde",
        logo: logo("nosi"),
        work: [
          "Technological Park: 5 composite buildings of unique shape",
        ],
      },
    ],
  },
];

const totalClients = clientGroups.reduce(
  (sum, group) => sum + group.clients.length,
  0
);

const ClientCard = ({ short, name, logo: logoSrc, work, scope }) => {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = logoSrc && !logoFailed;
  const shown = work.slice(0, MAX_WORK);
  const extra = work.length - shown.length;

  return (
    <article className="flex flex-col border border-border bg-surface p-6">
      <div className="flex h-16 items-center">
        {showLogo ? (
          <img
            src={logoSrc}
            alt={`${short} logo`}
            loading="lazy"
            onError={() => setLogoFailed(true)}
            className="max-h-14 w-auto max-w-full object-contain"
          />
        ) : (
          <span className="text-2xl font-bold text-heading">{short}</span>
        )}
      </div>

      <h4 className="mt-4 font-semibold text-heading">{name}</h4>

      {work.length > 0 && (
        <div className="mt-4 border-t border-border pt-4">
          <p className="text-sm font-semibold text-heading">Our work</p>
          {scope && <p className="mt-1 text-xs text-muted">{scope}</p>}

          <ul className="mt-3 space-y-2 text-sm text-body">
            {shown.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {extra > 0 && (
            <p className="mt-3 text-xs text-muted">+ {extra} more</p>
          )}
        </div>
      )}
    </article>
  );
};

const Clients = () => {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Title
          title="OUR ESTEEMED CLIENTS"
          subtitle={`${totalClients} clients across government and private sectors`}
        />

        <div className="mt-12 space-y-14">
          {clientGroups.map(({ id, heading, clients }) => (
            <div key={id}>
              <h3 className="text-xl font-semibold text-heading">
                {heading}{" "}
                <span className="font-normal text-muted">({clients.length})</span>
              </h3>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {clients.map((client) => (
                  <ClientCard key={client.id} {...client} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;