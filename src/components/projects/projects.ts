export interface Project {
  title: string;
  category: string;
  tagline: string;        // Résumé court (1 phrase max) affiché sur la card
  description: string;   // Description longue (pour un éventuel modal)
  tags: string[];
  status: 'En cours' | 'Terminé';
  date: string;
  color: 'purple' | 'red' | 'teal' | 'amber'; // couleur thème de la card
  github?: string;
  link?: string;
}

const projects: Project[] = [

  {
    title: 'Judge',
    category: 'IA · RAG · Full-stack',
    tagline: 'Assistant RAG de règles de jeux de société — ingère des PDFs, indexe via ChromaDB et répond en langage naturel avec sources citées.',
    description: 'Assistant de règles de jeux de société basé sur un pipeline RAG. Ingère des rulebooks PDF (format dual User/RAG), les indexe dans ChromaDB via embeddings Mistral, et répond en langage naturel aux questions de règles. Interface React/TypeScript avec retour de sources citées.',
    tags: ['Python', 'LangChain', 'ChromaDB', 'Mistral', 'Ollama', 'React', 'TypeScript', 'FastAPI', 'MongoDB'],
    status: 'En cours',
    date: '2026',
    color: 'purple',
    link: 'https://leojackson.dev',
    github: 'https://github.com/Zeatop/Judge',
  },
  {
    title: 'Portfolio Windows XP',
    category: 'Frontend · Creative',
    tagline: 'Bureau interactif thématisé Windows XP — fenêtres draggables, Minesweeper, Webamp, écran BIOS animé et client mail Outlook Express.',
    description: 'Portfolio personnel thématisé Windows XP — bureau interactif avec fenêtres déplaçables/redimensionnables, Minesweeper, 3D Pinball, Webamp intégré, écran BIOS animé au boot, CV avec switch FR/EN, et client mail stylisé Outlook Express. Entièrement en React 18 + Vite + Zustand.',
    tags: ['React', 'TypeScript', 'Vite', 'Zustand', 'SCSS', 'react-rnd'],
    status: 'Terminé',
    date: '2026',
    color: 'purple',
    link: 'https://leojackson.dev',
    github: 'https://github.com/Zeatop/portfolio-xp',
  },
  {
    title: 'QuestlyTales',
    category: 'Game · Full-stack',
    tagline: 'Moteur de jeu d\'aventure en choix multiples avec éditeur visuel d\'arbres narratifs et backend Spring Boot.',
    description: 'Système de jeu d\'aventure en choix multiples (choose-your-own-adventure). Backend Spring Boot exposant une API de gestion des scénarios, des noeuds narratifs et des choix. Éditeur web React permettant de construire visuellement des arbres de décision et de les publier.',
    tags: ['Spring Boot', 'Java', 'React', 'TypeScript', 'MongoDB', 'REST API'],
    status: 'En cours',
    date: '2025',
    color: 'purple',
    github: 'https://github.com',
  },
  {
    title: 'PFD Toolbox',
    category: 'DevOps · Entreprise',
    tagline: 'Wizard d\'installation modulaire piloté par des manifestes YAML distants — gestion des versions, variables d\'environnement, certificats et licences.',
    description: 'Wizard d\'installation modulaire conçu pour les environnements d\'entreprise. Référence les logiciels à déployer via des manifestes YAML dans un dépôt distant — ajout/suppression de softs sans toucher au code. Gère les variables d\'environnement, certificats, licences, et permet de switcher de version active ou de mettre à jour une configuration existante à la volée.',
    tags: ['Python', 'YAML', 'Git', 'Docker', 'Windows', 'DevOps'],
    status: 'En cours',
    date: '2024',
    color: 'purple',
    github: 'https://github.com',
  },
];

export default projects;