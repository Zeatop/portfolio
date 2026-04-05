import type { expDict } from './card.tsx';


const experiences: expDict[] = [
  {
    type: 'job',
    company: 'ProBTP',
    position: 'Alternance — Développeur full-stack',
    start: 'Août 2025',
    end: 'Juin 2026',
    description: 'Déploiements automatisés en environnements conteneurisés, développement et maintenance du wizard d\'installation des logiciels, outil d\'analyse d\'obsolescence pour conformité DORA, monitoring de l\'activité contributeurs Jahia.',
    linkedTraining: {
      company: 'Université Côte d\'Azur',
      position: 'M2 MIAGE MBDS',
      description: 'Systèmes distribués, administration cloud AWS, développement web (React, SpringBoot), IoT.',
    },
  },
  {
    type: 'job',
    company: 'ProBTP',
    position: 'Alternance — Développeur full-stack',
    start: 'Août 2023',
    end: 'Août 2025',
    description: 'Déploiements automatisés en environnements conteneurisés, développement et maintenance du wizard d\'installation des logiciels, outil d\'analyse d\'obsolescence pour conformité DORA, monitoring de l\'activité contributeurs Jahia.',
    linkedTraining: {
      company: 'Openclassrooms',
      position: 'Développeur d\'application',
      description: 'Développement web (Django, React), POO, testing (pytest, unittest), APIs, déploiement automatisé.',
    },
  },
  {
    type: 'training',
    company: 'IB Cegos',
    position: 'Formation DevOps',
    start: 'Décembre 2022',
    end: 'Février 2023',
    description: 'Formations aux outils et pratiques DevOps : CI/CD, Docker, monitoring, cloud (AWS). \nCertification Devops Fundamentals (DevOps Institute).',
  },
  {
    type: 'job',
    company: 'Gelazur',
    position: 'Ingénieur commercial',
    start: 'Juillet 2021',
    end: 'Novembre 2022',
    description: 'Prospection, développement nouveaux produits, négociation tarifaire, closing.',
  },
  {
    type: 'job',
    company: 'CIRAD',
    position: 'Ingénieur d\'étude',
    start: 'Janvier 2021',
    end: 'Juin 2021',
    description: 'Etude d\'impact des mycorhizes inoculées sur tomate contre différents arthropodes.',
    linkedTraining: {
      company: 'Université Côte d\'Azur',
      position: 'MSc Biocontrol Solutions for Plant Health — Mention très bien',
      description: 'Master dispensé en anglais. Agroécologie, Ecologie, Science des sols, Génétique, Microbiologie et Statistiques.',
    },
  },
];

export default experiences;