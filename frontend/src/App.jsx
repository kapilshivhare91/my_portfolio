import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Card from './components/Card';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';

function App() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get('http://127.0.0.1:8001/api/projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.tech_stack.some(tech => tech.toLowerCase().includes(filter.toLowerCase())));

  const categories = ['All', 'React', 'Django', 'Python', 'Tailwind'];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <div className="max-w-6xl mx-auto mb-8 flex flex-wrap gap-4 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${filter === cat
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 backdrop-blur-sm'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {/* Bio Card - Spans 2 columns */}
        <Card className="col-span-1 md:col-span-2 flex items-center justify-center min-h-[200px] bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-500/20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">Hello, I'm Developer!</h2>
            <p className="text-gray-300 text-lg">Full Stack Developer | Python & React Enthusiast</p>
          </div>
        </Card>

        {/* Projects */}
        {filteredProjects.map((project, index) => (
          // Layout logic: First item in 'All' view spans larger
          <ProjectCard
            key={project.id}
            project={project}
            className={filter === 'All' && index === 0 ? "col-span-1 md:col-span-2 row-span-2" : ""}
          />
        ))}

        {/* Contact Form - Spans 2 columns */}
        <ContactForm className="col-span-1 md:col-span-2 min-h-[400px]" />
      </motion.div>
    </div>
  )
}

export default App
