import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectNavigation from "@/components/ProjectNavigation";
import { projects } from "@/data/content";
import { motion } from "framer-motion";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animationFrame = 0;
    const updateActive = () => {
      const mid = window.innerHeight / 2;
      let closest = 0,
        minDist = Infinity;
      projectRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - mid);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveProject((c) => (c === closest ? c : closest));
    };
    const schedule = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateActive();
      });
    };
    updateActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);



  return (
    <div
      ref={containerRef}
      className="min-h-screen px-4 sm:px-8 lg:px-16 xl:px-[190px]"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Editorial Header ── */}
      <header
        className="pt-32 pb-20 border-b"
        style={{ borderColor: "var(--rule)" }}
      >
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
            <span
              style={{
                WebkitTextStroke: "1px var(--fg)",
                color: "transparent",
              }}
            >
              Studies
            </span>
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
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
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
