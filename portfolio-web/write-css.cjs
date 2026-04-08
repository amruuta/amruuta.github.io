const fs = require('fs');

const indexCss = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');

:root {
  --color-bg-1: #fdfbfb;
  --color-bg-2: #ebedee;
  --color-blob-1: #ffd1ff;
  --color-blob-2: #c1dfc4;
  --color-blob-3: #c2e59c;
  --color-blob-4: #e0c3fc;
  
  --color-text-main: #4a4e69;
  --color-text-muted: #8d99ae;
  --color-link: #ffb5a7;
  
  /* Glass and Clay Tokens */
  --glass-bg: rgba(255, 255, 255, 0.45);
  --glass-border: rgba(255, 255, 255, 0.6);
  --clay-shadow: 
    8px 8px 16px rgba(166, 180, 200, 0.25),
    -8px -8px 16px rgba(255, 255, 255, 0.9),
    inset 2px 2px 5px rgba(255, 255, 255, 0.8),
    inset -3px -3px 7px rgba(166, 180, 200, 0.15);
  --clay-shadow-hover: 
    10px 10px 20px rgba(166, 180, 200, 0.2),
    -10px -10px 20px rgba(255, 255, 255, 0.95),
    inset 4px 4px 8px rgba(255, 255, 255, 0.9),
    inset -4px -4px 8px rgba(166, 180, 200, 0.1);
  --clay-shadow-active: 
    inset 6px 6px 12px rgba(166, 180, 200, 0.25),
    inset -6px -6px 12px rgba(255, 255, 255, 0.9);

  --font-display: 'Quicksand', 'Segoe UI', sans-serif;
  --font-body: 'Outfit', 'Segoe UI', sans-serif;

  font-family: var(--font-body);
  color: var(--color-text-main);
  background-image: linear-gradient(135deg, var(--color-bg-1) 0%, var(--color-bg-2) 100%);
  background-attachment: fixed;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  min-height: 100%;
}

html {
  scroll-behavior: smooth;
}

body {
  background-image: linear-gradient(135deg, var(--color-bg-1) 0%, var(--color-bg-2) 100%);
  background-attachment: fixed;
  overflow-x: hidden;
}
`;

const appCss = `/* Liquid Background */
.app-shell {
  min-height: 100vh;
  position: relative;
  overflow-x: clip;
}

.app-shell::before,
.app-shell::after,
.app-shell .liquid-blob-1,
.app-shell .liquid-blob-2 {
  content: '';
  position: fixed;
  pointer-events: none;
  z-index: -1;
  filter: blur(60px);
  border-radius: 50%;
  animation: float 15s infinite ease-in-out alternate;
  opacity: 0.6;
}

.app-shell::before {
  width: 35rem;
  height: 35rem;
  top: -5%;
  left: -10%;
  background: var(--color-blob-1);
  animation-delay: -2s;
}

.app-shell::after {
  width: 30rem;
  height: 30rem;
  right: -5%;
  bottom: -5%;
  background: var(--color-blob-2);
  animation-duration: 18s;
}

.app-shell .liquid-blob-1 {
  width: 25rem;
  height: 25rem;
  top: 40%;
  left: 60%;
  background: var(--color-blob-3);
  animation-delay: -5s;
  animation-duration: 22s;
}

.app-shell .liquid-blob-2 {
  width: 20rem;
  height: 20rem;
  top: 60%;
  left: 10%;
  background: var(--color-blob-4);
  animation-delay: -8s;
  animation-duration: 19s;
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(30px, -50px) scale(1.1) rotate(15deg); }
  66% { transform: translate(-20px, 20px) scale(0.9) rotate(-5deg); }
  100% { transform: translate(40px, 40px) scale(1.05) rotate(10deg); }
}

.content-shell {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 1.25rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  position: relative;
  z-index: 1;
}

/* Header - Glassmorphism */
.site-header {
  position: sticky;
  top: 1rem;
  z-index: 120;
  border-radius: 999px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(166, 180, 200, 0.15);
  margin: 1rem;
  transition: all 0.3s ease;
}

.top-nav {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0.85rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  color: var(--color-text-main);
  text-decoration: none;
  font-weight: 700;
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}

.desktop-nav {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.desktop-nav a,
.mobile-nav a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
}

.desktop-nav a:hover,
.mobile-nav a:hover {
  color: var(--color-text-main);
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset 1px 1px 3px rgba(255, 255, 255, 0.8);
}

.menu-toggle {
  display: none;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--color-text-main);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: var(--clay-shadow);
  cursor: pointer;
}

.menu-toggle:active {
  box-shadow: var(--clay-shadow-active);
}

.mobile-nav {
  margin: 0;
  list-style: none;
  padding: 0 1.5rem 1.25rem;
  display: none;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.mobile-nav--open {
  display: grid;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding-top: 6rem;
  padding-bottom: 2rem;
  animation: fade-up 0.8s ease both;
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--clay-shadow);
  color: var(--color-text-main);
  padding: 0.5rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 1.5rem;
}

.hero-section h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  letter-spacing: -2px;
  line-height: 1.1;
  font-weight: 700;
  background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
}

.hero-role {
  margin: 1rem 0 0;
  color: var(--color-text-main);
  font-size: clamp(1.2rem, 2.5vw, 1.7rem);
  font-weight: 500;
}

