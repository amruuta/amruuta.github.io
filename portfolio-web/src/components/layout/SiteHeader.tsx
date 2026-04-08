import { useEffect, useMemo, useState } from "react";

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
  const [activeSectionId, setActiveSectionId] = useState("");
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const isResumeExternal = /^https?:\/\//i.test(resumeUrl);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (id: string) => {
    setActiveSectionId(id);
    closeMenu();
  };

  const handleBrandClick = () => {
    setActiveSectionId("");
    closeMenu();
  };

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) {
      return;
    }

    const validIds = new Set(sectionIds);
    const hashId = window.location.hash.replace("#", "");

    if (validIds.has(hashId)) {
      setActiveSectionId(hashId);
    } else if (hashId === "home" || hashId === "") {
      setActiveSectionId("");
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        const nextActive = visibleEntries[0].target.id;
        setActiveSectionId((current) => (current === nextActive ? current : nextActive));
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
      const nextHashId = window.location.hash.replace("#", "");
      if (validIds.has(nextHashId)) {
        setActiveSectionId(nextHashId);
      } else if (nextHashId === "home" || nextHashId === "") {
        setActiveSectionId("");
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [sectionIds]);

  return (
    <header className="site-header">
      <nav className="top-nav" aria-label="Main">
        <a href="#home" className="brand" onClick={handleBrandClick}>
          {name}
        </a>

        <ul className="desktop-nav" role="list">
          {items.map((item) => (
            <li key={item.id}>
              <a
                className={`nav-link ${item.id === activeSectionId ? "nav-link--active" : ""}`.trim()}
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
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
            <a
              className={item.id === activeSectionId ? "nav-link--active" : undefined}
              href={`#${item.id}`}
              onClick={() => handleNavClick(item.id)}
            >
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
