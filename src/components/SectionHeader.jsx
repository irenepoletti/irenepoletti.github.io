// Numbered editorial heading; the last word gets the serif-italic accent.
export default function SectionHeader({ index, children }) {
  const words = children.split(' ');
  const last = words.pop();
  return (
    <h2 className="section-header">
      <span className="section-index">{index}</span>
      <span className="section-title">
        {words.join(' ')} <em>{last}</em>
      </span>
    </h2>
  );
}
