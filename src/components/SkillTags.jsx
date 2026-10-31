export default function SkillTags({ tags, className = '' }) {
  return (
    <div className={`skills-wrapper ${className}`.trim()}>
      {tags.map((tag) => (
        <span key={tag} className="skill-tag">{tag}</span>
      ))}
    </div>
  );
}
