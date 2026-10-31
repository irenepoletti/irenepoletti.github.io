import { useRef } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP, MOTION_OK, revealHeadings } from '../lib/motion.js';
import { profile } from '../data.js';

export default function Footer() {
  const root = useRef(null);
  const email = profile.socials.find((s) => s.href.startsWith('mailto:'));
  const others = profile.socials.filter((s) => s !== email);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      revealHeadings(root.current.querySelectorAll('.footer-cta-text'));
    });
  }, { scope: root });

  return (
    <footer className="footer" ref={root}>
      <p className="footer-kicker">Have a role in mind?</p>
      <a href={email.href} className="footer-cta">
        <span className="footer-cta-text">Let’s <em>talk</em></span>
        <span className="footer-cta-arrow" aria-hidden="true">
          <ArrowUpRight size={44} strokeWidth={1.75} />
        </span>
      </a>
      <p className="footer-email">{email.href.replace('mailto:', '')}</p>

      <div className="footer-row">
        <nav className="footer-links" aria-label="Social">
          {others.map(({ label, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              {label}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#home" className="footer-top">
          Back to top
          <ArrowUp size={13} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
