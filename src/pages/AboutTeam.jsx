import React from "react";
import subhankerPatel from "../assets/teamImages/Subhankar_Petal.png"
const leaders = [
  {
    name: "Er. Subhankar Petal",
    role: "Managing Partner & Head – Structure Design",
    image: subhankerPatel,
    credentials: ["Chartered Engineer (IEI)", "M.Tech. (Structural Engineering)"],
    description:
      "A decade of experience in design, detailing and coordination of both steel and RCC structures, including industrial buildings and sheds, railway structures, large statues, residential and commercial buildings, and high-rise towers.",
  },
]

const teamMembers = [
  {
    name: "Nishant Goel",
    role: "Sr. Engineer (Team Leader)",
    image: "/images/team/nishant-goel.jpg",
  },
  {
    name: "Sekhar Bhowmik",
    role: "Engineer",
    image: "/images/team/sekhar-bhowmik.jpg",
  },
  {
    name: "Joby Paul",
    role: "Sr. Detailer",
    image: "/images/team/joby-paul.jpg",
  },
];

const AboutTeam = () => {
  return (
    <section className="bg-surface py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
            Meet Our Team
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">
            The Experts Behind Our Work
          </h2>

          <p className="text-muted max-w-2xl mx-auto leading-7">
            Our team brings together structural design expertise, steel
            detailing experience and close coordination with clients and site
            teams to deliver reliable engineering solutions.
          </p>
        </div>

        {/* Leadership */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="group bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="overflow-hidden bg-border">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-80 object-cover object-top group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-heading">
                  {leader.name}
                </h3>
                <p className="text-secondary font-medium mb-4">
                  {leader.role}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {leader.credentials.map((item) => (
                    <span
                      key={item}
                      className="bg-surface border border-border text-primary text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="text-body text-sm leading-6">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="overflow-hidden bg-border">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover object-top group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6 text-center border-t-4 border-secondary">
                <h3 className="text-lg font-bold text-heading mb-1">
                  {member.name}
                </h3>
                <p className="text-muted font-medium text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;