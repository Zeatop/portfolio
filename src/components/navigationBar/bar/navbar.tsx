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
  a.href = '//LEO_JACKSON_CV.pdf';
  a.download = 'LEO_JACKSON_CV.pdf';
  a.click();
};

function Navbar() {
  return (
    <div className="navbar">
      <nav className="nav-bar-inner glass-nav">
        <img src="/leo_logo_backless.png" alt="Logo" className="logo" />
        <div className="nav-links">
          <Button text="Skills"    onClick={() => scrollTo('skills')}    />
          <Button text="Projects"  onClick={() => scrollTo('projects')}  />
          <Button text="Education" onClick={() => scrollTo('education')} />
          <Button text="Contact"   onClick={() => scrollTo('contact')}   />
          <Button text="Resume" isFramed onClick={downloadCV} />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;