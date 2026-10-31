import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const root = document.documentElement;

function readStored() {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
}

// The initial theme is set by the inline script in index.html before paint;
// this hook reads it back and handles switching.
export default function useTheme() {
  const [theme, setTheme] = useState(() => root.dataset.theme || 'light');

  useEffect(() => {
    root.dataset.theme = theme;
  }, [theme]);

  // Follow the OS setting until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => !readStored() && setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Swap themes; where supported, the new one spreads out in a circle from
  // the point that was clicked.
  const toggle = (event) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode: the choice just won't persist */
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
      root.dataset.theme = next;
    });
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

  return [theme, toggle];
}
