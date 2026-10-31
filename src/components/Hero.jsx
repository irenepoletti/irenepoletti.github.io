import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data.js';

// Initials sit underneath as a placeholder; the photo fades in over them once
// decoded, so neither alt text nor an empty frame ever shows while loading.
function Avatar() {
  const img = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish before React attaches onLoad.
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth) setLoaded(true);
  }, []);

  return (
    <span className="avatar">
      <span className="avatar-initials" aria-hidden="true">{profile.initials}</span>
      <img
        ref={img}
        src={profile.avatar}
        alt={profile.name}
        width="260"
        height="260"
        fetchPriority="high"
        decoding="async"
        className={`avatar-img${loaded ? ' is-loaded' : ''}`}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}

// "Product Manager" is picked out in the accent color.
function Title() {
  const accent = 'Product Manager';
  const [before, after] = profile.title.split(accent);
  return (
    <p className="hero-title">
      {before}
      <span className="hero-title-accent">{accent}</span>
      {after}
    </p>
  );
}

export default function Hero() {
  const [first, ...rest] = profile.name.split(' ');

  return (
    <div className="hero">
      <div className="hero-meta">
        <span className="hero-status">
          <span className="status-dot" aria-hidden="true" />
          Portfolio
        </span>
        <span>{profile.location}</span>
      </div>

      <div className="hero-layout">
        <h1 className="hero-name" aria-label={profile.name}>
          <span className="name-line">
            <span className="name-word" aria-hidden="true">{first}</span>
          </span>
          <span className="name-line">
            <span className="name-word" aria-hidden="true">{rest.join(' ')}</span>
            <span className="name-dot" aria-hidden="true">.</span>
          </span>
        </h1>

        <Avatar />

        <div className="hero-text">
          <Title />
          <p className="hero-bio">{profile.bio}</p>
        </div>

        <ul className="hero-links">
          {profile.socials.map(({ label, href, icon: Icon }) => {
            const external = href.startsWith('http');
            return (
              <li key={href}>
                <a
                  href={href}
                  className="hero-link"
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{label}</span>
                  <ArrowUpRight size={16} className="icon-external" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
