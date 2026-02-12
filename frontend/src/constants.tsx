
import React from 'react';
import { Project, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Aether Cloud Engine',
    category: 'Full-Stack Infrastructure',
    description: 'A distributed computing platform with real-time analytics.',
    longDescription: 'Engineered a high-performance cloud orchestration layer that handles 10k+ concurrent events. Focused on scalability and ultra-low latency data synchronization.',
    image: 'https://picsum.photos/seed/aether/1200/800',
    techStack: ['React', 'TypeScript', 'Node.js', 'Redis', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
    metrics: ['99.9% Uptime', '< 50ms Latency', 'Zero-Downtime Deployment']
  },
  {
    id: '02',
    title: 'Neon Neural Interface',
    category: 'AI / Machine Learning',
    description: 'Visual interface for complex neural network monitoring.',
    longDescription: 'Designed and implemented a sleek dashboard for data scientists to visualize model weights and training biases in real-time. Leveraged GPU acceleration for fluid 60FPS renders.',
    image: 'https://picsum.photos/seed/neural/1200/800',
    techStack: ['Three.js', 'Python', 'WebGPU', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#',
    metrics: ['2M+ Data Points', 'GPU-Accelerated', 'Adaptive UI']
  },
  {
    id: '03',
    title: 'Prism Payment Protocol',
    category: 'Fintech / Security',
    description: 'Ultra-secure, biometric-first transaction layer.',
    longDescription: 'A modular payment gateway designed for modern web apps. Implemented advanced cryptographic standards to ensure every transaction is tamper-proof.',
    image: 'https://picsum.photos/seed/prism/1200/800',
    techStack: ['Next.js', 'Solidity', 'PostgreSQL', 'Ethers.js'],
    liveUrl: '#',
    githubUrl: '#',
    metrics: ['E2E Encrypted', 'PCI DSS Level 1', 'Fast Settlement']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Architecture',
    skills: [
      { name: 'React' }, { name: 'Next.js' }, { name: 'TypeScript' },
      { name: 'Tailwind' }, { name: 'Framer Motion' }, { name: 'Three.js' }
    ]
  },
  {
    title: 'System Engineering',
    skills: [
      { name: 'Node.js' }, { name: 'Go' }, { name: 'Python' },
      { name: 'Rust' }, { name: 'PostgreSQL' }, { name: 'Redis' }
    ]
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { name: 'Docker' }, { name: 'Kubernetes' }, { name: 'AWS' },
      { name: 'Terraform' }, { name: 'CI/CD' }, { name: 'Vercel' }
    ]
  },
  {
    title: 'Tools & Workflow',
    skills: [
      { name: 'Git' }, { name: 'Neovim' }, { name: 'Figma' },
      { name: 'Jira' }, { name: 'Linux' }, { name: 'Shell Scripting' }
    ]
  }
];
