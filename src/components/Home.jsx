import { useRef } from 'react';
import { gsap, SplitText, useGSAP, MOTION_OK } from '../lib/motion.js';
import { introReady } from '../lib/intro.js';
import Hero from './Hero.jsx';
import Marquee from './Marquee.jsx';
import KpiGrid from './KpiGrid.jsx';

export default function Home() {
  const root = useRef(null);

  // Intro, played as the preloader lifts: the name rises out of a mask letter
  // by letter, the photo pill opens between the words, then the rest follows.
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const split = SplitText.create('.name-word', { type: 'chars', mask: 'chars' });
      const cards = '.kpi-card';

      gsap.set(cards, { transition: 'none' });
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' }, onComplete: () => gsap.set(cards, { clearProps: 'all' }) })
        .from('.hero-meta > *', { y: 12, opacity: 0, duration: 0.6, stagger: 0.08 })
        .from(split.chars, { yPercent: 110, duration: 1.1, stagger: 0.035, ease: 'power4.out' }, 0.1)
        .from('.avatar', { scale: 0, rotate: -20, duration: 1, ease: 'back.out(1.4)', clearProps: 'transform' }, 0.45)
        .from('.name-dot', { scale: 0, duration: 0.5, ease: 'back.out(3)' }, 0.9)
        .from(['.hero-title', '.hero-bio'], { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.7)
        .from('.hero-link', { y: 16, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.85)
        .from('.marquee', { opacity: 0, duration: 1 }, 1)
        .from(cards, { y: 40, opacity: 0, duration: 0.8, stagger: 0.12 }, 1.05);

      introReady.then(() => tl.play());
    });
  }, { scope: root });

  return (
    <section id="home" ref={root}>
      <Hero />
      <Marquee />
      <KpiGrid />
    </section>
  );
}
