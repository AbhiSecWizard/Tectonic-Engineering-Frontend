import Title from "./Title";

// Add a `logo` path (e.g. "/logos/iocl.png") to any client to show its logo instead of text.
const clientGroups = [
  {
    heading: "Government & public sector",
    clients: [
      { short: "IOCL", name: "Indian Oil Corporation Limited" },
      { short: "DMRC", name: "Delhi Metro Rail Corporation Limited" },
      { short: "BHEL", name: "Bharat Heavy Electricals Limited" },
      { short: "Power Grid", name: "Power Grid Corporation of India" },
      { short: "Indian Railway" },
      { short: "RVNL", name: "Rail Vikas Nigam Limited" },
      { short: "IRCON", name: "IRCON International Limited" },
    ],
  },
  {
    heading: "Private sector",
    clients: [
      { short: "L&T", name: "Larsen & Toubro" },
      { short: "ECR Buildtech", name: "ECR Buildtech Pvt. Ltd." },
      { short: "Radtech Buildcon", name: "Radtech Buildcon Pvt. Ltd." },
      { short: "Ram Sutar Fine Art", name: "Ram Sutar Fine Art Pvt. Ltd." },
      { short: "Wave Infratech" },
    ],
  },
  {
    heading: "International",
    clients: [{ short: "NOSI", name: "Technological Park, Cape Verde" }],
  },
];

const ClientsSection = () => {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Title
          title="OUR ESTEEMED CLIENTS"
          subtitle="Trusted by organisations across government and private sectors"
        />

        <div className="mt-12 space-y-12">
          {clientGroups.map(({ heading, clients }) => (
            <div key={heading}>
              <h3 className="text-lg font-semibold text-heading">{heading}</h3>

              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {clients.map(({ short, name, logo }) => (
                  <li
                    key={short}
                    className="flex min-h-28 flex-col items-center justify-center border border-border bg-surface p-5 text-center"
                  >
                    {logo ? (
                      <img
                        src={logo}
                        alt={name || short}
                        className="h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-xl font-bold text-heading">
                        {short}
                      </span>
                    )}
                    {name && (
                      <span className="mt-1 text-sm text-muted">{name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;