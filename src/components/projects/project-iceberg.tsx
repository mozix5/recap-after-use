import { useState } from "react";
import { motion } from "framer-motion";

interface ProjectIcebergProps {
  className?: string;
}

const ABOVE_POINTS = "250,10 350,90 430,70 480,120 20,120 70,90 130,30";
const BELOW_POINTS = "20,120 480,120 500,220 440,300 380,360 300,420 240,430 160,420 80,350 30,280";
const BELOW_DEEP_POINTS = "80,350 30,280 500,220 440,300 380,360 300,420 240,430 160,420";

const stats = [
  { side: "left", top: "30%", label: "40+ personal repositories", icon: "⬡" },
  { side: "left", top: "58%", label: "System configs & pipelines", icon: "⬡" },
  { side: "right", top: "38%", label: "API backends & relational databases", icon: "⬡" },
  { side: "right", top: "62%", label: "Scripts & local command toolkits", icon: "⬡" },
];

export const ProjectIceberg = ({ className = "" }: ProjectIcebergProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative w-full flex flex-col items-center py-24 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.45em] mb-10"
        style={{ color: "var(--fg-dim)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Selected case studies · Tip of the iceberg
      </motion.p>

      <div
        className="relative w-full max-w-xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="absolute hidden lg:flex items-center gap-2"
            style={{
              top: stat.top,
              [stat.side]: stat.side === "left" ? "-220px" : "-230px",
              flexDirection: stat.side === "left" ? "row-reverse" : "row",
            }}
            initial={{ opacity: 0, x: stat.side === "left" ? 20 : -20 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: stat.side === "left" ? 20 : -20 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-widest whitespace-nowrap"
              style={{ color: "var(--gold)" }}
            >
              {stat.icon}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.3em] whitespace-nowrap"
              style={{ color: "var(--fg-dim)" }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}

        <svg
          viewBox="0 0 500 440"
          className="w-full cursor-pointer"
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id="glow-gold">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-soft">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.polygon
            points={BELOW_DEEP_POINTS}
            fill="var(--gold-dim)"
            stroke="none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          <motion.polygon
            points={BELOW_POINTS}
            fill="transparent"
            stroke={isHovered ? "var(--gold)" : "var(--rule-light)"}
            strokeWidth={isHovered ? "1.5" : "1"}
            filter={isHovered ? "url(#glow-gold)" : "none"}
            animate={{
              stroke: isHovered ? "var(--gold)" : "var(--rule-light)",
              strokeWidth: isHovered ? 1.5 : 1,
            }}
            transition={{ duration: 0.4 }}
          />

          {isHovered && (
            <motion.polygon
              points={BELOW_POINTS}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="0.5"
              opacity={0.3}
              initial={{ scale: 1 }}
              animate={{ scale: 1.015, opacity: [0.3, 0.15, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "250px 280px" }}
            />
          )}

          <line
            x1="0"
            y1="120"
            x2="500"
            y2="120"
            stroke="var(--rule-light)"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity={0.6}
          />

          <motion.polygon
            points={ABOVE_POINTS}
            fill="var(--bg-surface)"
            stroke={isHovered ? "var(--fg-muted)" : "var(--rule-light)"}
            strokeWidth="1"
            animate={{ stroke: isHovered ? "var(--fg-muted)" : "var(--rule-light)" }}
            transition={{ duration: 0.3 }}
          />

          <motion.text
            x="250"
            y="138"
            textAnchor="middle"
            fontFamily="'Roboto Mono', monospace"
            fontSize="9"
            letterSpacing="0.4em"
            fill="var(--fg-dim)"
            animate={{ opacity: isHovered ? 0.4 : 0.2 }}
            transition={{ duration: 0.3 }}
          >
            WATERLINE
          </motion.text>
        </svg>
      </div>

      <motion.a
        href="https://github.com/mozix5"
        target="_blank"
        rel="noreferrer"
        className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] px-6 py-3 transition-all duration-300"
        style={{
          border: "1px solid var(--rule-light)",
          color: "var(--fg-dim)",
        }}
        whileHover={{
          borderColor: "var(--gold)",
          color: "var(--gold)",
        }}
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
