import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/navigationBar/bar/navbar';
import FirstSection from './content/first-section.tsx';
import ExperienceLine from './components/experienceLine/experienceLine.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <FirstSection />
    <ExperienceLine />
  </StrictMode>
)
