import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import useTheme from '../lib/useTheme.js';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '../lib/motion.js';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const linkRefs = useRef({});
  const placed = useRef(false);
  const [theme, toggleTheme] = useTheme();

  // Scroll spy: whichever section crosses the middle of the viewport is active.
  useGSAP(() => {
    links.forEach(({ id }) =>
      ScrollTrigger.create({
        trigger: document.getElementById(id),
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActive(id),
      })
    );

    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.from(navRef.current, { y: -24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 });
    });
  }, { scope: navRef });

  // Slide the highlight pill under the active link.
  useEffect(() => {
    const move = (instant) => {
      const link = linkRefs.current[active];
      if (!link || !pillRef.current) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.to(pillRef.current, {
        x: link.offsetLeft,
        width: link.offsetWidth,
        duration: instant || reduce ? 0 : 0.55,
        ease: 'power3.out',
        overwrite: true,
      });
    };
    move(!placed.current);
    placed.current = true;

    const onResize = () => move(true);
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(() => move(true));
    return () => window.removeEventListener('resize', onResize);
  }, [active]);

  return (
    <div className="navbar-container">
      <nav className="navbar" ref={navRef} aria-label="Main">
        <span className="nav-pill" ref={pillRef} aria-hidden="true" />
        {links.map((link) => (
          <a
            key={link.id}
            ref={(el) => (linkRefs.current[link.id] = el)}
            href={`#${link.id}`}
            className={active === link.id ? 'active' : undefined}
            aria-current={active === link.id ? 'true' : undefined}
          >
            {link.label}
          </a>
        ))}
        <span className="nav-divider" aria-hidden="true" />
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
        </button>
      </nav>
    </div>
  );
}
