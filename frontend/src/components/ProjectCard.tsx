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
      className="relative w-full h-full group cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-orange-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(-50px)" }}
      />

      <div className="relative h-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all hover:border-orange-500/30 hover:shadow-xl flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80" />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-md border border-gray-200 rounded-md text-[10px] font-mono text-orange-600 uppercase tracking-widest shadow-sm">
              {project.id} // {project.category}
            </span>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {project.techStack.map(tech => (
              <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full border border-orange-500/20 bg-orange-50 font-mono text-gray-700">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="px-6 py-2 bg-orange-500 border border-transparent rounded text-xs font-bold text-white hover:bg-orange-600 shadow-sm hover:shadow-md transition-all"
              >
                LIVE DEMO
              </a>
            )}
            <a
              href={project.githubUrl}
              className="text-xs font-bold text-gray-500 hover:text-orange-600 transition-colors"
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
