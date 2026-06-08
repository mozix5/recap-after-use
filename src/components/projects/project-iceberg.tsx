import { useState } from "react";
import { motion } from "framer-motion";

interface ProjectIcebergProps {
  className?: string;
}

const stats = [
  { side: "left", top: "38%", label: "40+ personal repositories", icon: "◆" },
  { side: "left", top: "56%", label: "System configs & pipelines", icon: "◆" },
  { side: "right", top: "44%", label: "API backends & databases", icon: "◆" },
  { side: "right", top: "62%", label: "Scripts & toolkits", icon: "◆" },
];

export const ProjectIceberg = ({ className = "" }: ProjectIcebergProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative w-full flex flex-col items-center py-24 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.45em] mb-12"
        style={{ color: "var(--fg-dim)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Selected case studies · Tip of the iceberg
      </motion.p>

      <div
        className="relative w-full max-w-2xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: "crosshair" }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="absolute hidden xl:flex items-center gap-2"
            style={{
              top: stat.top,
              ...(stat.side === "left" ? { left: "-200px" } : { right: "-200px" }),
              flexDirection: stat.side === "left" ? "row-reverse" : "row",
            }}
            initial={{ opacity: 0, x: stat.side === "left" ? 16 : -16 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: stat.side === "left" ? 16 : -16 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
          >
            <span className="font-mono text-[8px]" style={{ color: "var(--gold)", opacity: 0.7 }}>
              {stat.icon}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] whitespace-nowrap" style={{ color: "var(--fg-dim)" }}>
              {stat.label}
            </span>
          </motion.div>
        ))}

        <svg
          viewBox="0 0 600 560"
          className="w-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="iceAboveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0ddd6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#b8b5af" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="iceBelowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id="iceBelowHoverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.32" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a2a3a" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#080808" stopOpacity="0" />
            </linearGradient>
            <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="belowWaterClip">
              <rect x="0" y="200" width="600" height="360" />
            </clipPath>
          </defs>

          {/* ─── Water surface glow layer ─── */}
          <rect x="0" y="195" width="600" height="80" fill="url(#waterGrad)" opacity={0.5} />

          {/* ─── Underwater body ─── */}
          <motion.polygon
            points="220,200 380,200 480,240 530,300 510,370 460,420 380,460 300,475 220,465 145,430 90,375 70,305 100,240"
            fill={isHovered ? "url(#iceBelowHoverGrad)" : "url(#iceBelowGrad)"}
            stroke={isHovered ? "#c9a84c" : "#2a2a2a"}
            strokeWidth={isHovered ? "1.5" : "1"}
            filter={isHovered ? "url(#glowGold)" : undefined}
            animate={{
              stroke: isHovered ? "#c9a84c" : "#2a2a2a",
              strokeWidth: isHovered ? 1.5 : 1,
            }}
            transition={{ duration: 0.45 }}
          />

          {/* ─── Underwater facet lines (internal crystalline structure) ─── */}
          {[
            ["300,475", "220,200"],
            ["300,475", "380,200"],
            ["300,475", "530,300"],
            ["300,475", "70,305"],
            ["300,475", "510,370"],
            ["300,475", "90,375"],
          ].map(([from, to], i) => (
            <motion.line
              key={i}
              x1={from.split(",")[0]} y1={from.split(",")[1]}
              x2={to.split(",")[0]} y2={to.split(",")[1]}
              stroke="#c9a84c"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              animate={{ opacity: isHovered ? 0.35 : 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            />
          ))}

          {/* ─── Glowing pulse ring on hover ─── */}
          {isHovered && (
            <motion.ellipse
              cx="300" cy="340"
              rx="180" ry="130"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="1"
              initial={{ opacity: 0.4, rx: 180, ry: 130 }}
              animate={{ opacity: [0.4, 0.1, 0.4], rx: [180, 195, 180], ry: [130, 143, 130] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* ─── Water surface ripple lines ─── */}
          {[0, 12, 24].map((offset, i) => (
            <motion.path
              key={i}
              d={`M ${60 - offset} 200 Q 150 ${196 - i * 2} 300 200 Q 450 ${204 + i * 2} ${540 + offset} 200`}
              fill="none"
              stroke="#2a2a2a"
              strokeWidth="1"
              opacity={0.6 - i * 0.15}
            />
          ))}

          {/* ─── Waterline label ─── */}
          <motion.text
            x="48"
            y="196"
            fontFamily="'Roboto Mono', monospace"
            fontSize="8"
            letterSpacing="0.35em"
            fill="#2a2a2a"
            animate={{ opacity: isHovered ? 0.8 : 0.35 }}
            transition={{ duration: 0.3 }}
          >
            WATERLINE
          </motion.text>

          {/* ─── Above-water peak ─── */}
          <motion.polygon
            points="300,22 355,78 400,62 430,100 420,150 440,130 460,170 370,200 230,200 150,165 175,130 140,150 170,100 210,65 250,80"
            fill="url(#iceAboveGrad)"
            stroke={isHovered ? "#b8b5af" : "#2a2a2a"}
            strokeWidth="1"
            strokeLinejoin="round"
            animate={{ stroke: isHovered ? "#b8b5af" : "#2a2a2a" }}
            transition={{ duration: 0.3 }}
          />

          {/* ─── Peak internal facets ─── */}
          {[
            ["300,22", "230,200"],
            ["300,22", "370,200"],
            ["300,22", "400,62"],
            ["300,22", "210,65"],
          ].map(([from, to], i) => (
            <line
              key={i}
              x1={from.split(",")[0]} y1={from.split(",")[1]}
              x2={to.split(",")[0]} y2={to.split(",")[1]}
              stroke="#3a3a36"
              strokeWidth="0.6"
              strokeDasharray="3 10"
              opacity={0.5}
            />
          ))}

          {/* ─── Tip glow on hover ─── */}
          {isHovered && (
            <motion.polygon
              points="300,22 355,78 400,62 430,100 420,150 440,130 460,170 370,200 230,200 150,165 175,130 140,150 170,100 210,65 250,80"
              fill="none"
              stroke="#e0ddd6"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* ─── Depth indicator on right side ─── */}
          <motion.line
            x1="545" y1="200"
            x2="545" y2="475"
            stroke="#2a2a2a"
            strokeWidth="1"
            strokeDasharray="2 6"
            animate={{ opacity: isHovered ? 0.7 : 0.2 }}
            transition={{ duration: 0.35 }}
          />
          <motion.text
            x="555"
            y="340"
            fontFamily="'Roboto Mono', monospace"
            fontSize="8"
            letterSpacing="0.3em"
            fill="#2a2a2a"
            transform="rotate(90, 555, 340)"
            animate={{ opacity: isHovered ? 0.7 : 0.2 }}
            transition={{ duration: 0.35 }}
          >
            ~90% HIDDEN
          </motion.text>
          <motion.line x1="540" y1="200" x2="550" y2="200" stroke="#2a2a2a" strokeWidth="1" animate={{ opacity: isHovered ? 0.7 : 0.2 }} transition={{ duration: 0.35 }} />
          <motion.line x1="540" y1="475" x2="550" y2="475" stroke="#2a2a2a" strokeWidth="1" animate={{ opacity: isHovered ? 0.7 : 0.2 }} transition={{ duration: 0.35 }} />
        </svg>
      </div>

      <motion.a
        href="https://github.com/mozix5"
        target="_blank"
        rel="noreferrer"
        className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] px-6 py-3 transition-all duration-300"
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
