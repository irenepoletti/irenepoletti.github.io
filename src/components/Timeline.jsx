import { Check } from 'lucide-react';

export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <div key={item.title} className="timeline-item">
          <span className="node" aria-hidden="true">
            <span className="node-ring" />
            <Check size={12} strokeWidth={3.5} />
          </span>
          <div className="item-header">
            <div className="item-title">{item.title}</div>
            <div className="item-date">{item.date}</div>
          </div>
          <div className="item-sub">{item.sub}</div>
          <div className="item-desc">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}
