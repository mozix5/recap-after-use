import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { ProjectItem } from "./ProjectListRow";

interface ProjectHoverPreviewProps {
  hoveredIndex: number | null;
  projects: ProjectItem[];
  floatX: MotionValue<number>;
  floatY: MotionValue<number>;
  direction: number;
  isRightSide: boolean;
}

export const ProjectHoverPreview = ({
  hoveredIndex,
  projects,
  floatX,
  floatY,
  direction,
  isRightSide,
}: ProjectHoverPreviewProps) => {
  return (
    <AnimatePresence>
      {hoveredIndex !== null && (
        <motion.div
          className="pointer-events-none"
          style={{
            position: "fixed",
            left: floatX,
            top: floatY,
            y: -95,
            pointerEvents: "none",
            zIndex: 40,
          }}
          initial={{ opacity: 0, scale: 0.92, x: isRightSide ? -540 : 200 }}
          animate={{ opacity: 1, scale: 1, x: isRightSide ? -540 : 200 }}
          exit={{ opacity: 0, scale: 0.92, x: isRightSide ? -540 : 200 }}
          transition={{
            x: { type: "spring", stiffness: 200, damping: 25 },
            opacity: { duration: 0.18, ease: "easeOut" },
            scale: { duration: 0.18, ease: "easeOut" }
          }}
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
  );
};
