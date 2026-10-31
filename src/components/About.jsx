import { useRef } from 'react';
import { ArrowDown, Award, Briefcase, GraduationCap, Rocket } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, revealUp, revealHeadings, drawIcon } from '../lib/motion.js';
import { certifications, education, experience } from '../data.js';
import Timeline from './Timeline.jsx';
import SectionHeader from './SectionHeader.jsx';

function SubHeader({ icon: Icon, children }) {
  return (
    <h3 className="sub-header">
      <Icon size={18} aria-hidden="true" />
      {children}
    </h3>
  );
}

export default function About() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      revealHeadings(q('.section-title'));
      revealUp(q('.sub-header'));
      q('.sub-header').forEach((h) =>
        drawIcon(h.querySelector('svg'), { delay: 0.2, scrollTrigger: { trigger: h, start: 'top 88%', once: true } })
      );
      revealUp(q('.cert-card'), { stagger: 0.12 });
      // Sideways out of the rail (never rightwards, which would overflow on
      // phones), so the cards don't shift where the nodes' triggers sit.
      revealUp(q('.timeline-item'), { x: -24, y: 0 });

      // The rail fills in step with scrolling; its tip always sits on the
      // 60% line, the same line that stamps each node as verified.
      const journey = root.current.querySelector('.journey');
      journey.classList.add('is-animated');
      gsap.fromTo(
        '.rail-fill',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.rail', start: 'top 60%', end: 'bottom 60%', scrub: true } }
      );

      q('.journey .node').forEach((node) => {
        const stamp = gsap
          .timeline({ paused: true })
          .fromTo(node, { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' })
          .fromTo(node.querySelector('svg'), { scale: 0, rotate: -35 }, { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(3)' }, 0.05)
          .fromTo(node.querySelector('.node-ring'), { scale: 1, opacity: 0.55 }, { scale: 2.8, opacity: 0, duration: 0.8, ease: 'power2.out' }, 0);

        ScrollTrigger.create({
          trigger: node,
          start: 'center 60%',
          toggleClass: { targets: node, className: 'is-verified' },
          onEnter: () => stamp.restart(),
          onLeaveBack: () => stamp.pause(0),
        });
      });

      return () => journey.classList.remove('is-animated');
    });
  }, { scope: root });

  return (
    <section id="about" ref={root}>
      <SectionHeader index="01">About Me</SectionHeader>

      <SubHeader icon={Award}>Professional Certifications</SubHeader>
      <div className="certs-grid">
        {certifications.map((cert) => (
          <div key={cert.title} className="cert-card">
            <div className="cert-badge">{cert.badge}</div>
            <div className="cert-info">
              <div className="cert-title">{cert.title}</div>
              <div className="cert-issuer">{cert.issuer}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="journey">
        <div className="rail" aria-hidden="true">
          <div className="rail-fill" />
        </div>

        <SubHeader icon={GraduationCap}>Education</SubHeader>
        <Timeline items={education} />

        <SubHeader icon={Briefcase}>Professional Experience</SubHeader>
        <Timeline items={experience} />

        <a href="#projects" className="milestone">
          <span className="node node-final" aria-hidden="true">
            <span className="node-ring" />
            <Rocket size={14} strokeWidth={2.5} />
          </span>
          <span className="milestone-label">
            Verified. Shipped. <strong>See the work</strong>
          </span>
          <ArrowDown size={16} className="milestone-arrow" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
