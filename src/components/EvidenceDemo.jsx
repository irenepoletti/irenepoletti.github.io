import { useLayoutEffect, useRef } from 'react';
import { Check, FileText, ShieldCheck } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '../lib/motion.js';

const docs = [
  { name: 'HR policy.docx', req: 1 },
  { name: 'Energy audit.pdf', req: 0 },
  { name: 'Supplier code.pdf', req: 2 },
];

const reqs = [
  { code: 'E1', name: 'Climate change' },
  { code: 'S1', name: 'Own workforce' },
  { code: 'G1', name: 'Business conduct' },
];

// A looping, self-explaining preview of CorpProof: evidence documents get
// mapped to ESRS requirements, then each requirement is verified.
export default function EvidenceDemo() {
  const root = useRef(null);
  const body = useRef(null);
  const svg = useRef(null);

  // Connector curves are measured from the real layout, so they stay attached
  // at any width. pathLength="1" lets GSAP draw them without knowing lengths.
  useLayoutEffect(() => {
    const layout = () => {
      const box = body.current.getBoundingClientRect();
      const docEls = body.current.querySelectorAll('.doc-chip');
      const reqEls = body.current.querySelectorAll('.req-row');
      svg.current.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      svg.current.querySelectorAll('path').forEach((path, i) => {
        const a = docEls[i].getBoundingClientRect();
        const b = reqEls[docs[i].req].getBoundingClientRect();
        const x1 = a.right - box.left;
        const y1 = a.top + a.height / 2 - box.top;
        const x2 = b.left - box.left;
        const y2 = b.top + b.height / 2 - box.top;
        const mx = (x1 + x2) / 2;
        path.setAttribute('d', `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`);
      });
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(body.current);
    return () => ro.disconnect();
  }, []);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const docEls = q('.doc-chip');
      const reqEls = q('.req-row');
      const paths = q('.demo-links path');
      const missing = q('.s-missing');
      const mapped = q('.s-mapped');
      const verified = q('.s-verified');
      const count = q('.demo-count')[0];

      gsap.to(q('.live-dot'), { scale: 1.8, opacity: 0, duration: 1.2, repeat: -1, ease: 'power1.out' });

      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4, defaults: { ease: 'power2.out' } });
      tl.set(paths, { attr: { 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, opacity: 1 })
        .set(missing, { opacity: 1, y: 0 })
        .set([mapped, verified], { opacity: 0, y: 8 })
        .set(count, { textContent: 0 })
        .set(q('.demo-foot'), { opacity: 0.45 })
        .fromTo(docEls, { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.12 })
        .fromTo(reqEls, { x: 16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, '<');

      docs.forEach((doc, i) => {
        tl.call(() => docEls[i].classList.add('is-linked'), null, '+=0.25')
          .to(paths[i], { attr: { 'stroke-dashoffset': 0 }, duration: 0.6, ease: 'power2.inOut' })
          .to(missing[doc.req], { opacity: 0, y: -8, duration: 0.25 }, '-=0.15')
          .to(mapped[doc.req], { opacity: 1, y: 0, duration: 0.25 }, '<');
      });

      tl.to(mapped, { opacity: 0, y: -8, duration: 0.25, stagger: 0.22 }, '+=0.45')
        .to(verified, { opacity: 1, y: 0, duration: 0.4, stagger: 0.22, ease: 'back.out(3)' }, '<')
        .to(count, { textContent: 3, snap: { textContent: 1 }, duration: 0.66, ease: 'none' }, '<')
        .to(q('.demo-foot'), { opacity: 1, duration: 0.3 }, '<')
        .to({}, { duration: 2.4 })
        .to([docEls, reqEls, paths], { opacity: 0, duration: 0.4 })
        .call(() => docEls.forEach((el) => el.classList.remove('is-linked')));

      // Only burn frames while the card is actually on screen.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 85%',
        end: 'bottom 10%',
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    });
  }, { scope: root });

  return (
    <div
      className="demo"
      ref={root}
      role="img"
      aria-label="Animated preview: CorpProof maps evidence documents to ESRS requirements and verifies each one."
    >
      <div className="demo-head">
        <span className="demo-name">Evidence mapping</span>
        <span className="demo-live">
          <span className="live-dot-wrap"><span className="live-dot" /></span>
          Live preview
        </span>
      </div>

      <div className="demo-body" ref={body}>
        <svg className="demo-links" ref={svg} aria-hidden="true">
          {docs.map((d) => (
            <path key={d.name} pathLength="1" />
          ))}
        </svg>

        <div className="demo-col">
          <div className="demo-label">Evidence</div>
          {docs.map((d) => (
            <div key={d.name} className="doc-chip">
              <FileText size={13} aria-hidden="true" />
              <span>{d.name}</span>
            </div>
          ))}
        </div>

        <div className="demo-col">
          <div className="demo-label">ESRS requirement</div>
          {reqs.map((r) => (
            <div key={r.code} className="req-row">
              <span className="req-code">{r.code}</span>
              <span className="req-text">
                <span className="req-name">{r.name}</span>
                <span className="status">
                  <span className="s s-missing">Missing</span>
                  <span className="s s-mapped">Mapped</span>
                  <span className="s s-verified"><Check size={10} strokeWidth={3.5} />Verified</span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-foot">
        <ShieldCheck size={14} aria-hidden="true" />
        <span>
          AI review trail · <span className="demo-count">3</span>/3 verified · Art. 50 logged
        </span>
      </div>
    </div>
  );
}
