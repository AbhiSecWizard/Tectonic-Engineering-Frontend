
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";


const links = [
  { name: "Home", path: "/" },

  {
    name: "About Us",
    path: "/about-us",
    children: [
      { name: "Introduction", path: "/about-us/introduction" },
      { name: "Our Team", path: "/about-us/team" },
    ],
  },

  {
    name: "Services",
    path: "/services",
    children: [
      { name: "Steel Detailing", path: "/services/steel-detailing" },
      { name: "Rebar Detailing", path: "/services/rebar-detailing" },
      { name: "Structural Design", path: "/services/structural-design" },
      { name: "Structural Drafting", path: "/services/structural-drafting" },
      { name: "Value Engineering", path: "/services/value-engineering" },
      { name: "Cost Optimization", path: "/services/cost-optimization" },
    ],
  },

  { name: "Projects", path: "/projects" },
  { name: "Sectors", path: "/sectors" },
  { name: "Career", path: "/career" },
  { name: "Clients", path: "/clients" },
  { name: "Blog", path: "/blog" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact Us", path: "/contact-us" },
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook", url: "#" },
  { icon: FaTwitter, label: "Twitter", url: "#" },
  { icon: FaInstagram, label: "Instagram", url: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", url: "#" },
];


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full">
      {/* Top Contact Bar */}
      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-8">
          <a
            href="mailto:xyz@gmail.com"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <FaEnvelope className="shrink-0" />
            <span>xyz@gmail.com</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map(({ icon: Icon, label, url }) => (
              <a
                key={label}
                href={url}
                aria-label={label}
                className="transition-colors hover:text-accent"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="relative bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
          {/* Logo */}
         <NavLink
  to="/"
  onClick={closeMenu}
  className="shrink-0 flex items-center"
>
  <img
    src="/logo.png"
    alt="Tectonic Engineering"
    className="h-auto w-32 object-contain sm:w-40 md:w-48 lg:w-52"
  />
</NavLink>
          {/* Desktop Links */}
         <div className="hidden items-center lg:flex">
  {links.map((link) =>
    link.children ? (
      <DropdownMenu
        key={link.path}
        label={link.name}
        path={link.path}
        children={link.children}
        mode="desktop"
      />
    ) : (
      <NavLink
        key={link.path}
        to={link.path}
        end={link.path === "/"}
        className={({ isActive }) =>
          `border-b-4 px-2 py-6 text-sm font-semibold uppercase xl:px-3 ${
            isActive
              ? "border-primary text-primary"
              : "border-transparent text-slate-800 hover:border-primary hover:text-primary"
          }`
        }
      >
        {link.name}
      </NavLink>
    )
  )}
</div>
          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-11 items-center justify-center rounded border border-primary text-primary transition-colors hover:bg-primary hover:text-white lg:hidden"
          >  
        {menuOpen ? <FaTimes size={21} /> : <FaBars size={21} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
  
{/* Mobile Dropdown */}
{menuOpen && (
  <div className="absolute left-0 top-full z-50 w-full border-t border-slate-200 bg-white shadow-lg lg:hidden">
    <div className="flex flex-col px-5 py-2">
      {links.map((link) =>
        link.children ? (
          <DropdownMenu
            key={link.path}
            label={link.name}
            path={link.path}
            children={link.children}
            mode="mobile"
            onNavigate={closeMenu}
          />
        ) : (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            onClick={closeMenu}
            className={({ isActive }) =>
              `border-b border-slate-100 px-3 py-3 text-sm font-medium last:border-b-0 ${
                isActive
                  ? "border-l-4 border-l-primary bg-slate-50 text-primary"
                  : "text-slate-700 hover:bg-slate-50 hover:text-primary"
              }`
            }
          >
            {link.name}
          </NavLink>
        )
      )}
    </div>
  </div>
)}

      </nav>
    </header>
  );
};

export default Navbar;
