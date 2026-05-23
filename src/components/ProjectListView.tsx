import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Magnetic } from "@/components/ui/magnetic";

type ProjectItem = {
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  color: string;
  liveUrl: string;
  sourceUrl: string;
};

type ProjectListViewProps = {
  projects: ProjectItem[];
};

export const ProjectListView = ({ projects }: ProjectListViewProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const floatX = useSpring(mouseX, springConfig);
  const floatY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div 
      className="py-12 relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="flex flex-col border-t" style={{ borderColor: "var(--rule-light)" }}>
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index;
          const formattedIndex = String(index + 1).padStart(2, "0");

          return (
            <div
              key={project.title}
              className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-b transition-colors duration-300 group"
              style={{ borderColor: "var(--rule-light)" }}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <div className="flex items-center gap-6">
                <span 
                  className="font-bebas text-2xl md:text-3xl transition-colors duration-300"
                  style={{ color: isHovered ? "var(--gold)" : "var(--fg-dim)" }}
                >
                  {formattedIndex}
                </span>
                <h3 
                  className="font-bebas text-3xl md:text-5xl uppercase tracking-wider transition-colors duration-300"
                  style={{ color: isHovered ? "var(--fg)" : "var(--fg-muted)" }}
                >
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-col gap-2 max-w-md md:px-4">
                <p 
                  className="font-lora text-xs leading-relaxed transition-colors duration-300"
                  style={{ color: isHovered ? "var(--fg)" : "var(--fg-dim)" }}
                >
                  {project.description.split(".")[0].trim()}.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5"
                      style={{ 
                        border: "1px solid var(--rule)", 
                        color: isHovered ? "var(--gold)" : "var(--fg-dim)",
                        borderColor: isHovered ? "var(--gold-muted)" : "var(--rule-light)",
                        transition: "all 0.3s"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 md:ml-4 z-10">
                <Magnetic>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
                    style={{ 
                      background: "rgba(240,237,230,0.05)", 
                      border: "1px solid var(--rule-light)", 
                      color: "var(--fg)" 
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.background = "var(--gold)"; 
                      e.currentTarget.style.color = "var(--bg)";
                      e.currentTarget.style.borderColor = "var(--gold)";
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.background = "rgba(240,237,230,0.05)"; 
                      e.currentTarget.style.color = "var(--fg)";
                      e.currentTarget.style.borderColor = "var(--rule-light)";
                    }}
                  >
                    Preview <ArrowUpRight className="h-3 w-3" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
                    style={{ border: "1px solid var(--rule-light)", color: "var(--fg-muted)" }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.borderColor = "var(--fg-muted)"; 
                      e.currentTarget.style.color = "var(--fg)"; 
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.borderColor = "var(--rule-light)"; 
                      e.currentTarget.style.color = "var(--fg-muted)"; 
                    }}
                  >
                    <FaGithub className="h-3 w-3" /> Source
                  </a>
                </Magnetic>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            style={{
              position: "fixed",
              left: floatX,
              top: floatY,
              x: 25,
              y: -85,
              pointerEvents: "none",
              zIndex: 40,
            }}
            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className="w-[280px] h-[158px] overflow-hidden shadow-2xl p-1"
              style={{
                border: "1px solid var(--gold)",
                background: "var(--bg-surface)",
              }}
            >
              <img
                src={projects[hoveredIndex].images[0]}
                alt={projects[hoveredIndex].title}
                className="w-full h-full object-cover grayscale-[20%] contrast-[1.05]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
