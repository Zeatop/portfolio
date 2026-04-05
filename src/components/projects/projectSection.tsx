import { useEffect, useRef } from 'react';
import ProjectCard from './projectCard';
import projects from './projects';
import './projectSection.scss';

// Ordre de stagger en damier : top-left, top-right, bottom-left, bottom-right
// avec délais croissants qui respectent la lecture naturelle
const STAGGER_DELAYS = [0, 0.12, 0.24, 0.36];

// Direction d'entrée par colonne (colonne 0 = gauche, colonne 1 = droite)
const FROM_DIRECTION = ['-52px', '52px'];

function ProjectSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.project-card');
    if (!cards) return;

    cards.forEach((card, i) => {
      const col = i % 2; // 0 = colonne gauche, 1 = colonne droite
      card.style.setProperty('--from', FROM_DIRECTION[col]);
      card.style.setProperty('--delay', `${STAGGER_DELAYS[i] ?? i * 0.12}s`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.06 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-section">
      <div className="section-header">
        <h2>Mes <span>projets</span></h2>
        <p>Une sélection de réalisations personnelles et professionnelles</p>
      </div>
      <div className="project-grid" ref={gridRef}>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectSection;