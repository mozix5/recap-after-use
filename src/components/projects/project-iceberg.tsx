import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import icebergImg from "@/assets/iceberg2.png";

interface ProjectIcebergProps {
  className?: string;
}

const WATERLINE_TOP = "22%";

const belowStats = [
  { side: "left" as const, label: "40+ personal repositories", top: "50%" },
  { side: "left" as const, label: "System configs & CI pipelines", top: "66%" },
  { side: "right" as const, label: "API backends & databases", top: "44%" },
  { side: "right" as const, label: "Scripts & local toolkits", top: "60%" },
];

export const ProjectIceberg = ({ className = "" }: ProjectIcebergProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values (centered at 0.5)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for rotation (stiffer for the tip above water, softer for the submerged base)
  const tipRotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { damping: 25, stiffness: 120 });
  const tipRotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { damping: 25, stiffness: 120 });

  const baseRotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { damping: 35, stiffness: 80 });
  const baseRotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { damping: 35, stiffness: 80 });

  // Translation offset for water drag/parallax depth effect
  const baseParallaxX = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { damping: 30, stiffness: 90 });
  const baseParallaxY = useSpring(useTransform(mouseY, [0, 1], [-8, 12]), { damping: 30, stiffness: 90 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      className={`relative w-full flex flex-col items-center py-20 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.45em] mb-14"
        style={{ color: "var(--fg-dim)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Selected case studies · Tip of the iceberg
      </motion.p>

      <div
        className="relative w-full max-w-lg mx-auto aspect-[431/548]"
        style={{ cursor: "crosshair", perspective: "1000px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow behind the submerged base */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: "80%",
            height: "70%",
            top: "25%",
            background: "radial-gradient(circle, rgba(201, 168, 76, 0.15) 0%, transparent 70%)",
            filter: "blur(30px)",
            zIndex: 0,
            x: baseParallaxX,
            y: baseParallaxY,
          }}
          animate={{
            opacity: isHovered ? 1 : 0.2,
            scale: isHovered ? 1.05 : 0.95,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* BELOW WATER: Submerged Base */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none origin-center"
          style={{
            clipPath: "inset(22% 0 0 0)",
            rotateX: baseRotateX,
            rotateY: baseRotateY,
            x: baseParallaxX,
            y: baseParallaxY,
            transformStyle: "preserve-3d",
          }}
          animate={
            isHovered
              ? {
                  scale: 1.025,
                }
              : {
                  scale: 1,
                }
          }
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {/* Internal floating sway animation */}
          <motion.div
            className="w-full h-full"
            animate={{
              y: isHovered ? [0, 4, 0] : [0, -4, 0],
              x: isHovered ? [0, -1, 1, 0] : [-2, 2, -2],
            }}
            transition={{
              duration: isHovered ? 6 : 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.img
              src={icebergImg}
              alt="Submerged base of the iceberg"
              className="w-full h-full object-cover select-none"
              style={{
                filter: isHovered
                  ? "brightness(0.95) saturate(0.85) drop-shadow(0 0 12px rgba(201,168,76,0.25))"
                  : "brightness(0.78) saturate(0.6) opacity(0.85)",
                transition: "filter 0.5s ease",
              }}
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* ABOVE WATER: Tip */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none origin-center"
          style={{
            clipPath: "inset(0 0 78% 0)",
            rotateX: tipRotateX,
            rotateY: tipRotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.img
            src={icebergImg}
            alt="Visible tip of the iceberg"
            className="w-full h-full object-cover select-none"
            style={{
              filter: isHovered
                ? "brightness(1) saturate(1)"
                : "brightness(0.85) saturate(0.7)",
              transition: "filter 0.5s ease",
            }}
            draggable={false}
          />
        </motion.div>

        {/* Stat Labels */}
        {belowStats.map((stat, i) => (
          <motion.div
            key={i}
            className="absolute hidden xl:flex items-center gap-2 z-30"
            style={{
              top: stat.top,
              ...(stat.side === "left" ? { left: "-210px" } : { right: "-210px" }),
              flexDirection: stat.side === "left" ? "row-reverse" : "row",
            }}
            initial={{ opacity: 0, x: stat.side === "left" ? 10 : -10 }}
            animate={
              isHovered
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: stat.side === "left" ? 10 : -10 }
            }
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            <span
              className="font-mono text-[8px]"
              style={{ color: "var(--gold)", opacity: 0.75 }}
            >
              ◆
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.25em] whitespace-nowrap px-2 py-0.5"
              style={{
                color: "var(--fg)",
                background: "var(--bg-surface)",
                border: "1px solid var(--rule-light)",
                letterSpacing: "0.2em",
              }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}

        {/* Waterline & 90% Hidden Indicators */}
        <div
          className="absolute left-0 right-0 pointer-events-none z-30"
          style={{ top: WATERLINE_TOP }}
        >
          <motion.div
            className="w-full h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
            animate={{ opacity: isHovered ? 0.9 : 0.4 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="flex justify-between items-center mt-2 px-1"
            animate={{ opacity: isHovered ? 1 : 0.45 }}
            transition={{ duration: 0.4 }}
          >
            <p
              className="font-mono text-[8px] uppercase tracking-[0.5em]"
              style={{
                color: "var(--gold)",
                background: "var(--bg-base)",
                padding: "1px 6px",
              }}
            >
              Waterline
            </p>
            <p
              className="font-mono text-[8px] uppercase tracking-[0.4em]"
              style={{
                color: "var(--fg-dim)",
                background: "var(--bg-base)",
                padding: "1px 6px",
              }}
            >
              ~90% hidden
            </p>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="https://github.com/mozix5"
        target="_blank"
        rel="noreferrer"
        className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] px-6 py-3 z-30"
        style={{ border: "1px solid var(--rule-light)", color: "var(--fg-dim)" }}
        whileHover={{ borderColor: "var(--gold)", color: "var(--gold)" }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <span>Explore the depths</span>
        <span style={{ color: "var(--gold)", fontSize: 8 }}>◆</span>
        <span>GitHub</span>
      </motion.a>
    </motion.div>
  );
};
