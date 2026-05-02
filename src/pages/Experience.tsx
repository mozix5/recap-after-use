import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Briefcase, Code2, GraduationCap, Rocket } from "lucide-react";
import { useRef } from "react";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const timeline = [
  {
    period: "2026",
    title: "Portfolio Experience",
    label: "Currently Building",
    icon: Rocket,
    description:
      "Designing a motion-rich portfolio with scroll animation, case-study cards, responsive sections, and a strong personal identity.",
    points: ["Framer Motion scroll systems", "Responsive React layouts"],
    flowerColor: "#67e8f9", // cyan-300
    petalColor: "#22d3ee",
    stemColor: "#06b6d4",
    leafColor: "#065f46",
  },
  {
    period: "2025",
    title: "Frontend Projects",
    label: "React / TypeScript",
    icon: Code2,
    description:
      "Built interactive interfaces focused on component structure, visual polish, hover states, and clean user flows.",
    points: ["Reusable UI components", "Tailwind interface systems"],
    flowerColor: "#fcd34d", // amber-300
    petalColor: "#f59e0b",
    stemColor: "#d97706",
    leafColor: "#064e3b",
  },
  {
    period: "2024",
    title: "Full-Stack Foundations",
    label: "Learning Track",
    icon: Briefcase,
    description:
      "Expanded from frontend into backend fundamentals, API thinking, database basics, and deployable web apps.",
    points: ["Node.js and MongoDB basics", "GitHub and Vercel workflow"],
    flowerColor: "#6ee7b7", // emerald-300
    petalColor: "#10b981",
    stemColor: "#059669",
    leafColor: "#052e16",
  },
  {
    period: "∞",
    title: "CS Growth",
    label: "Education",
    icon: GraduationCap,
    description:
      "Continuing to sharpen programming fundamentals, product thinking, and the craft of building memorable web experiences.",
    points: ["Problem solving", "UI engineering taste"],
    flowerColor: "#fda4af", // rose-300
    petalColor: "#f43f5e",
    stemColor: "#e11d48",
    leafColor: "#4a044e",
  },
];

/* ─────────────────────────────────────────
   SVG Petal — a single teardrop petal
───────────────────────────────────────── */
function Petal({
  angle,
  color,
  delay,
  inView,
  size = 28,
}: {
  angle: number;
  color: string;
  delay: number;
  inView: boolean;
  size?: number;
}) {
  return (
    <motion.g
      transform={`rotate(${angle})`}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={inView ? { scaleY: 1, opacity: 0.9 } : { scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ transformOrigin: "center" }}
    >
      <ellipse
        cx={0}
        cy={-size}
        rx={size * 0.42}
        ry={size * 0.7}
        fill={color}
        opacity={0.85}
        style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
      />
    </motion.g>
  );
}

/* ─────────────────────────────────────────
   SVG Flower — 6 petals in a ring
───────────────────────────────────────── */
function Flower({
  color,
  inView,
  baseDelay,
  size,
}: {
  color: string;
  inView: boolean;
  baseDelay: number;
  size?: number;
}) {
  const count = 6;
  return (
    <svg
      width={(size ?? 28) * 2.6}
      height={(size ?? 28) * 2.6}
      viewBox="-40 -40 80 80"
      overflow="visible"
      style={{ display: "block" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Petal
          key={i}
          angle={(360 / count) * i}
          color={color}
          delay={baseDelay + i * 0.07}
          inView={inView}
          size={size ?? 28}
        />
      ))}
      {/* Centre pistil */}
      <motion.circle
        cx={0}
        cy={0}
        r={8}
        fill="#fff8"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: baseDelay + 0.5, duration: 0.3, ease: "backOut" }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────
   SVG Leaf — a pointed ellipse on a stem
───────────────────────────────────────── */
function Leaf({
  flip,
  inView,
  delay,
  yOffset,
}: {
  flip: boolean;
  inView: boolean;
  delay: number;
  yOffset: number;
}) {
  const dir = flip ? -1 : 1;
  return (
    <motion.g
      transform={`translate(0, ${yOffset})`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ transformOrigin: "center" }}
    >
      {/* twig */}
      <line
        x1={0}
        y1={0}
        x2={dir * 22}
        y2={-10}
        stroke="#4ade80"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.6}
      />
      {/* leaf body */}
      <ellipse
        cx={dir * 28}
        cy={-14}
        rx={14}
        ry={7}
        fill="#16a34a"
        opacity={0.8}
        transform={`rotate(${dir * -18}, ${dir * 28}, -14)`}
        style={{ filter: "drop-shadow(0 0 4px #16a34a66)" }}
      />
    </motion.g>
  );
}

/* ─────────────────────────────────────────
   Experience Entry Card — blooms open
───────────────────────────────────────── */
function EntryCard({
  item,
  index,
  side,
}: {
  item: (typeof timeline)[0];
  index: number;
  side: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-0 ${
        side === "left" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* ── Branch line ── */}
      <motion.div
        className="h-[2px] w-12 sm:w-20"
        style={{ background: `linear-gradient(to ${side === "left" ? "left" : "right"}, transparent, ${item.stemColor}88)` }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
        style={{
          transformOrigin: side === "left" ? "right" : "left",
          background: `linear-gradient(to ${side === "left" ? "left" : "right"}, transparent, ${item.stemColor}88)`,
        }}
      />

      {/* ── Bloom node (flower) ── */}
      <motion.div
        className="relative shrink-0"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.35, delay: index * 0.15 + 0.35, ease: "backOut" }}
      >
        <Flower
          color={item.flowerColor}
          inView={inView}
          baseDelay={index * 0.15 + 0.4}
          size={22}
        />
        {/* Icon in centre */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: item.flowerColor }}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* ── Card (petal-shaped) ── */}
      <motion.div
        className={`relative max-w-xs sm:max-w-sm lg:max-w-md rounded-2xl border bg-[#05090f]/90 backdrop-blur-md p-5 sm:p-6 ${
          side === "left" ? "mr-3 sm:mr-5" : "ml-3 sm:ml-5"
        }`}
        style={{ borderColor: `${item.flowerColor}30` }}
        initial={{
          opacity: 0,
          x: side === "left" ? 40 : -40,
          scale: 0.92,
        }}
        animate={
          inView
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: side === "left" ? 40 : -40, scale: 0.92 }
        }
        transition={{ duration: 0.55, delay: index * 0.15 + 0.25, ease: [0.34, 1.2, 0.64, 1] }}
        whileHover={{
          scale: 1.025,
          boxShadow: `0 0 28px ${item.flowerColor}22`,
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute inset-x-0 top-0 h-[1.5px] rounded-t-2xl"
          style={{
            background: `linear-gradient(to right, transparent, ${item.flowerColor}88, transparent)`,
          }}
        />

        {/* Period badge */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="font-mono text-xs uppercase tracking-widest rounded-full px-3 py-1 border"
            style={{
              color: item.flowerColor,
              borderColor: `${item.flowerColor}40`,
              background: `${item.flowerColor}12`,
            }}
          >
            {item.period}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            {item.label}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
          {item.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2">
          {item.points.map((pt) => (
            <span
              key={pt}
              className="text-xs rounded-full px-2.5 py-1 border"
              style={{
                color: `${item.flowerColor}cc`,
                borderColor: `${item.flowerColor}25`,
                background: `${item.flowerColor}0d`,
              }}
            >
              {pt}
            </span>
          ))}
        </div>

        {/* Animated petal-glow on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0"
          style={{ background: `radial-gradient(circle at 50% 0%, ${item.flowerColor}18 0%, transparent 70%)` }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Section
───────────────────────────────────────── */
const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stemRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Subtle ambient glow that pulses with scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 0]);

  // Vine SVG dimensions (drawn in a tall viewBox)
  const VINE_H = 900;
  const VINE_W = 12;

  // Curved sinusoidal stem path
  const stemPath = `M6 ${VINE_H} C6 ${VINE_H * 0.75} 2 ${VINE_H * 0.7} 6 ${VINE_H * 0.5} C10 ${VINE_H * 0.35} 2 ${VINE_H * 0.2} 6 0`;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-4 py-28 text-white sm:px-8 lg:px-12"
    >
      {/* ── Ambient bokeh circles ── */}
      {[
        { x: "15%", y: "20%", r: 220, c: "#06b6d422" },
        { x: "85%", y: "50%", r: 180, c: "#10b98118" },
        { x: "50%", y: "85%", r: 200, c: "#f43f5e14" },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.r * 2,
            height: b.r * 2,
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`,
            opacity: glowOpacity,
          }}
        />
      ))}

      {/* ── Soil / root texture at bottom ── */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0a0f06]/80 to-transparent" />

      <div className="relative mx-auto max-w-5xl">
        {/* ══ Header ══ */}
        <div className="mb-20 text-center">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.35em] text-green-400/60 mb-4"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Growth Log
          </motion.p>
          <motion.h2
            className="text-5xl sm:text-7xl font-black uppercase leading-none tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            Exper
            <span className="text-green-400/30">ience</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-gray-500 text-base max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            A living vine — each branch a chapter, each bloom a milestone in my
            journey as a developer.
          </motion.p>

          {/* Decorative small flower under heading */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.25, ease: "backOut" }}
          >
            <svg width="60" height="30" viewBox="-30 -15 60 30" overflow="visible">
              {Array.from({ length: 5 }).map((_, i) => (
                <Petal
                  key={i}
                  angle={(360 / 5) * i}
                  color="#4ade80"
                  delay={0.3 + i * 0.05}
                  inView={true}
                  size={14}
                />
              ))}
              <circle cx={0} cy={0} r={4} fill="#fff6" />
            </svg>
          </motion.div>
        </div>

        {/* ══ Vine + Entries ══ */}
        <div className="relative flex">
          {/* ── Growing Vine (centred) ── */}
          <div className="relative mx-auto" style={{ width: VINE_W }}>
            <svg
              width={VINE_W}
              height={VINE_H}
              viewBox={`0 0 ${VINE_W} ${VINE_H}`}
              className="absolute inset-0"
              overflow="visible"
            >
              {/* Static faint vine guide */}
              <path
                d={stemPath}
                fill="none"
                stroke="#1a3a1a"
                strokeWidth={3}
                strokeLinecap="round"
              />

              {/* Scroll-driven live vine */}
              <motion.path
                ref={stemRef}
                d={stemPath}
                fill="none"
                stroke="url(#vineGrad)"
                strokeWidth={3}
                strokeLinecap="round"
                pathLength={1}
                style={{ pathLength }}
              />

              {/* Vine gradient */}
              <defs>
                <linearGradient id="vineGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#052e16" />
                  <stop offset="30%" stopColor="#16a34a" />
                  <stop offset="60%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#86efac" />
                </linearGradient>
              </defs>

              {/* ── Decorative leaves dotted along stem ── */}
              {[150, 320, 500, 650, 820].map((y, i) => (
                <Leaf
                  key={i}
                  flip={i % 2 === 0}
                  inView={true}
                  delay={0.1 + i * 0.15}
                  yOffset={VINE_H - y}
                />
              ))}
            </svg>
          </div>

          {/* ── Entry cards positioned absolutely beside the vine ── */}
          <div
            className="absolute inset-0"
            style={{ pointerEvents: "none" }}
          >
            {timeline.map((item, index) => {
              // Spread entries evenly along vine height
              const top = (index / (timeline.length - 1)) * (VINE_H - 120) + 40;
              const side: "left" | "right" = index % 2 === 0 ? "right" : "left";

              return (
                <div
                  key={item.title}
                  className="absolute"
                  style={{
                    top,
                    left: side === "right" ? "50%" : undefined,
                    right: side === "left" ? "50%" : undefined,
                    transform: "translateY(-50%)",
                    pointerEvents: "auto",
                  }}
                >
                  <EntryCard item={item} index={index} side={side} />
                </div>
              );
            })}
          </div>

          {/* Spacer so the section is tall enough for the vine */}
          <div style={{ height: VINE_H, width: VINE_W, visibility: "hidden" }} />
        </div>

        {/* ══ Root / footer ══ */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/20">
            <span className="h-px w-12 bg-green-800/60" />
            <span>Still growing</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="h-px w-12 bg-green-800/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
