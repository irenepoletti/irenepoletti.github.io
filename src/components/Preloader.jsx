import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/motion.js';
import { releaseIntro } from '../lib/intro.js';
import { profile } from '../data.js';

const SEEN_KEY = 'preloader-seen';

// Once per browser session, and never for reduced-motion visitors.
function shouldShow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false;
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage blocked: show it, it's short */
  }
  return true;
}

// Resolves when what the hero needs (fonts + photo) is ready, capped so a
// slow network never holds the page hostage.
function assetsReady() {
  const img = new Image();
  img.src = profile.avatar;
  const decoded = img.decode().catch(() => {});
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const cap = new Promise((r) => setTimeout(r, 2500));
  return Promise.race([Promise.all([decoded, fonts]), cap]);
}

export default function Preloader() {
  const [visible, setVisible] = useState(shouldShow);
  const root = useRef(null);

  useEffect(() => {
    if (!visible) releaseIntro();
  }, [visible]);

  useGSAP(() => {
    if (!visible) return;
    document.documentElement.classList.add('is-loading');
    const counter = { value: 0 };
    const num = root.current.querySelector('.preloader-count');

    // Count to 90 on a timer, then finish only once assets are in.
    const count = gsap.to(counter, {
      value: 90,
      duration: 1.1,
      ease: 'power2.out',
      onUpdate: () => (num.textContent = String(Math.round(counter.value)).padStart(3, '0')),
    });

    Promise.all([assetsReady(), count.then()]).then(() => {
      gsap
        .timeline({
          onComplete: () => {
            document.documentElement.classList.remove('is-loading');
            setVisible(false);
          },
        })
        .to(counter, {
          value: 100,
          duration: 0.35,
          ease: 'power1.out',
          onUpdate: () => (num.textContent = String(Math.round(counter.value)).padStart(3, '0')),
        })
        .to('.preloader-bar span', { scaleX: 1, duration: 0.35, ease: 'power1.out' }, '<')
        .to('.preloader-inner', { yPercent: -30, opacity: 0, duration: 0.5, ease: 'power3.in' }, '+=0.1')
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.2')
        .add(releaseIntro, '-=0.45');
    });

    gsap.to('.preloader-bar span', { scaleX: 0.9, duration: 1.1, ease: 'power2.out' });
  }, { scope: root });

  if (!visible) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-inner">
        <span className="preloader-name">{profile.name}</span>
        <span className="preloader-role">Portfolio © {new Date().getFullYear()}</span>
        <span className="preloader-count">000</span>
        <span className="preloader-bar"><span /></span>
      </div>
    </div>
  );
}
