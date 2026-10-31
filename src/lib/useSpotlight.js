import { useEffect } from 'react';

const CARDS = '.kpi-card, .cert-card, .timeline-item, .project-card';

// One delegated listener feeds the pointer position into --mx/--my on the
// hovered card; the CSS turns that into the border glow.
export default function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onMove = (e) => {
      const card = e.target.closest?.(CARDS);
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}
