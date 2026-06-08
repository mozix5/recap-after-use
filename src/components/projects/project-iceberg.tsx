import { useState } from "react";
import { motion } from "framer-motion";
import icebergImg from "@/assets/iceberg.png";

interface ProjectIcebergProps {
  className?: string;
}

const aboveStats = [
  { label: "Featured case studies" },
  { label: "What you see here" },
];

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
              ...(stat.side === "left" ? { left: "-215px" } : { right: "-215px" }),
              flexDirection: stat.side === "left" ? "row-reverse" : "row",
            }}
            initial={{ opacity: 0, x: stat.side === "left" ? 12 : -12 }}
            animate={
              isHovered
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: stat.side === "left" ? 12 : -12 }
            }
            transition={{ duration: 0.3, delay: i * 0.07 }}
          >
            <span className="font-mono text-[8px]" style={{ color: "var(--gold)", opacity: 0.7 }}>
              ◆
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.3em] whitespace-nowrap"
              style={{ color: "var(--fg-dim)" }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}

        <motion.div
          className="relative"
          animate={{ y: isHovered ? -6 : 0 }}
          transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <motion.img
            src={icebergImg}
            alt="Iceberg diagram showing the visible tip and the hidden mass below water"
            className="w-full select-none"
            style={{
              filter: isHovered
                ? "drop-shadow(0 0 24px rgba(201,168,76,0.35)) drop-shadow(0 0 8px rgba(201,168,76,0.2))"
                : "drop-shadow(0 8px 32px rgba(0,0,0,0.5)) brightness(0.82) saturate(0.7)",
              transition: "filter 0.5s ease",
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable={false}
          />

          {aboveStats.map((stat, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 font-mono text-[9px] uppercase tracking-[0.35em] whitespace-nowrap"
              style={{
                top: `${16 + i * 10}%`,
                transform: "translateX(-50%)",
                color: "var(--fg-dim)",
              }}
              animate={{ opacity: isHovered ? 0.5 : 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {stat.label}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="absolute left-0 right-0"
          style={{ top: "40.5%", pointerEvents: "none" }}
          animate={{ opacity: isHovered ? 1 : 0.35 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="w-full h-px"
            style={{ background: "linear-gradient(to right, transparent, var(--gold), transparent)" }}
          />
          <p
            className="font-mono text-[8px] uppercase tracking-[0.45em] text-center mt-2"
            style={{ color: "var(--gold)", opacity: 0.6 }}
          >
            Waterline
          </p>
        </motion.div>

        <motion.div
          className="absolute font-mono text-[8px] uppercase tracking-[0.3em] whitespace-nowrap"
          style={{
            right: "-8px",
            top: "44%",
            bottom: "4%",
            display: "flex",
            alignItems: "center",
            writingMode: "vertical-rl",
            color: "var(--fg-dim)",
            opacity: 0,
          }}
          animate={{ opacity: isHovered ? 0.45 : 0 }}
          transition={{ duration: 0.4 }}
        >
          ~90% hidden
        </motion.div>
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
