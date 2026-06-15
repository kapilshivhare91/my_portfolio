import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RedDiagonalBackground from "./RedDiagonalBackground";

// ─── Project Interface ────────────────────────────────────────────────────────
interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  color: string;
  description: string;
  screenshots: string[];
  liveUrl: string;
  githubUrl: string;
}

// ─── Project Data ──────────────────────────────────────────────────────────────
const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "NebulaOS Dashboard",
    tagline: "Real-time system monitoring for modern infra",
    tags: ["React", "WebSockets", "D3.js"],
    color: "#6C63FF",
    description:
      "NebulaOS Dashboard is a fully reactive, real-time monitoring platform built for DevOps teams managing distributed systems. It ingests live metrics via WebSockets, renders interactive D3.js charts, and surfaces anomalies using a lightweight ML pipeline. The UI adapts to any screen and supports keyboard-first navigation throughout.",
    screenshots: [
      "https://placehold.co/600x380/6C63FF/ffffff?text=Dashboard+Overview",
      "https://placehold.co/600x280/4B44CC/ffffff?text=Metrics+Charts",
      "https://placehold.co/600x320/9B94FF/ffffff?text=Alert+Panel",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "proj-2",
    title: "Verdant — Plant Care App",
    tagline: "Reminders, journals, and plant ID in one place",
    tags: ["React Native", "TensorFlow Lite", "Firebase"],
    color: "#22C55E",
    description:
      "Verdant helps plant enthusiasts keep their green friends alive. It identifies plants from photos using an on-device TensorFlow Lite model, generates personalised care schedules, and maintains a visual journal. Push notifications remind users to water, mist, or fertilise on time. Backend runs on Firebase with offline-first sync.",
    screenshots: [
      "https://placehold.co/600x420/22C55E/ffffff?text=Plant+Journal",
      "https://placehold.co/600x300/16A34A/ffffff?text=Care+Schedule",
      "https://placehold.co/600x350/4ADE80/1a1a1a?text=Plant+ID+Scanner",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "proj-3",
    title: "Cipher — E2E Chat",
    tagline: "Zero-knowledge, end-to-end encrypted messaging",
    tags: ["Next.js", "WebRTC", "Signal Protocol"],
    color: "#F59E0B",
    description:
      "Cipher is a privacy-first messaging application implementing the Signal Protocol for end-to-end encryption. Messages are encrypted client-side before transmission; the server never sees plaintext. Features include disappearing messages, group chats, and peer-to-peer video calls via WebRTC. Built as a PWA for cross-platform support.",
    screenshots: [
      "https://placehold.co/600x360/F59E0B/ffffff?text=Chat+Interface",
      "https://placehold.co/600x400/D97706/ffffff?text=Video+Call+Screen",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "proj-4",
    title: "Flux CMS",
    tagline: "Headless CMS with visual block editor",
    tags: ["TypeScript", "Node.js", "PostgreSQL"],
    color: "#EC4899",
    description:
      "Flux is a headless CMS with a drag-and-drop block editor inspired by Notion. Content is stored in a relational PostgreSQL schema and served via a typed REST + GraphQL API. The editor supports rich text, embedded media, custom component blocks, and live previews. Role-based access control protects content at field level.",
    screenshots: [
      "https://placehold.co/600x340/EC4899/ffffff?text=Block+Editor",
      "https://placehold.co/600x300/BE185D/ffffff?text=Media+Library",
      "https://placehold.co/600x380/F9A8D4/1a1a1a?text=API+Explorer",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "proj-5",
    title: "Orbital — 3D Portfolio",
    tagline: "Three.js interactive portfolio template",
    tags: ["Three.js", "GSAP", "GLSL Shaders"],
    color: "#14B8A6",
    description:
      "Orbital is a Three.js-powered 3D portfolio template where each project is represented as a planet in an interactive solar system. Users orbit the scene, click planets to explore projects, and experience custom GLSL shader effects for atmosphere glow. GSAP handles scene transitions. Designed for creative developers who want to stand out.",
    screenshots: [
      "https://placehold.co/600x400/14B8A6/ffffff?text=3D+Solar+System",
      "https://placehold.co/600x320/0D9488/ffffff?text=Planet+Detail+View",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "proj-6",
    title: "PulseAI — Music Generator",
    tagline: "Generative music powered by transformer models",
    tags: ["Python", "FastAPI", "Tone.js"],
    color: "#8B5CF6",
    description:
      "PulseAI lets users describe a mood or genre in plain language and generates a unique musical piece using a fine-tuned transformer model. The React frontend uses Tone.js to play back MIDI output in real time. Users can tweak tempo, key, and instrumentation, then export to MP3. The FastAPI backend streams token-by-token generation for low latency.",
    screenshots: [
      "https://placehold.co/600x380/8B5CF6/ffffff?text=Music+Composer+UI",
      "https://placehold.co/600x300/7C3AED/ffffff?text=Waveform+Visualizer",
      "https://placehold.co/600x340/A78BFA/1a1a1a?text=Export+Panel",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
];

// ─── Icons ─────────────────────────────────────────────────────────────────────
const GithubIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const ExternalLinkIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Screenshot Gallery Props Interface ─────────────────────────────────────────
interface ScreenshotGalleryProps {
  screenshots: string[];
  expanded: boolean;
  accentColor: string;
}

const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ screenshots, expanded, accentColor }) => {
  if (expanded) {
    return (
      <div className="flex flex-col gap-4">
        {screenshots.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Screenshot ${i + 1}`}
            className="w-full rounded-xl object-cover shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
          />
        ))}
      </div>
    );
  }

  // Stacked card mode: show first image fully, hint at more below
  return (
    <div className="relative w-full" style={{ height: "180px" }}>
      {screenshots.slice(0, 3).map((src, i) => (
        <div
          key={i}
          className="absolute w-full rounded-lg overflow-hidden shadow-md"
          style={{
            top: `${i * 8}px`,
            left: `${i * 4}px`,
            right: `${i * 4}px`,
            width: `calc(100% - ${i * 8}px)`,
            zIndex: 3 - i,
            height: "160px",
            opacity: 1 - i * 0.25,
            transform: `scale(${1 - i * 0.03})`,
            transformOrigin: "top center",
          }}
        >
          <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
      {/* Screenshot count badge */}
      {screenshots.length > 1 && (
        <div
          className="absolute bottom-0 right-2 z-10 text-xs font-semibold px-2 py-0.5 rounded-full text-white"
          style={{ background: accentColor }}
        >
          +{screenshots.length} shots
        </div>
      )}
    </div>
  );
};

// ─── Link Buttons Interface ────────────────────────────────────────────────────
interface LinkButtonsProps {
  liveUrl: string;
  githubUrl: string;
  large?: boolean;
}

const LinkButtons: React.FC<LinkButtonsProps> = ({ liveUrl, githubUrl, large = false }) => (
  <div className="flex gap-2">
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center gap-1.5 font-semibold rounded-full border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500 hover:border-orange-500 hover:text-white text-orange-400 transition-all duration-300 ${
        large ? "px-5 py-2.5 text-sm" : "px-3 py-1.5 text-xs"
      }`}
    >
      <ExternalLinkIcon /> Live Demo
    </a>
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center gap-1.5 font-semibold rounded-full border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500 hover:border-orange-500 hover:text-white text-orange-400 transition-all duration-300 ${
        large ? "px-5 py-2.5 text-sm" : "px-3 py-1.5 text-xs"
      }`}
    >
      <GithubIcon /> GitHub
    </a>
  </div>
);

// ─── ProjectCard Props Interface ────────────────────────────────────────────────
interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => onSelect(project.id)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#1F1A17] border border-[#2C241E] flex flex-col justify-between h-[380px]"
      whileHover={{ y: -6, borderColor: "#f59e0b", boxShadow: "0 15px 35px rgba(245, 158, 11, 0.2)" }}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
    >
      {/* Screenshots area */}
      <motion.div
        className="p-4 pb-2"
        animate={{ filter: hovered ? "brightness(0.7)" : "brightness(1)" }}
        transition={{ duration: 0.2 }}
      >
        <ScreenshotGallery
          screenshots={project.screenshots}
          expanded={false}
          accentColor="#f59e0b"
        />
      </motion.div>

      {/* "Read More" oval button — appears on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              className="pointer-events-auto px-7 py-3 rounded-full text-sm font-bold text-white shadow-2xl"
              style={{ background: "#f59e0b", boxShadow: "0 8px 32px rgba(245, 158, 11, 0.4)" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.05, 0.98, 1],   // bounce keyframes
                opacity: 1,
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Read More
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card footer */}
      <div className="p-4 pt-0 flex flex-col justify-end flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full text-orange-300 font-mono"
              style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.15)" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-white font-bold text-base leading-tight mb-1">{project.title}</h3>
        <p className="text-gray-400 text-xs mt-0.5 mb-4 line-clamp-1">{project.tagline}</p>
        <LinkButtons liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
      </div>
    </motion.div>
  );
};

// ─── ExpandedCard Props Interface ─────────────────────────────────────────────
interface ExpandedCardProps {
  project: ProjectItem;
  onClose: () => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({ project, onClose }) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const isInsideContent = useRef(false);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isInsideContent.current) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: true });

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleWheel]);

  // Touch-based scroll-to-shrink (for mobile)
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isInsideContent.current && touchStartY.current !== null) {
      const delta = Math.abs(e.touches[0].clientY - touchStartY.current);
      if (delta > 30) onClose(); // 30px drag threshold
    }
  };

  return (
    <>
      {/* Backdrop — click it to close */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Expanded card — shares layoutId with ProjectCard */}
      <motion.div
        layoutId={`card-${project.id}`}
        className="fixed z-50 rounded-2xl overflow-hidden border border-[#2C241E]"
        style={{
          top: "6vh",
          left: "50%",
          x: "-50%",
          width: "min(720px, 92vw)",
          maxHeight: "88vh",
          background: `linear-gradient(160deg, #1F1A17, #161412)`,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 32 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-orange-500/10 hover:bg-orange-500 border border-orange-500/20 text-orange-400 hover:text-white transition-colors"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          aria-label="Close"
        >
          <CloseIcon />
        </motion.button>

        {/* Scroll hint badge */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs text-orange-500/40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Scroll outside to close ↕
        </motion.div>

        {/* Scrollable content div */}
        <div
          ref={scrollableRef}
          className="overflow-y-auto"
          style={{ maxHeight: "88vh" }}
          onMouseEnter={() => { isInsideContent.current = true; }}
          onMouseLeave={() => { isInsideContent.current = false; }}
        >
          {/* Header */}
          <motion.div
            className="p-7 pb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex flex-wrap gap-1 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full text-orange-300 font-semibold"
                  style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.15)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-white font-bold text-3xl leading-tight">{project.title}</h2>
            <p className="text-gray-400 text-sm mt-1 mb-4">{project.tagline}</p>
            <LinkButtons liveUrl={project.liveUrl} githubUrl={project.githubUrl} large />
          </motion.div>

          {/* Description */}
          <motion.div
            className="px-7 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="rounded-xl p-4 text-gray-300 text-sm leading-relaxed border border-orange-500/10"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              {project.description}
            </div>
          </motion.div>

          {/* Screenshots (enlarged, scrollable) */}
          <div className="px-7 pb-8">
            <motion.p
              className="text-orange-500/40 text-xs font-semibold uppercase tracking-widest mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Screenshots
            </motion.p>
            <ScreenshotGallery
              screenshots={project.screenshots}
              expanded={true}
              accentColor="#f59e0b"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ─── ProjectGrid Props Interface ────────────────────────────────────────────────
interface ProjectGridProps {
  projects: ProjectItem[];
  onSelect: (id: string) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map((project, i) => (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: i * 0.05, type: "spring", stiffness: 250, damping: 26 }}
      >
        <ProjectCard project={project} onSelect={onSelect} />
      </motion.div>
    ))}
  </div>
);

// ─── Projects (Root) ───────────────────────────────────────────────────────────
const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = PROJECTS.find((p) => p.id === selectedId) ?? null;

  return (
    <motion.section id="projects" layout className="relative overflow-hidden min-h-screen px-4 py-20 font-sans">
      
      {/* Red diagonal stripes background */}
      <RedDiagonalBackground />

      {/* Section header */}
      <motion.div
        className="relative max-w-5xl mx-auto mb-16 text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500 mb-3 block">
          Selected Work
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
          Projects I've Built
        </h1>
        <p className="text-gray-600 mt-4 text-base max-w-lg mx-auto font-light">
          Click any card to explore detailed insights — hover to preview.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="relative max-w-7xl mx-auto z-10">
        <ProjectGrid projects={PROJECTS} onSelect={setSelectedId} />
      </div>

      {/* Expanded card overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ExpandedCard
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Projects;
