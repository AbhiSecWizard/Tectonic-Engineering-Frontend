
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const DropdownMenu = ({
  label,
  path,
  children = [],
  mode = "desktop",
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Desktop dropdown: hover
  if (mode === "desktop") {
    return (
      <div className="group relative">
        <NavLink
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-2 border-b-4 px-3 py-6 text-sm font-semibold uppercase transition-colors ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-slate-800 hover:border-primary hover:text-primary"
            }`
          }
        >
          {label}
          <FaChevronDown
            size={10}
            className="transition-transform group-hover:rotate-180"
          />
        </NavLink>

        <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-2 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
          {children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) =>
                `block border-b border-slate-100 px-5 py-3 text-sm transition-colors last:border-b-0 ${
                  isActive
                    ? "bg-slate-50 text-primary"
                    : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                }`
              }
            >
              {child.name}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  // Mobile dropdown: click
  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-medium text-slate-700 hover:text-primary"
      >
        {label}

        <FaChevronDown
          size={12}
          className={`transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-l-2 border-primary bg-slate-50 py-1">
          {children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `block px-6 py-3 text-sm ${
                  isActive
                    ? "font-semibold text-primary"
                    : "text-slate-600 hover:text-primary"
                }`
              }
            >
              {child.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
