import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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

/*
  path  -> used for active-state matching (and as the React key)
  to    -> optional: where clicking the parent label goes (defaults to path)
  items -> optional: makes the entry a dropdown
*/
const NAV_LINKS = [
  { name: "Home", path: "/" },
  {
    name: "About Us",
    path: "/about",
    to: "/about/about-introduction",
    items: [
      { name: "Introduction", path: "/about/about-introduction" },
      { name: "Our Team", path: "/about/about-team" },
    ],
  },
  {
    name: "Services",
    items: [
      { name: "Structural Design & Drafting", path: "/service/structural-steel-detailing"  },
      { name: "Peer Review & Value Engineering", path:"/service/structural-designing-drafting"  },
      { name: "Structural Audit & Repair", path: "/service/structural-audit-repair" },
      { name: "Structural Steel Detailing", path: "/service/structural-steel-detailing" },
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

const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", url: "#" },
  { icon: FaTwitter, label: "Twitter", url: "#" },
  { icon: FaInstagram, label: "Instagram", url: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", url: "#" },
];

const EMAIL = "tectoniceng@outlook.com";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const { pathname } = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // Close on route change (link tap, browser back/forward)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on Escape, on outside tap, and when resized up to desktop
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => e.key === "Escape" && setMenuOpen(false);
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onResize = (e) => e.matches && setMenuOpen(false);

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    mq.addEventListener("change", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      mq.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    <header className="w-full">
      {/* Top contact bar */}
      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-8">
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-xs sm:text-sm">
            <FaEnvelope className="shrink-0" />
            <span>{EMAIL}</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, label, url }) => (
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

      {/* Main navbar */}
      <nav ref={navRef} className="relative bg-white shadow-sm" aria-label="Main navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
          {/* Logo */}
          <NavLink to="/" onClick={closeMenu} className="flex shrink-0 items-center">
            <img
              src="/logo.png"
              alt="Tectonic Engineering"
              className="h-auto w-32 object-contain sm:w-40 md:w-48 lg:w-52"
            />
          </NavLink>

          {/* Desktop links */}
          <div className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) =>
              link.items ? (
                <DropdownMenu
                  key={link.path}
                  label={link.name}
                  path={link.path}
                  to={link.to}
                  items={link.items}
                  mode="desktop"
                />
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `border-b-4 px-2 py-6 text-sm font-semibold uppercase transition-colors xl:px-3 ${
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

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-11 items-center justify-center rounded border border-primary text-primary transition-colors hover:bg-primary hover:text-white lg:hidden"
          >
            {menuOpen ? <FaTimes size={21} /> : <FaBars size={21} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="absolute left-0 top-full z-50 max-h-[80vh] w-full overflow-y-auto overscroll-contain border-t border-slate-200 bg-white shadow-lg lg:hidden"
          >
            <div className="flex flex-col px-5 py-2">
              {NAV_LINKS.map((link) =>
                link.items ? (
                  <DropdownMenu
                    key={link.path}
                    label={link.name}
                    path={link.path}
                    items={link.items}
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
                      `border-b border-slate-100 px-3 py-3 text-sm font-medium transition-colors ${
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