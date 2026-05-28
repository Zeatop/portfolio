import { useState } from 'react';
import Button from '../button/button';
import './navbar.scss';

const scrollTo = (id: string) => {
  const container = document.getElementById('scroll-container');
  const target = document.getElementById(id);
  if (!container || !target) return;

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const offset = targetRect.top - containerRect.top + container.scrollTop;

  container.scrollTo({ top: offset, behavior: 'smooth' });
};

const downloadCV = () => {
  const a = document.createElement('a');
  a.href = '/safemode/LEO_JACKSON_CV.pdf';
  a.download = 'LEO_JACKSON_CV.pdf';
  a.click();
};

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <div className="navbar">
      <nav className="nav-bar-inner glass-nav">
        <div className="nav-row">
          <img src="/safemode/leo_logo_backless.png" alt="Logo" className="logo" />
          <button
            className={`hamburger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
        <div className={`nav-links${menuOpen ? ' menu-open' : ''}`}>
          <Button text="Skills"    onClick={() => nav('skills')}    />
          <Button text="Projects"  onClick={() => nav('projects')}  />
          <Button text="Education" onClick={() => nav('education')} />
          <Button text="Contact"   onClick={() => nav('contact')}   />
          <Button text="Resume" isFramed onClick={downloadCV} />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;