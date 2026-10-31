import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

// Every animation is wrapped in this query, so the CSS defaults (the final,
// fully visible state) are what reduced-motion visitors see.
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

// Fade-and-rise elements as they scroll into view. The CSS transition is
// suspended during the tween, then all inline styles are cleared so the
// cards' own hover transforms keep working.
export function revealUp(targets, { x = 0, y = 28, stagger = 0.08 } = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return;
  gsap.set(els, { x, y, opacity: 0, transition: 'none' });
  ScrollTrigger.batch(els, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
        overwrite: true,
        clearProps: 'transform,opacity,transition',
      }),
  });
}

// Headlines rise word by word out of a mask as they scroll into view.
export function revealHeadings(targets) {
  gsap.utils.toArray(targets).forEach((el) => {
    const split = SplitText.create(el, { type: 'words', mask: 'words' });
    gsap.from(split.words, {
      yPercent: 110,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      // Unwrap afterwards: the masks would otherwise crop italic overhangs.
      onComplete: () => split.revert(),
    });
  });
}

// Trace a Lucide icon's strokes, as if it's being drawn.
export function drawIcon(svg, vars = {}) {
  if (!svg) return null;
  return gsap.fromTo(
    svg.querySelectorAll('path, circle, rect, line, polyline'),
    { drawSVG: '0%' },
    { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut', stagger: 0.08, overwrite: true, ...vars }
  );
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
