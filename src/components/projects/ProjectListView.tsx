import { useState, useRef, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { ProjectListRow, ProjectItem } from "./ProjectListRow";
import { ProjectHoverPreview } from "./ProjectHoverPreview";

type ProjectListViewProps = {
  projects: ProjectItem[];
};

export const ProjectListView = ({ projects }: ProjectListViewProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isRightSide, setIsRightSide] = useState(false);
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
    setIsRightSide(cx > window.innerWidth / 2);
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
        {projects.map((project, index) => (
          <ProjectListRow
            key={project.title}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            project={project}
            index={index}
            isHovered={hoveredIndex === index}
          />
        ))}
      </div>

      <ProjectHoverPreview
        hoveredIndex={hoveredIndex}
        projects={projects}
        floatX={floatX}
        floatY={floatY}
        direction={direction}
        isRightSide={isRightSide}
      />
    </div>
  );
};
