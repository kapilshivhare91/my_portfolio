import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <div className="max-w-6xl mx-auto mb-8 flex flex-wrap gap-4 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full transition-colors ${filter === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {/* Bio Card - Spans 2 columns */}
        <Card className="col-span-1 md:col-span-2 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Hello, I'm Developer!</h2>
            <p className="text-gray-400">Full Stack Developer | Python & React Enthusiast</p>
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
      </div>
    </div>
  )
}

export default App
