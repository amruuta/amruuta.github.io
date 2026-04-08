import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface SiteHeaderProps {
  name: string;
  items: NavItem[];
  resumeUrl: string;
}

const SiteHeader = ({ name, items, resumeUrl }: SiteHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isResumeExternal = /^https?:\/\//i.test(resumeUrl);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="top-nav" aria-label="Main">
        <a href="#home" className="brand" onClick={closeMenu}>
          {name}
        </a>

        <ul className="desktop-nav" role="list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                className={`nav-link ${item.id === "about" ? "nav-link--active" : ""}`.trim()}
                href={`#${item.id}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          className="header-resume"
          href={resumeUrl}
          target={isResumeExternal ? "_blank" : undefined}
          rel={isResumeExternal ? "noreferrer" : undefined}
          onClick={closeMenu}
        >
          Resume
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </nav>

      <ul
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}
        role="list"
      >
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={closeMenu}>
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a
            className="mobile-resume"
            href={resumeUrl}
            target={isResumeExternal ? "_blank" : undefined}
            rel={isResumeExternal ? "noreferrer" : undefined}
            onClick={closeMenu}
          >
            Resume
          </a>
        </li>
      </ul>
    </header>
  );
};

export default SiteHeader;
