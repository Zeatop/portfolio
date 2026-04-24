import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/navigationBar/bar/navbar';
import FirstSection from './content/first-section.tsx';
import ExperienceLine from './components/experienceLine/experienceLine.tsx';
import SkillBoard from './components/skill_card/skillBoard.tsx';
import ProjectSection from './components/projects/projectSection.tsx';
import ContactSection from './components/contact/contactSection.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <div id="scroll-container">

      <section className="snap-section">
        <FirstSection />
      </section>

      <section className="snap-section" id="skills">
        <SkillBoard />
      </section>

      <section className="snap-section--tall" id="projects">
        <div style={{ height: '10vh', flexShrink: 0 }} />
        <ProjectSection />
        <div style={{ height: '10vh', flexShrink: 0 }} />
      </section>

      <section className="snap-section--tall" id="education">
        {/* Espace en haut : laisse le temps d'arriver avant le premier dot */}
        <div style={{ height: '10vh', flexShrink: 0 }} />

        <ExperienceLine />

        {/* Espace en bas : le snap end se déclenche bien après le dernier élément */}
        <div style={{ height: '20vh', flexShrink: 0 }} />
      </section>

      <section className="snap-section" id="contact">
        <ContactSection />
      </section>

    </div>
    <a
      href="https://leo-jackson.com"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '0.25rem',
        left: '0.25rem',
        zIndex: 9999,
        display: 'block',
        width: '90px',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <img
        src="/windows-xp.gif"
        alt="Windows XP"
        style={{ display: 'block', width: '100%' }}
      />
    </a>
  </StrictMode>
)