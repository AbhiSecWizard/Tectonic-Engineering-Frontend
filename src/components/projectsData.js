const img = (name) => `/projects/${name}.jpg`;

console.log(img)
const STATUE_CLIENT = "Ram Sutar Fine Art Pvt. Ltd.";
const STATUE_SCOPE = [
  "Structural connection design",
  "Fabrication detail drawings",
];

export const categories = [
  "All",
  "Statues",
  "Industrial & Energy",
  "Railway",
  "Commercial",
  "Residential",
  "Infrastructure",
];

export const projects = [
  // ---- Statues ----
  {
    id: "ambedkar-statue",
    title: "Dr. Babasaheb Ambedkar Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Mumbai, Maharashtra",
    detail: "A 351 ft concrete and steel statue, currently an ongoing project.",
    specs: [{ label: "Height", value: "351 ft" }],
    scope: STATUE_SCOPE,
    status: "Ongoing",
    image: img("ambedkar-statue"),
  },
  {
    id: "lachit-statue",
    title: "Lachit Borphukan Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Jorhat, Assam",
    detail: "A 125 ft concrete and steel statue.",
    specs: [{ label: "Height", value: "125 ft" }],
    scope: STATUE_SCOPE,
    image: img("lachit-statue"),
  },
  {
    id: "shivaji-statue",
    title: "Chhatrapati Shivaji Maharaj Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Malvan, Maharashtra",
    detail: "A 91 ft concrete and steel statue.",
    specs: [{ label: "Height", value: "91 ft" }],
    scope: STATUE_SCOPE,
    image: img("shivaji-statue"),
  },
  {
    id: "ram-goa-statue",
    title: "Lord Ram Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Goa",
    detail: "A 77 ft concrete and steel statue.",
    specs: [{ label: "Height", value: "77 ft" }],
    scope: STATUE_SCOPE,
    image: img("ram-goa-statue"),
  },
  {
    id: "ram-bareilly-statue",
    title: "Lord Ram Statue",
    category: "Statues",
    client: STATUE_CLIENT,
    location: "Bareilly, Uttar Pradesh",
    detail: "A 51 ft concrete and steel statue.",
    specs: [{ label: "Height", value: "51 ft" }],
    scope: STATUE_SCOPE,
    image: img("ram-bareilly-statue"),
  },

  // ---- Commercial (international) ----
  {
    id: "technological-park",
    title: "Technological Park",
    category: "Commercial",
    client: "NOSI",
    location: "Cape Verde, Africa",
    detail:
      "Five composite building structures of unique shape, housing a data centre, incubation centre, business centre and more.",
    specs: [{ label: "Buildings", value: "5 composite" }],
    image: img("cape-verde-1"),
  },

  // ---- Industrial & Energy ----
  {
    id: "iocl-rack",
    title: "Refinery Pipe & Cable Rack",
    category: "Industrial & Energy",
    client: "IOCL",
    detail:
      "Elevated pipe and cable rack, a trestle and a drain crossing for an oil and gas refinery plant.",
    specs: [{ label: "Trestle span", value: "35 m" }],
  },
  {
    id: "bhel-jamalpur",
    title: "PEB Shed at Jamalpur",
    category: "Industrial & Energy",
    client: "BHEL",
    location: "Jamalpur",
    detail: "Pre-engineered building (PEB) shed.",
    specs: [
      { label: "Size", value: "50 m × 120 m" },
      { label: "Span", value: "25 m" },
    ],
  },
  {
    id: "bhel-kurja",
    title: "Pipe Rack, Store & Substation",
    category: "Industrial & Energy",
    client: "BHEL",
    location: "Kurja",
    detail:
      "Pipe and cable rack, a construction store at Kurja and a thermal power substation.",
  },
  {
    id: "khurja-power",
    title: "Khurja Super Thermal Power Project",
    category: "Industrial & Energy",
    client: "THDCIL",
    location: "Khurja",
    detail: "CWPH and RWPH units at the Khurja Super Thermal Power Project.",
    scope: STATUE_SCOPE,
  },
  {
    id: "pgcil-stores",
    title: "GIS Substation Store Buildings",
    category: "Industrial & Energy",
    client: "Power Grid Corporation of India Ltd.",
    detail: "PEB store buildings at the GIS-Jaipur and GIS-Koteshwar substations.",
    specs: [
      { label: "Jaipur store", value: "16 m × 41 m" },
      { label: "Koteshwar store", value: "33 m × 13 m" },
    ],
  },
  {
    id: "lnt-store",
    title: "Construction Store & Watch Towers",
    category: "Industrial & Energy",
    client: "L&T",
    detail: "A construction store and watch towers.",
    specs: [
      { label: "Store", value: "29 m × 70 m" },
      { label: "Watch towers", value: "7.5 m high" },
    ],
  },
  {
    id: "bar-bending-yard",
    title: "Bar Bending Yard",
    category: "Industrial & Energy",
    client: "Wave Infratech",
    detail: "A state-of-the-art bar bending yard in a PEB shed.",
  },

  // ---- Railway ----
  {
    id: "ne-railway-shed",
    title: "Sick Line Shed",
    category: "Railway",
    client: "N.E. Railway",
    detail: "A standard sick line shed.",
    specs: [{ label: "Size", value: "55 m × 18 m" }],
  },
  {
    id: "ramnathpur-fob",
    title: "Foot Over Bridge, Ramnathpur",
    category: "Railway",
    client: "RVNL",
    location: "Ramnathpur Station",
    detail: "A foot over bridge (FOB) in connection with the Bsb–Pryj doubling.",
  },
  {
    id: "lc-72-rob",
    title: "ROB at LC No. 72",
    category: "Railway",
    client: "RVNL",
    location: "Patna Sahib – Gulzarbagh",
    detail: "A road over bridge (ROB) for two-wheeler traffic.",
  },

  // ---- Commercial ----
  {
    id: "assam-police-hq",
    title: "Assam Police Headquarters",
    category: "Commercial",
    client: "Assam PWD",
    detail: "PEB structure.",
    specs: [{ label: "Floors", value: "G+2+T" }],
  },
  {
    id: "assam-car-parking",
    title: "Multilevel Car Parking",
    category: "Commercial",
    client: "Assam PWD",
    detail: "PEB structure.",
    specs: [{ label: "Floors", value: "G+2+T" }],
  },
  {
    id: "radtech-office",
    title: "Office Building",
    category: "Commercial",
    client: "Radtech Buildcon Pvt. Ltd.",
    detail: "An office building with an RCC structure.",
    specs: [
      { label: "Area", value: "36,000 sq ft" },
      { label: "Floors", value: "2B+G+6+T" },
    ],
  },
  {
    id: "eligo-centre",
    title: "Eligo Experience Centre",
    category: "Commercial",
    client: "Wave Infratech",
    detail: "An experience centre building.",
  },

  // ---- Residential ----
  {
    id: "narmada-nirvana",
    title: "Narmada Nirvana Phase III",
    category: "Residential",
    client: "Melage Studio",
    location: "Indore, Madhya Pradesh",
    detail: "Villas.",
    image: img("narmada-nirvana"),
  },
  {
    id: "platinum-greens",
    title: "Platinum Greens",
    category: "Residential",
    client: "Melage Studio",
    location: "Patna, Bihar",
    detail: "High-end luxury apartments.",
    image: img("platinum-greens"),
  },

  // ---- Infrastructure ----
  {
    id: "stp-tanks",
    title: "STP & Water Tanks",
    category: "Infrastructure",
    client: "Wave Infratech",
    detail: "An STP-SBR basin with underground and overhead water tanks.",
    specs: [{ label: "Capacity", value: "7.5 MLD" }],
    image: img("stp-tanks"),
  },
  {
    id: "culvert-flue-stack",
    title: "Culvert, ESS & DG Flue Stack",
    category: "Infrastructure",
    client: "Wave Infratech",
    detail: "A culvert, an ESS and a DG flue stack.",
    specs: [{ label: "Flue stack", value: "36 m" }],
    image: img("culvert"),
  },
  {
    id: "club-community",
    title: "Club, Community Center & Pool",
    category: "Infrastructure",
    client: "Wave Infratech",
    detail: "A club building, community center and swimming pool.",
  },
  {
    id: "hoarding",
    title: "Hoarding & Signage",
    category: "Infrastructure",
    client: "Wave Infratech",
    detail: "A tall hoarding, plus signage and unipole structures.",
    specs: [
      { label: "Size", value: "8 m × 6 m" },
      { label: "Height", value: "36 m" },
    ],
    image: img("hoarding"),
  },
];

// "Project at a Glance": Technological Park, Cape Verde
export const capeVerdeGallery = [
  { src: img("cape-verde-1"), alt: "White-clad building with an angled base" },
  { src: img("cape-verde-2"), alt: "Curved building overhanging its concrete base" },
  { src: img("cape-verde-3"), alt: "Tower cranes beside the circular building" },
  { src: img("cape-verde-4"), alt: "Concrete structure under construction with a crane" },
  { src: img("cape-verde-5"), alt: "Multi-storey white building with scaffolding" },
  { src: img("cape-verde-6"), alt: "Large sloping building with steel bracing" },
  { src: img("cape-verde-7"), alt: "Curved facade with glazing and a crane beyond" },
  { src: img("cape-verde-8"), alt: "Steel frame under the sloping roof" },
  { src: img("cape-verde-9"), alt: "Long white building seen across the site" },
];