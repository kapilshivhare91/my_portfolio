export interface JourneyMilestone {
    hour: number;
    title: string;
    subtitle: string;
    description: string;
    detailContent: string;
    icon: string;
    image: string;
    color: string;
}

export const journeyMilestones: JourneyMilestone[] = [
    {
        hour: 0,
        title: "The Beginning",
        subtitle: "Age 10–12 · The Spark",
        description:
            "Where it all started — a curious kid who couldn't stop asking 'how does this work?' Discovered the magic of computers and the thrill of making things happen on screen.",
        detailContent:
            "Every journey has an origin. Mine started at the age of 10 when I first sat in front of a computer screen. The blinking cursor felt like an invitation — a portal to a world I didn't yet understand but desperately wanted to explore. I remember typing my first lines, breaking things, fixing them, and feeling an electric rush each time something worked. Those early experiments with HTML pages, simple scripts, and endless curiosity planted a seed that would grow into a lifelong passion. The world of technology wasn't just interesting — it felt like home.",
        icon: "🌱",
        image: "/journey_beginning.png",
        color: "#CD7F32",
    },
    {
        hour: 3,
        title: "JEE Journey",
        subtitle: "The Crucible · Discipline & Grit",
        description:
            "The most intense chapter — years of relentless preparation for one of India's toughest exams. Physics, Chemistry, Mathematics, and sleepless nights forged mental resilience.",
        detailContent:
            "The JEE journey was a defining chapter. It wasn't just about cracking an exam — it was a masterclass in discipline, time management, and pushing beyond self-imposed limits. Waking up at 5 AM, solving hundreds of problems daily, and learning to embrace failure as a stepping stone. Every incorrect answer was a lesson. Every mock test was a mirror reflecting my progress. The experience taught me that talent is overrated — consistency and relentless effort are the real differentiators. These years shaped my problem-solving mindset and gave me the mental framework that I carry into every engineering challenge today.",
        icon: "🔥",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop&q=80",
        color: "#B87333",
    },
    {
        hour: 6,
        title: "College Journey",
        subtitle: "Deep Dive · Growth & Exploration",
        description:
            "University opened doors to real engineering — DSA, system design, hackathons, and building a network of brilliant minds. The theoretical became practical.",
        detailContent:
            "College was the breeding ground for transformation. From competitive programming marathons to late-night hackathons, every experience accelerated my growth. I dove deep into Data Structures & Algorithms, explored System Design patterns, and fell in love with full-stack development. But it wasn't just about code — it was about collaboration. Brainstorming sessions at 2 AM, peer code reviews, and building projects that pushed the boundaries of what I thought was possible. I learned that great software isn't built alone — it's crafted by teams who challenge and inspire each other. These years refined my craft and lit the fire for building products that matter.",
        icon: "🎓",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&h=400&fit=crop&q=80",
        color: "#C9956B",
    },
    {
        hour: 9,
        title: "Projects & Internship",
        subtitle: "Real World · Building & Shipping",
        description:
            "Theory meets practice — shipping production code, solving real problems, collaborating with teams, and turning ideas into products that users actually rely on.",
        detailContent:
            "This is where everything converged. Internships threw me into the deep end of production systems — real users, real deadlines, real consequences. I learned to write code that doesn't just work — it scales, it's maintainable, and it solves actual problems. From building full-stack applications to optimizing database queries, from deploying microservices to collaborating in agile sprints — every day was a new lesson. My personal projects became testbeds for experimentation: pushing new frameworks, exploring AI integrations, and crafting pixel-perfect interfaces. This phase taught me the ultimate lesson: shipping is a superpower. The best code in the world means nothing if it never reaches users.",
        icon: "🚀",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&q=80",
        color: "#D4A574",
    },
];
