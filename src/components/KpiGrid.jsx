import { kpis } from '../data.js';
import { drawIcon } from '../lib/motion.js';

const canAnimate = () => window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

export default function KpiGrid() {
  return (
    <div className="kpi-grid">
      {kpis.map(({ title, desc, icon: Icon }) => (
        <div
          key={title}
          className="kpi-card"
          onMouseEnter={(e) => canAnimate() && drawIcon(e.currentTarget.querySelector('.kpi-icon svg'))}
        >
          <div className="kpi-icon">
            <Icon size={22} aria-hidden="true" />
          </div>
          <div className="kpi-title">{title}</div>
          <div className="kpi-desc">{desc}</div>
        </div>
      ))}
    </div>
  );
}
