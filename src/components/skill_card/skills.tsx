import type { skillProps } from "./card.tsx";

const skills: skillProps[] = [
  // Python & related
  { skill: 'Python', img: 'python.svg', type: 'Backend' },
  { skill: 'Django', img: 'django.svg', type: 'Backend' },
  {skill: 'FastAPI', img: 'fastapi.png', type: 'Backend'},
  { skill: 'Java', img: 'java.svg', type: 'Backend' },
  { skill: 'SpringBoot', img: 'spring.svg', type: 'Backend' },
  { skill: 'SQL', img: 'sql.svg', type: 'Backend' },
  { skill: 'Postman', img: 'postman.svg', type: 'Backend' },
  // CI/CD & DevOps
  { skill: 'Git', img: 'git.svg', type: 'DevOps' },
  { skill: 'Docker', img: 'docker.svg', type: 'DevOps' },
  { skill: 'Jenkins', img: 'jenkins.svg', type: 'DevOps' },
  { skill: 'SonarQube', img: 'sonar.svg', type: 'DevOps' },
  { skill: 'AWS', img: 'aws.svg', type: 'DevOps' },
  { skill: 'Linux', img: 'linux.svg', type: 'DevOps' },
  { skill: 'Kubernetes', img: 'Kubernetes.png', type: 'DevOps' },
  { skill: 'Terraform', img: 'Terraform.webp', type: 'DevOps' },
  { skill: 'Ansible', img: 'Ansible.png', type: 'DevOps' },
  { skill: 'Proxmox', img: 'proxmox.png', type: 'DevOps' },

  // Frontend
  { skill: 'React', img: 'react.svg', type: 'Frontend' },
  { skill: 'TypeScript', img: 'tsx.svg', type: 'Frontend' },
  { skill: 'JavaScript', img: 'js.svg', type: 'Frontend' },
  { skill: 'HTML', img: 'html.svg', type: 'Frontend' },
  { skill: 'CSS', img: 'css.svg', type: 'Frontend' },
  { skill: 'Vite', img: 'vite.svg', type: 'Frontend' },

  
];

export default skills;