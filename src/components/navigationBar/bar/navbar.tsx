// navBar.tsx
import Button from '../button/button';
import './navbar.scss';

function Navbar() {
  return (
    <div className="navbar glass-card">
      <h1>Léo Jackson</h1>
      <div className="nav-links glass-nav">
        <Button text="Skills" onClick={() => alert('Button clicked!')} />
        <Button text="Projects" onClick={() => alert('Button clicked!')} />
        <Button text="Education" onClick={() => alert('Button clicked!')} />
        <Button text="Contact" onClick={() => alert('Button clicked!')} />
        <Button text="Resume" isFramed onClick={() => alert('Button clicked!')} />
      </div>
    </div>
  );
}
export default Navbar;