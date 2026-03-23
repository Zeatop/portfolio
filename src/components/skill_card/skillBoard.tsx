import { useState, useEffect, useRef } from 'react';
import Card from './card.tsx';
import './skillBoard.scss';
import skills from './skills.tsx';

const categories = ['Backend', 'DevOps', 'Frontend'];
const COOLDOWN_MS = 1500;

function SkillBoard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const lastScrollTime = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selected = categories[selectedIndex];
  const filtered = skills.filter(s => s.type === selected);

  // Met à jour la position/taille de la pill selon le bouton actif
  useEffect(() => {
    const btn = buttonRefs.current[selectedIndex];
    const container = selectionRef.current;
    if (!btn || !container) return;

    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setPillStyle({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [selectedIndex]);

  const changeCategory = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= categories.length) return;
    setVisible(false);
    setTimeout(() => {
      setSelectedIndex(newIndex);
      setVisible(true);
    }, 250);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      if (goingUp && selectedIndex === 0) return;
      if (goingDown && selectedIndex === categories.length - 1) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < COOLDOWN_MS) return;
      lastScrollTime.current = now;

      if (goingDown) changeCategory(selectedIndex + 1);
      else changeCategory(selectedIndex - 1);
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, [selectedIndex]);

  return (
    <div className="skill-board" ref={sectionRef}>
      <div className="selection" ref={selectionRef}>
        {/* Pill glissante */}
        <span
          className="selection-pill"
          style={{ left: pillStyle.left, width: pillStyle.width }}
        />
        {categories.map((cat, i) => (
          <button
            key={cat}
            ref={el => { buttonRefs.current[i] = el; }}
            className={selectedIndex === i ? 'selected' : ''}
            onClick={() => changeCategory(i)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className={`board-wrapper ${visible ? 'fade-in' : 'fade-out'}`}>
        {filtered.map((skill, index) => (
          <Card key={`${skill.skill}-${index}`} properties={skill} />
        ))}
      </div>
    </div>
  );
}

export default SkillBoard;