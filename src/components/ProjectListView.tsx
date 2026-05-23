import { useState, useRef, useEffect } from "react";
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
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const prevIndexRef = useRef<number | null>(null);
  const [direction, setDirection] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const floatX = useSpring(mouseX, springConfig);
  const floatY = useSpring(mouseY, springConfig);

  const hitTest = (_cx: number, cy: number) => {
    let found: number | null = null;
    for (let i = 0; i < rowRefs.current.length; i++) {
      const el = rowRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (cy >= rect.top && cy <= rect.bottom) {
        found = i;
        break;
      }
    }
    if (found !== prevIndexRef.current) {
      const prev = prevIndexRef.current;
      if (prev !== null && found !== null) {
        setDirection(found > prev ? 1 : -1);
      } else {
        setDirection(0);
      }
      prevIndexRef.current = found;
      setHoveredIndex(found);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (lastPos.current) {
        hitTest(lastPos.current.x, lastPos.current.y);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const cx = e.clientX;
    const cy = e.clientY;
    lastPos.current = { x: cx, y: cy };
    mouseX.set(cx);
    mouseY.set(cy);
    hitTest(cx, cy);
  };

  const handleMouseLeave = () => {
    lastPos.current = null;
    setHoveredIndex(null);
  };

  return (
    <div
      className="py-12 relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col border-t" style={{ borderColor: "var(--rule-light)" }}>
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index;
          const formattedIndex = String(index + 1).padStart(2, "0");

          return (
            <div
              key={project.title}
              ref={(el) => { rowRefs.current[index] = el; }}
              className="relative flex flex-col md:flex-row md:items-center justify-between gap-8 py-14 border-b transition-colors duration-300 group"
              style={{ borderColor: "var(--rule-light)" }}
            >
              <div className="flex items-center gap-8">
                <span
                  className="font-bebas text-3xl md:text-4xl transition-colors duration-300"
                  style={{ color: isHovered ? "var(--gold)" : "var(--fg-dim)" }}
                >
                  {formattedIndex}
                </span>
                <h3
                  className="font-bebas text-4xl md:text-6xl uppercase tracking-wider transition-colors duration-300"
                  style={{ color: isHovered ? "var(--fg)" : "var(--fg-muted)" }}
                >
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-col gap-2.5 max-w-xl md:px-6">
                <p
                  className="font-lora text-[13px] leading-relaxed transition-colors duration-300"
                  style={{ color: isHovered ? "var(--fg)" : "var(--fg-dim)" }}
                >
                  {project.description.split(".")[0].trim()}.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1"
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

              <div className="flex items-center gap-3 shrink-0 md:ml-6 z-10">
                <Magnetic>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200"
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
                    Preview <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200"
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
                    <FaGithub className="h-3.5 w-3.5" /> Source
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
            className="pointer-events-none"
            style={{
              position: "fixed",
              left: floatX,
              top: floatY,
              x: 200,
              y: -95,
              pointerEvents: "none",
              zIndex: 40,
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div
              className="w-[340px] h-[190px] overflow-hidden shadow-2xl p-1 pointer-events-none relative"
              style={{
                border: "1px solid var(--gold)",
                background: "var(--bg-surface)",
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                  key={hoveredIndex}
                  custom={direction}
                  src={projects[hoveredIndex].images[0]}
                  alt={projects[hoveredIndex].title}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-[1.05] pointer-events-none"
                  initial={{ y: direction === 0 ? 0 : direction > 0 ? "100%" : "-100%", opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction === 0 ? 0 : direction > 0 ? "-100%" : "100%", opacity: 0.4 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
