// All site content lives here so it can be edited without touching components.
import { ClipboardCheck, Mail, MonitorPlay, Presentation, Rocket, Users } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './components/BrandIcons.jsx';

export const profile = {
  name: 'Irene Poletti',
  avatar: '/avatar.jpg',
  initials: 'IP',
  location: 'Pavia ↔ Szeged',
  title: "Product-Minded Master's Student & Aspiring Product Manager",
  bio: 'Combining rigorous process verification with hands-on experience shipping digital tools, automating workflows, and translating stakeholder needs into requirements. Double degree candidate focused on driving outcomes through structured thinking and user empathy.',
  socials: [
    { label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/irene-poletti/' },
    { label: 'GitHub', icon: GithubIcon, href: 'https://github.com/irenepoletti' },
    { label: 'Email', icon: Mail, href: 'mailto:irenepolettiads@gmail.com' },
  ],
  skills: [
    'Requirements Gathering',
    'Project Management',
    'Process Automation',
    'Stakeholder Communication',
    'Zoho One & Excel',
  ],
};

export const kpis = [
  {
    icon: Rocket,
    title: 'Product Execution',
    desc: 'Shipping digital infrastructure, web maintenance, and automated data pipelines',
  },
  {
    icon: ClipboardCheck,
    title: 'Requirements & QA',
    desc: 'Requirement validation mindset, risk assessment, and workflow compliance testing',
  },
  {
    icon: Users,
    title: 'Cross-Functional',
    desc: 'Community management, international event scaling, and stakeholder liaison',
  },
];

export const certifications = [
  { badge: 'McK', title: 'McKinsey Forward Program', issuer: 'Soft Skills & Leadership' },
  { badge: 'OCI', title: 'OCI AI Foundations Associate', issuer: 'Oracle Cloud Infrastructure' },
];

export const education = [
  {
    title: 'M.Sc. International Business & Entrepreneurship (MIBE), Double Degree',
    date: 'Sep 2025 – Jun 2027 (exp.)',
    sub: 'University of Pavia (Italy) & University of Szeged (Hungary)',
    desc: 'High academic standing: 30/30 cum laude in Innovation and Technology Law; 28/30 in Applied Project Management. Focusing on innovation regulation and project management.',
  },
  {
    title: 'B.Sc. in Economics & Management',
    date: 'Sep 2022 – Jul 2025',
    sub: 'University of Pavia (Italy)',
    desc: 'Includes Erasmus+ exchange at Université Catholique de Lille (Sep 2024 – Jan 2025): full curriculum in Economics, Administration, and Management in English.',
  },
];

export const experience = [
  {
    title: 'ICT Project Manager (Freelance)',
    date: 'Sep 2022 – Jul 2025',
    sub: 'Innovia S.r.l. — Pavia, Italy',
    desc: 'Managed and updated digital infrastructure (Spazio Acqua, Innovia, Centro La Ducale). Deployed Zoho One forms for automated energy-diagnosis data pipelines. Captured client requirements and served as direct liaison with technical suppliers.',
  },
  {
    title: 'Audit Intern',
    date: 'Nov 2025 – Apr 2026',
    sub: 'PwC Italy (PricewaterhouseCoopers) — Milan, Italy',
    desc: 'Analyzed large datasets using advanced Excel and digital audit systems. Executed internal-control tests and verified end-to-end compliance workflows, translating a requirement-validation mindset into launch readiness.',
  },
  {
    title: 'Process Team Member',
    date: '2026 – Present',
    sub: 'Erasmus Student Network (ESN) Szeged — Szeged, Hungary',
    desc: 'Supported internal workflows for international student programs, planning and scaling events for a multicultural community while gathering user feedback across cultural contexts.',
  },
];

export const featuredProject = {
  badge: 'Flagship Product Case Study',
  title: 'CorpProof: Automated Sustainability Disclosure Platform',
  desc: 'End-to-end product concept and B2B SaaS architecture addressing EU CSRD/ESRS regulatory compliance. Designed core modules including Evidence Mapping, ESRS Requirement Checking, and an AI Review Trail governed under Art. 50 of the EU AI Act. Developed comprehensive scaling roadmap for the Netherlands and German markets.',
  tags: ['Product Specs & MVP', 'B2B SaaS Pricing', 'Go-To-Market Strategy', 'AI Governance'],
  links: [
    { label: 'Interactive Product Demo', icon: MonitorPlay, href: 'https://pixel-perfect-clone-01794.lovable.app', variant: 'primary' },
    { label: 'Strategic Deck', icon: Presentation, href: 'https://prezi.com/view/0dTeRDAyCeSXepu8y1vGi41', variant: 'secondary' },,
  ],
};

export const projects = [
  {
    title: 'Global Comfort Café: Feasibility & 5-Year Financial Strategy',
    desc: 'Acted as Team Lead (CEO) during Erasmus at Université Catholique de Lille to define commercial positioning, unit economics, and 5-year financial models for an international venture.',
    tags: ['Venture Strategy', 'Financial Modeling', 'Team Leadership'],
  },
  {
    title: 'Automotive Market Analysis: MATLAB & Clustering',
    desc: 'Applied econometric and K-Means clustering workflows across 150+ vehicle models using MATLAB to evaluate market resilience and depreciation metrics.',
    tags: ['MATLAB', 'Quantitative Research', 'Data Clustering'],
  },
];
