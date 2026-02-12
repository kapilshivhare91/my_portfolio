import React from 'react';
import Card from './Card';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, className = "" }) => {
    return (
        <Card className={`flex flex-col gap-4 ${className}`}>
            {project.image && (
                <img
                    src={`http://127.0.0.1:8001${project.image}`}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-xl"
                />
            )}
            <div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack && project.tech_stack.map((tech, index) => (
                        <span key={index} className="bg-slate-700 text-xs px-2 py-1 rounded-full text-blue-300">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4 mt-auto">
                    <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
                        <FaGithub /> GitHub
                    </a>
                    {project.demo_link && (
                        <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors">
                            <FaExternalLinkAlt /> Demo
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;
