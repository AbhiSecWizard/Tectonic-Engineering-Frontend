// `projectIds` point at ids in projectsData.js, so project details live in one place.
// To show a project under a sector, add its id to that sector's `projectIds`.

// Sectors listed in the company profile ("Structural Design & Drafting for a wide range of sectors")
export const pdfSectors = [
  {
    id: "high-rise-residential",
    name: "High-Rise Residential Buildings",
    description:
      "Structural design and drafting for residential buildings. Our Managing Partner also brings experience with high-rise towers.",
    projectIds: ["platinum-greens", "narmada-nirvana"],
  },
  {
    id: "industrial-sheds",
    name: "Industrial Sheds",
    description:
      "Sheds and store buildings for power, railway and construction clients.",
    facts: ["Largest shed: 50 m × 120 m"],
    projectIds: [
      "bhel-jamalpur",
      "ne-railway-shed",
      "lnt-store",
      "pgcil-stores",
      "bar-bending-yard",
    ],
  },
  {
    id: "peb-structures",
    name: "PEB Structures",
    description:
      "Pre-engineered building structures for government, power and industrial clients, including multi-storey PEB buildings.",
    facts: ["Multi-storey PEB: G+2+T"],
    projectIds: [
      "bhel-jamalpur",
      "pgcil-stores",
      "assam-police-hq",
      "assam-car-parking",
      "bar-bending-yard",
    ],
  },
  {
    id: "hospitals-medical",
    name: "Hospitals & Medical Facilities",
    description: "Structural design for hospitals and medical facilities.",
    projectIds: [],
  },
  {
    id: "railway-structures",
    name: "Railway Structures",
    description:
      "Sheds and bridges for Indian Railway clients, including N.E. Railway and RVNL.",
    projectIds: ["ne-railway-shed", "ramnathpur-fob", "lc-72-rob"],
  },
  {
    id: "sports-facilities",
    name: "Sports Facilities",
    description: "Structural design for sports facilities.",
    projectIds: [],
  },
  {
    id: "statues",
    name: "Gigantic Concrete & Steel Statues",
    description:
      "Structural connection design and fabrication detail drawings for landmark statues, for Ram Sutar Fine Art Pvt. Ltd.",
    facts: ["51 ft to 351 ft tall"],
    projectIds: [
      "ambedkar-statue",
      "lachit-statue",
      "shivaji-statue",
      "ram-goa-statue",
      "ram-bareilly-statue",
    ],
  },
  {
    id: "retention-structures",
    name: "Earth / Liquid Retention Structures",
    description:
      "Structures that hold earth or liquid, such as underground and overhead water tanks and STP basins.",
    projectIds: ["stp-tanks"],
  },
  {
    id: "sewage-treatment",
    name: "Sewage Treatment Plants",
    description:
      "Structural design for sewage treatment plants, including an STP-SBR basin.",
    facts: ["7.5 MLD capacity"],
    projectIds: ["stp-tanks"],
  },
  {
    id: "hoarding",
    name: "Hoarding Design",
    description: "Structural design of hoardings, signage and unipole structures.",
    facts: ["8 m × 6 m", "36 m tall"],
    projectIds: ["hoarding"],
  },
  {
    id: "machine-foundations",
    name: "Machine Foundations",
    description: "Structural design of foundations for machinery.",
    projectIds: [],
  },
];

// Further areas that appear in the project list of the company profile
export const alsoDelivered = [
  {
    id: "oil-gas",
    name: "Oil & Gas Refinery Plants",
    description:
      "Elevated pipe and cable racks, trestles and drain crossings for IOCL.",
    projectIds: ["iocl-rack"],
  },
  {
    id: "power",
    name: "Power & Substations",
    description:
      "Thermal power and grid substation works for BHEL, THDCIL and Power Grid.",
    projectIds: ["bhel-kurja", "khurja-power", "pgcil-stores"],
  },
  {
    id: "commercial",
    name: "Commercial Buildings",
    description:
      "Offices, public buildings and a technology park, in India and Cape Verde.",
    projectIds: [
      "technological-park",
      "assam-police-hq",
      "assam-car-parking",
      "radtech-office",
      "eligo-centre",
    ],
  },
  {
    id: "bridges",
    name: "Bridges & Culverts",
    description:
      "Foot and road over bridges for RVNL, and a culvert for Wave Infratech.",
    projectIds: ["ramnathpur-fob", "lc-72-rob", "culvert-flue-stack"],
  },
];