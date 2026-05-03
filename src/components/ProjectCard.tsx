import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string; description: string; role: string; timeline: string;
  status: string; techStack: string[]; image: string;
  color: string; highlights: string[]; metrics: string[];
  liveUrl: string; sourceUrl: string; index: number;
};

// Editorial accent per card — only gold or white/dim
const accents: Record<string, { border: string; text: string; bg: string }> = {
  gold:  { border: "var(--gold)", text: "var(--gold)", bg: "var(--gold-muted)" },
  white: { border: "var(--fg-muted)", text: "var(--fg)", bg: "rgba(240,237,230,0.05)" },
  dim:   { border: "var(--fg-dim)", text: "var(--fg-muted)", bg: "rgba(240,237,230,0.03)" },
};

const ProjectCard = ({ title, description, role, timeline, status, techStack, image, color, highlights, metrics, liveUrl, sourceUrl, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0.3 });
    if (cardRef.current) obs.observe(cardRef.current);
    return () => { if (cardRef.current) obs.unobserve(cardRef.current); };
  }, []);

  const a = accents[color] ?? accents.white;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
    >
      {/* Index number */}
      <div
        className={`absolute ${isEven ? "-left-4 -top-6" : "-right-4 -top-6"} font-bebas leading-none select-none`}
        style={{ fontSize: "5rem", color: "var(--rule-light)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <motion.div
        className={`relative ${isEven ? "ml-8" : "mr-8"} overflow-hidden`}
        style={{ border: "1px solid var(--rule)", background: "var(--bg-surface)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ borderColor: a.border }}
        transition={{ duration: 0.2 }}
      >
        {/* Gold top accent on hover */}
        <motion.div
          className="h-[2px] w-full"
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ 
            transformOrigin: "left", 
            background: `linear-gradient(to right, ${a.border}, transparent)`, 
            height: "2px" 
          }}
          transition={{ duration: 0.35 }}
        />

        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--rule)" }}>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--fg-dim)" }}>
            <span style={{ color: a.text }}>◆</span>
            CASE_{String(index + 1).padStart(2, "0")}
          </div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
            <span style={{ color: "var(--fg-muted)" }}>{status}</span>
            <span style={{ color: "var(--fg-dim)" }}>/</span>
            <span style={{ color: "var(--fg-dim)" }}>{timeline}</span>
          </div>
        </div>

        {/* Body */}
        <div className={`grid gap-0 lg:grid-cols-[0.95fr_1.05fr] ${isEven ? "" : "lg:[&>*:first-child]:order-2"}`}>
          {/* Text side */}
          <div className="p-6 sm:p-8">
            <h2 className="font-bebas text-4xl sm:text-5xl leading-tight mb-3" style={{ color: "var(--fg)" }}>
              {title}
            </h2>
            <div className="h-px w-16 mb-5" style={{ background: `linear-gradient(to right, ${a.border}, transparent)` }} />

            {/* Role + metric pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[role, metrics[0]].map((label) => (
                <span key={label} className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1" style={{ border: `1px solid var(--rule-light)`, color: "var(--fg-muted)" }}>
                  {label}
                </span>
              ))}
            </div>

            <p className="font-lora text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              {description}
            </p>

            {/* Highlights */}
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] mb-3" style={{ color: "var(--fg-dim)" }}>What built</p>
            <ul className="space-y-2 mb-6">
              {highlights.slice(0, 2).map((h) => (
                <li key={h} className="flex gap-3 font-lora text-sm items-start" style={{ color: "var(--fg-muted)" }}>
                  <span className="mt-2 h-1 w-4 shrink-0" style={{ background: a.border }} />
                  {h}
                </li>
              ))}
            </ul>

            {/* Tech */}
            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((t) => (
                <span key={t} className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1" style={{ border: "1px solid var(--rule)", color: "var(--fg-dim)" }}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={liveUrl} target="_blank" rel="noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all"
                style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.text }}
                onMouseEnter={(e) => { e.currentTarget.style.background = a.border; e.currentTarget.style.color = "var(--bg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = a.bg; e.currentTarget.style.color = a.text; }}
              >
                Live Preview <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={sourceUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all"
                style={{ border: "1px solid var(--rule-light)", color: "var(--fg-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--fg-muted)"; e.currentTarget.style.color = "var(--fg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule-light)"; e.currentTarget.style.color = "var(--fg-muted)"; }}
              >
                <Github className="h-3.5 w-3.5" /> Source
              </a>
            </div>
          </div>

          {/* Image side */}
          <div className="relative p-4 border-t lg:border-t-0 lg:border-l" style={{ borderColor: "var(--rule)" }}>
            <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "var(--bg)" }}>
              <img
                src={image} alt={title}
                className="h-full w-full object-cover transition-all duration-500"
                style={{
                  filter: isHovered ? "brightness(0.9) contrast(1.05) saturate(0.8)" : "brightness(0.7) contrast(1.05) saturate(0.5)",
                  transform: isHovered ? "scale(1.03)" : "scale(1)",
                }}
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, var(--bg-surface) 0%, transparent 50%), linear-gradient(160deg, ${a.border}18 0%, transparent 45%)` }} />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                {metrics.map((m) => (
                  <span key={m} className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5" style={{ background: "rgba(8,8,8,0.7)", color: "var(--fg-dim)", border: "1px solid var(--rule)" }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
