import Card from './card.tsx';
import type { expDict } from './card.tsx';
import DevDot from './devDot.tsx';
import './experienceLine.scss';

const experiences: expDict[] = [
  {
    company: 'Atlantix Media Inc',
    position: 'Fullstack Developer',
    start: '2025',
    end: 'Present',
    description: 'Fullstack developer, NextJS, React, Node.js, Figma',
  },
  {
    company: 'Accenture ltda',
    position: 'Senior Frontend Developer',
    start: '2021',
    end: '2024',
    description: 'Techs solutions, mono-repositories with Nx, Angular...',
  },
];

function ExperienceLine() {
  return (
    <div className="experience-timeline">
      <div className="timeline-line" />
      {experiences.map((exp, index) => (
        <div
          key={index}
          className={`experience-row ${index % 2 === 0 ? 'left' : 'right'}`}
        >
          {index % 2 === 0 && (
            <>
              <Card expDict={exp} side="left" />
              <DevDot />
              <span className="exp-date">{exp.start} – {exp.end}</span>
            </>
          )}
          {index % 2 !== 0 && (
            <>
              <span className="exp-date">{exp.start} – {exp.end}</span>
              <DevDot />
              <Card expDict={exp} side="right" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExperienceLine;