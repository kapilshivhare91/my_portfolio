
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full group"
    >
      <div
        className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(-50px)" }}
      />

      <div className="relative bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-colors hover:border-cyan-400/30">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60" />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              {project.id} // {project.category}
            </span>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map(tech => (
              <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-gray-300">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs font-bold text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
              >
                LIVE DEMO
              </a>
            )}
            <a
              href={project.githubUrl}
              className="text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              SOURCE CODE
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
