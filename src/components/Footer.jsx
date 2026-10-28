
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaClock,
} from "react-icons/fa";

const services = [
  "Structural Design & Drafting",
  "Peer Review & Value Engineering",
  "Structural Audit & Repair",
  "Structural Steel Detailing",
];

const contacts = [
  {
    icon: FaMapMarkerAlt,
    label: "1006, Hemkunt Tower-6, Rajendra Place, New Delhi - 110008",
  },
  {
    icon: FaPhoneAlt,
    label: "+91 8800683542",
    href: "tel:+918800683542",
  },
  {
    icon: FaEnvelope,
    label: "tectoniceng@outlook.com",
    href: "mailto:tectoniceng@outlook.com",
  },
  {
    icon: FaGlobe,
    label: "www.tectonicengineering.com",
    href: "https://www.tectonicengineering.com",
  },
];

const businessHours = [
  { days: "Monday – Friday", time: "9:30 AM – 6:30 PM" },
  { days: "Saturday", time: "Closed" },
  { days: "Sunday", time: "Closed" },
];

const Footer = () => {
  return (
    <footer className="bg-footer text-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* About Us */}
          <div>
            <h2 className="text-xl font-semibold">
              Tectonic Engineering
            </h2>

            <p className="mt-2 text-sm text-surface/70">
              Structure Design &amp; Detailing Company
            </p>

            <p className="mt-4 text-sm leading-7 text-surface/80">
              A structural engineering consultancy based in
              Rajendra Place, New Delhi, serving clients across
              India and Africa.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary">
              Our Services
            </h3>

            <ul className="space-y-3 text-sm text-surface/80">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="/services"
                    className="transition-colors duration-200 hover:text-secondary"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 font-semibold text-secondary">
              Contact Info
            </h3>

            <ul className="space-y-4 text-sm text-surface/80">
              {contacts.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon
                    className="mt-1 size-4 shrink-0 text-secondary"
                    aria-hidden="true"
                  />

                  {href ? (
                    <a
                      href={href}
                      target={
                        href.startsWith("https://") ? "_blank" : undefined
                      }
                      rel={
                        href.startsWith("https://")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="break-words transition-colors hover:text-secondary"
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-secondary">
              <FaClock aria-hidden="true" />
              Business Hours
            </h3>

            <ul className="text-sm text-surface/80">
              {businessHours.map(({ days, time }) => (
                <li
                  key={days}
                  className="flex flex-col gap-1 border-b border-dashed border-surface/20 py-3 first:pt-0 sm:flex-row sm:justify-between sm:gap-3"
                >
                  <span>{days}</span>

                  <span
                    className={
                      time === "Closed"
                        ? "text-surface/50"
                        : "whitespace-nowrap"
                    }
                  >
                    {time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-surface/15 pt-6 text-sm text-surface/70">
          <p>
            &copy; {new Date().getFullYear()} Tectonic Engineering
            Solution LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
