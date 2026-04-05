import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/navigationBar/bar/navbar';
import FirstSection from './content/first-section.tsx';
import ExperienceLine from './components/experienceLine/experienceLine.tsx';
import SkillBoard from './components/skill_card/skillBoard.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <div id="scroll-container">

      <section className="snap-section">
        <FirstSection />
      </section>

      <section className="snap-section">
        <SkillBoard />
      </section>

      <section className="snap-section--tall">
        {/* Espace en haut : laisse le temps d'arriver avant le premier dot */}
        <div style={{ height: '10vh', flexShrink: 0 }} />

        <ExperienceLine />

        {/* Espace en bas : le snap end se déclenche bien après le dernier élément */}
        <div style={{ height: '20vh', flexShrink: 0 }} />
      </section>

    </div>
  </StrictMode>
)