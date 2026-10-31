import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '../lib/motion.js';
import { profile, featuredProject, projects } from '../data.js';

const items = [...new Set([...profile.skills, ...featuredProject.tags, ...projects.flatMap((p) => p.tags)])];

// Endless skills ticker. Scrolling speeds it up and flips its direction to
// match, then it eases back to its idle drift.
export default function Marquee() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const loop = gsap.to('.marquee-track', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
      let direction = 1;

      ScrollTrigger.create({
        onUpdate: (self) => {
          if (self.direction !== direction) {
            direction = self.direction;
            gsap.to(loop, { timeScale: direction, duration: 0.4, overwrite: true });
          }
          const boost = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity()) / 250);
          gsap.fromTo(loop, { timeScale: boost * direction }, { timeScale: direction, duration: 1.2, ease: 'power2.out', overwrite: true });
        },
      });

      const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.5, overwrite: true });
      const resume = () => gsap.to(loop, { timeScale: direction, duration: 0.5, overwrite: true });
      root.current.addEventListener('mouseenter', pause);
      root.current.addEventListener('mouseleave', resume);
      return () => {
        root.current?.removeEventListener('mouseenter', pause);
        root.current?.removeEventListener('mouseleave', resume);
      };
    });
  }, { scope: root });

  const row = (hidden) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="marquee-item">
          {item}
          <span className="marquee-sep" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" ref={root}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
