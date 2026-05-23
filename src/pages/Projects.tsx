import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectNavigation from "@/components/ProjectNavigation";
import { projects } from "@/data/content";
import { motion } from "framer-motion";
import { TextWipe } from "@/components/ui/text-wipe";
import { ProjectListView } from "@/components/ProjectListView";
import { Magnetic } from "@/components/ui/magnetic";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
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
          <h1
            className="font-bebas leading-none tracking-tight flex-1"
            style={{ fontSize: "clamp(5rem,14vw,10rem)", color: "var(--fg)" }}
          >
            <TextWipe delay={0.1}>
              <span>Case</span>
            </TextWipe>
            <TextWipe delay={0.25}>
              <span
                style={{
                  WebkitTextStroke: "1px var(--fg)",
                  color: "transparent",
                }}
              >
                Studies
              </span>
            </TextWipe>
          </h1>

          <div className="flex flex-col gap-4 max-w-xs lg:mb-4">
            <motion.p
              className="font-lora text-base leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A curated selection of work — from interactive interfaces to
              scroll-driven experiences built with intention.
            </motion.p>

            <motion.div
              className="flex items-center gap-1.5 self-start pt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Magnetic>
                <button
                  onClick={() => setViewMode("cards")}
                  className="font-mono text-[9px] uppercase tracking-[0.25em] px-3 py-1.5 transition-all duration-200"
                  style={{
                    border: "1px solid var(--rule-light)",
                    background: viewMode === "cards" ? "var(--fg)" : "transparent",
                    color: viewMode === "cards" ? "var(--bg)" : "var(--fg-muted)",
                  }}
                >
                  Cards
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => setViewMode("list")}
                  className="font-mono text-[9px] uppercase tracking-[0.25em] px-3 py-1.5 transition-all duration-200"
                  style={{
                    border: "1px solid var(--rule-light)",
                    background: viewMode === "list" ? "var(--fg)" : "transparent",
                    color: viewMode === "list" ? "var(--bg)" : "var(--fg-muted)",
                  }}
                >
                  List
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </header>

      {viewMode === "cards" ? (
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
      ) : (
        <ProjectListView projects={projects} />
      )}
    </div>
  );
};

export default Projects;
