import Title from "./Title";

// Add a `photo` path (e.g. "/team/subhankar.jpg") to any person to show a photo instead of initials.
const leaders = [
  {
    name: "Er. Subhankar Petal",
    role: "Managing Partner & Head – Structure Design",
    points: [
      "Chartered Engineer (IEI)",
      "M.Tech (Structural Engineering)",
      "A decade of experience in design, detailing and coordination of steel and RCC structures: industrial buildings and sheds, railway structures, large statues, residential and commercial buildings, and high-rise towers.",
    ],
  },
];

const members = [
  { name: "Nishant Goel", role: "Sr. Engineer (Team Leader)" },
  { name: "Sekhar Bhowmik", role: "Engineer" },
  { name: "Joby Paul", role: "Sr. Detailer" },
];

const getInitials = (name) =>
  name
    .replace(/^Er\.?\s+/i, "")
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

const Avatar = ({ name, photo, className }) =>
  photo ? (
    <img src={photo} alt={name} className={`${className} object-cover`} />
  ) : (
    <span
      aria-hidden="true"
      className={`${className} flex items-center justify-center bg-primary font-semibold text-surface`}
    >
      {getInitials(name)}
    </span>
  );

const TeamSection = () => {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Title
          title="OUR TEAM"
          subtitle="The engineers and detailers behind our structural design and steel detailing work"
        />

        <div className="mx-auto mt-12 max-w-5xl">
          {/* One leader = full-width card. Add a second leader and it becomes 2 columns. */}
          <div
            className={`grid gap-6 ${leaders.length > 1 ? "lg:grid-cols-2" : ""}`}
          >
            {leaders.map(({ name, role, photo, points }) => (
              <article
                key={name}
                className="flex flex-col gap-6 border border-border bg-background p-6 sm:flex-row sm:p-8"
              >
                <Avatar
                  name={name}
                  photo={photo}
                  className="size-24 shrink-0 rounded-full text-2xl"
                />
                <div>
                  <h3 className="text-xl font-semibold text-heading">
                    {name}
                  </h3>
                  <p className="mt-1 font-medium text-primary">{role}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-body">
                    {points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {members.map(({ name, role, photo }) => (
              <article
                key={name}
                className="flex flex-col items-center border border-border bg-background p-6 text-center"
              >
                <Avatar
                  name={name}
                  photo={photo}
                  className="size-20 rounded-full text-xl"
                />
                <h3 className="mt-4 text-lg font-semibold text-heading">
                  {name}
                </h3>
                <p className="mt-1 text-sm text-muted">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;