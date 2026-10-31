import { useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { gsap, useGSAP, MOTION_OK, revealUp, revealHeadings } from '../lib/motion.js';
import { featuredProject, projects } from '../data.js';
import SkillTags from './SkillTags.jsx';
import EvidenceDemo from './EvidenceDemo.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function Projects() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      revealHeadings(q('.section-title'));
      revealUp(q('.project-card'), { y: 40, stagger: 0.15 });
    });
  }, { scope: root });

  return (
    <section id="projects" ref={root}>
      <SectionHeader index="02">Featured Product Projects</SectionHeader>

      <div className="project-card featured-card-style">
        <div className="featured-grid">
          <div>
            <span className="badge-feat">
              <Sparkles size={12} aria-hidden="true" />
              {featuredProject.badge}
            </span>
            <h3 className="featured-title">{featuredProject.title}</h3>
            <p className="featured-desc">{featuredProject.desc}</p>
            <SkillTags tags={featuredProject.tags} className="skills-left featured-tags" />
          </div>
          <EvidenceDemo />
        </div>
        <div className="btn-group">
          {featuredProject.links.map(({ label, href, variant, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-${variant}`}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
              <ArrowUpRight size={14} className="icon-external" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {projects.map((project) => (
        <div key={project.title} className="project-card">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.desc}</p>
          <SkillTags tags={project.tags} className="skills-left" />
        </div>
      ))}
    </section>
  );
}
