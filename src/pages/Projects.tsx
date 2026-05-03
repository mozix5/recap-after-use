import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectNavigation from "@/components/ProjectNavigation";
import bodyPreview from "@/assets/body.png";
import mePreview from "@/assets/me3.png";
import turboTextPreview from "@/assets/turboText.png";
import { motion } from "framer-motion";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animationFrame = 0;
    const updateActive = () => {
      const mid = window.innerHeight / 2;
      let closest = 0, minDist = Infinity;
      projectRefs.current.forEach((el, i) => {
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2 - mid);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveProject((c) => c === closest ? c : closest);
    };
    const schedule = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => { animationFrame = 0; updateActive(); });
    };
    updateActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); if (animationFrame) window.cancelAnimationFrame(animationFrame); };
  }, []);

  const projects = [
    {
      title: "turboText",
      description: "A focused writing interface built to make drafting, editing, and reviewing text feel fast instead of noisy.",
      role: "Frontend build, interaction design",
      timeline: "2025",
      status: "Live",
      techStack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      image: turboTextPreview,
      color: "gold",
      highlights: [
        "Built a responsive dashboard-style layout with clear writing actions.",
        "Designed hover states and visual feedback for a more tactile workflow.",
        "Structured reusable UI pieces so the interface can grow into more editor tools.",
      ],
      metrics: ["Responsive UI", "Motion polish", "Reusable components"],
      liveUrl: "https://portfolyo-amber.vercel.app/",
      sourceUrl: "https://github.com/mozix5",
    },
    {
      title: "Portfolio System",
      description: "A personal portfolio experience with scroll-led animation, themed sections, and a memorable visual identity.",
      role: "Creative direction, frontend engineering",
      timeline: "2026",
      status: "In progress",
      techStack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      image: bodyPreview,
      color: "white",
      highlights: [
        "Created a cinematic hero with a pen split animation tied to scroll progress.",
        "Added section navigation, project tracking, and responsive content layouts.",
        "Balanced decorative motion with readable project, skills, and contact sections.",
      ],
      metrics: ["Scroll animation", "Responsive sections", "Portfolio storytelling"],
      liveUrl: "https://portfolyo-amber.vercel.app/",
      sourceUrl: "https://github.com/mozix5",
    },
    {
      title: "Developer Profile",
      description: "A characterful profile section that presents background, stack, and creative direction through an editorial interface.",
      role: "UI design, component implementation",
      timeline: "2026",
      status: "Shipped",
      techStack: ["React", "Canvas", "Tailwind", "CSS Animation"],
      image: mePreview,
      color: "dim",
      highlights: [
        "Built a distinctive editorial layout that avoids a generic about section.",
        "Used animated states to make skills and mission details feel interactive.",
        "Kept the section modular so future experience and resume content can plug in.",
      ],
      metrics: ["Visual identity", "Interactive panels", "Personal brand"],
      liveUrl: "https://portfolyo-amber.vercel.app/",
      sourceUrl: "https://github.com/mozix5",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen px-4 sm:px-8 lg:px-16 xl:px-[120px]" style={{ background: "var(--bg)" }}>

      {/* ── Editorial Header ── */}
      <header className="pt-32 pb-20 border-b" style={{ borderColor: "var(--rule)" }}>
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.45em] mb-6"
          style={{ color: "var(--fg-dim)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Issue 02 · Selected Work
        </motion.p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.h1
            className="font-bebas leading-none tracking-tight"
            style={{ fontSize: "clamp(5rem,14vw,10rem)", color: "var(--fg)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Case
            <br />
            <span style={{ WebkitTextStroke: "1px var(--fg)", color: "transparent" }}>Studies</span>
          </motion.h1>

          <motion.p
            className="font-lora text-base max-w-xs leading-relaxed lg:mb-4"
            style={{ color: "var(--fg-muted)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A curated selection of work — from interactive interfaces to
            scroll-driven experiences built with intention.
          </motion.p>
        </div>
      </header>

      {/* ── Project list + nav ── */}
      <div className="relative flex">
        <ProjectNavigation projects={projects} activeProject={activeProject} />

        <div className="container mx-auto space-y-40 px-6 pt-[100vh]">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { projectRefs.current[index] = el; }}
            >
              <ProjectCard {...project} index={index} />
            </div>
          ))}
          <div className="h-screen" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default Projects;
