import { portfolioData } from '../data/portfolioData';
import Container from './ui/Container';
import { useTheme } from '../lib/ThemeContext';

export default function Footer() {
  const { personal } = portfolioData;
  const { isDark } = useTheme();

  return (
    <footer className="relative py-5">
      <Container>
        <div
          className="mx-auto max-w-xl border-2 px-4 py-2 text-center"
          style={{
            backgroundColor: isDark ? 'rgba(17, 24, 39, 0.78)' : 'rgba(255, 255, 255, 0.78)',
            borderColor: isDark ? '#e5e7eb' : '#000000',
            boxShadow: isDark ? '3px 3px 0px rgba(148,163,184,0.45)' : '3px 3px 0px #000000',
            backdropFilter: 'blur(3px)',
          }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: isDark ? '#d1d5db' : '#4b5563' }}
          >
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
