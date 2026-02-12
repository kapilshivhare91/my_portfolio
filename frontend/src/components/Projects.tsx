import React, { useEffect, useState } from 'react';
import api from '../api';
import ProjectCard from './ProjectCard.tsx';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/');
        setProjects(response.data);
      } catch (err: any) {
        console.error('Failed to fetch projects:', err);
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 px-6 md:px-20 max-w-7xl mx-auto flex justify-center text-cyan-400 font-mono">
        Loading Artifacts...
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-24 px-6 md:px-20 max-w-7xl mx-auto flex justify-center text-red-500 font-mono">
        {error}
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] mb-4 uppercase">FEATURED DEPLOYMENTS</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-6">SELECTED ARTIFACTS.</h3>
        <p className="text-gray-400 max-w-xl font-light">
          A showcase of high-performance applications designed with scalability and visual impact in mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
