import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
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
  { icon: FaPhoneAlt, label: "+91 8800683542", href: "tel:+918800683542" },
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

const Footer = () => {
  return (
    <footer className="bg-footer text-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold">Tectonic Engineering</h2>
            <p className="mt-1 text-sm text-surface/70">
              Structure Design &amp; Detailing company
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-surface/80">
              A structural engineering consultancy based in Rajendra Place, New
              Delhi, serving clients across India and Africa.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-secondary">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-surface/80">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-secondary">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-surface/80">
              {contacts.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex gap-3">
                  <Icon
                    className="mt-0.5 size-4 shrink-0 text-secondary"
                    aria-hidden="true"
                  />
                  {href ? (
                    <a
                      href={href}
                      className="hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
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
        </div>

        <div className="mt-12 border-t border-surface/15 pt-6 text-sm text-surface/70">
          &copy; {new Date().getFullYear()} Tectonic Engineering Solution LLP.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;