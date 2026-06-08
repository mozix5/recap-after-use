import { useState } from "react";
import { motion } from "framer-motion";
import icebergImg from "@/assets/iceberg.png";

interface ProjectIcebergProps {
  className?: string;
}

const belowStats = [
  { side: "left" as const, label: "40+ personal repositories", top: "62%" },
  { side: "left" as const, label: "System configs & CI pipelines", top: "76%" },
  { side: "right" as const, label: "API backends & databases", top: "58%" },
  { side: "right" as const, label: "Scripts & local toolkits", top: "73%" },
];

export const ProjectIceberg = ({ className = "" }: ProjectIcebergProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
        className="relative w-full max-w-lg mx-auto"
        style={{ cursor: "crosshair" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {belowStats.map((stat, i) => (
          <motion.div
            key={i}
            className="absolute hidden xl:flex items-center gap-2"
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
            transition={{ duration: 0.3, delay: i * 0.07 }}
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

        <motion.div
          animate={{
            y: [0, -7, 0],
            transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <motion.img
            src={icebergImg}
            alt="Iceberg showing visible tip above water and large hidden mass below"
            className="w-full select-none"
            style={{
              filter: isHovered
                ? "drop-shadow(0 0 28px rgba(201,168,76,0.4)) drop-shadow(0 0 8px rgba(201,168,76,0.25))"
                : "drop-shadow(0 10px 36px rgba(0,0,0,0.55)) brightness(0.85) saturate(0.65)",
              transition: "filter 0.5s ease",
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable={false}
          />
        </motion.div>

        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: "40%" }}
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
        className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] px-6 py-3"
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