.hero-summary {
  max-width: 720px;
  margin: 1.5rem auto 0;
  color: var(--color-text-muted);
  font-size: 1.1rem;
  line-height: 1.7;
}

.hero-actions {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

/* Claymorphism Buttons */
.btn-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  border-radius: 999px;
  padding: 0.75rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  background: #fdfbfb;
  color: var(--color-text-main);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: var(--clay-shadow);
  transition: all 0.25s ease;
  cursor: pointer;
}

.btn-pill:hover {
  box-shadow: var(--clay-shadow-hover);
  transform: translateY(-2px);
}

.btn-pill:active {
  box-shadow: var(--clay-shadow-active);
  transform: translateY(1px);
}

.btn-pill--primary {
  background: linear-gradient(135deg, #ffecfa 0%, #fff 100%);
  color: #d16b9b;
}

.btn-pill--frosted {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
}

.hero-meta {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  color: var(--color-text-muted);
  font-weight: 500;
  flex-wrap: wrap;
  font-size: 0.95rem;
}

.hero-links,
.contact-links {
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-links a,
.contact-links a {
  display: inline-flex;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--clay-shadow);
  color: var(--color-text-main);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.hero-links a:hover,
.contact-links a:hover {
  box-shadow: var(--clay-shadow-hover);
  transform: translateY(-2px);
}

.hero-links a:active,
.contact-links a:active {
  box-shadow: var(--clay-shadow-active);
  transform: translateY(1px);
}

/* Sections */
.section-shell {
  border-radius: 32px;
  padding: 3rem 2.5rem;
  background: var(--glass-bg);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid var(--glass-border);
  box-shadow: 
    0 15px 35px rgba(166, 180, 200, 0.15),
    inset 2px 2px 5px rgba(255, 255, 255, 0.5);
  animation: fade-up 0.8s ease both;
  animation-timeline: view();
  animation-range: entry 10% cover 30%;
}

.section-head {
  margin-bottom: 2rem;
}

.section-head h2 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 2.75rem);
  letter-spacing: -1px;
  color: var(--color-text-main);
}

.section-head p {
  margin: 0.75rem 0 0;
  max-width: 70ch;
  color: var(--color-text-muted);
  line-height: 1.7;
  font-size: 1.05rem;
}

/* Grids & Cards */
.skills-grid,
.projects-grid,
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1.5rem;
}

.skills-grid > .glass-card,
.highlights-grid > .glass-card {
  grid-column: span 4;
}

.projects-grid > .project-card {
  grid-column: span 12;
}

.glass-card,
.experience-card {
  border-radius: 24px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  padding: 1.75rem;
  backdrop-filter: blur(10px);
  box-shadow: var(--clay-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover,
.experience-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--clay-shadow-hover);
}

.glass-card h3,
.experience-card h3 {
  margin: 0;
  font-size: 1.3rem;
  font-family: var(--font-display);
  color: var(--color-text-main);
  font-weight: 700;
}

.glass-card > p {
  margin: 0.8rem 0;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Chips / Pills */
.chip-list {
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.chip-list li {
  border-radius: 999px;
  background: #fdfbfb;
  color: var(--color-text-main);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: var(--clay-shadow);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.4rem 0.85rem;
}

/* Experience */
.experience-stack {
  display: grid;
  gap: 1.5rem;
}

.experience-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px dashed rgba(166, 180, 200, 0.2);
}

.experience-head p {
  margin: 0.5rem 0 0;
  color: var(--color-text-muted);
  font-weight: 500;
}

.experience-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  text-align: right;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  box-shadow: inset 1px 1px 3px rgba(166, 180, 200, 0.2);
}

.detail-list {
  margin: 1.25rem 0 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.75rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.detail-list li::marker {
  color: #ffb5a7;
}

.highlight-block + .highlight-block {
  margin-top: 1.2rem;
}

.title-line {
  margin: 0;
  color: var(--color-text-main);
  font-weight: 700;
  font-family: var(--font-display);
}

.muted-copy {
  margin: 0.4rem 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

/* Contact */
.contact-section {
  border-radius: 32px;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(255, 209, 255, 0.4) 0%, rgba(193, 223, 196, 0.4) 100%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--clay-shadow);
  backdrop-filter: blur(20px);
}

.contact-section h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: var(--color-text-main);
}

.contact-section p {
  margin: 1.2rem auto 2rem;
  max-width: 60ch;
  color: var(--color-text-muted);
  line-height: 1.7;
  font-size: 1.1rem;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .skills-grid > .glass-card,
  .highlights-grid > .glass-card {
    grid-column: span 6;
  }
}

@media (max-width: 768px) {
  .desktop-nav { display: none; }
  .menu-toggle { display: block; }
  
  .skills-grid > .glass-card,
  .highlights-grid > .glass-card {
    grid-column: span 12;
  }
  
  .experience-head {
    flex-direction: column;
    text-align: left;
  }
  
  .experience-meta {
    text-align: left;
    align-items: flex-start;
  }
  
  .section-shell {
    padding: 2rem 1.5rem;
  }
}
`;

fs.writeFileSync('src/index.css', indexCss);
fs.writeFileSync('src/App.css', appCss);
console.log('Done rewriting files.');
