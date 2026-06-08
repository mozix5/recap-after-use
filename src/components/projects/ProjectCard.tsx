import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { ProjectCardCarousel } from "./ProjectCardCarousel";
import { TagList } from "@/components/ui/tag-list";

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  color: string;
  liveUrl: string;
  sourceUrl: string;
  index: number;
};

const accents: Record<string, { border: string; text: string; bg: string }> = {
  gold:  { border: "var(--gold)", text: "var(--gold)", bg: "var(--gold-muted)" },
  white: { border: "var(--fg-muted)", text: "var(--fg)", bg: "rgba(240,237,230,0.05)" },
  dim:   { border: "var(--fg-dim)", text: "var(--fg-muted)", bg: "rgba(240,237,230,0.03)" },
};

const ProjectCard = ({
  title,
  description,
  techStack,
  images,
  color,
  liveUrl,
  sourceUrl,
  index,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    const obs = new IntersectionObserver(
      ([e]) => setIsInView(e.isIntersecting),
      { threshold: 0.15 }
    );
    if (el) obs.observe(el);
    return () => {
      if (el) obs.unobserve(el);
    };
  }, []);

  const a = accents[color] ?? accents.white;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <div
        className={`absolute ${isEven ? "-left-2 -top-8" : "-right-2 -top-8"} font-bebas leading-none select-none pointer-events-none z-20`}
        style={{ fontSize: "7rem", color: "var(--fg-dim)", opacity: 0.45 }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <motion.div
        className={`relative ${isEven ? "ml-8" : "mr-8"} overflow-hidden z-10`}
        style={{ border: "1px solid var(--rule)", background: "var(--bg-surface)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ borderColor: a.border }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="h-[2px] w-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          style={{ transformOrigin: "left", background: `linear-gradient(to right, ${a.border}, transparent)` }}
          transition={{ duration: 0.35 }}
        />

        <ProjectCardCarousel
          images={images}
          title={title}
          isHovered={isHovered}
          borderColor={a.border}
        />

        <div className="px-5 py-4 border-t flex items-center gap-4 flex-wrap" style={{ borderColor: "var(--rule)" }}>
          <h2 className="font-bebas text-2xl leading-none shrink-0" style={{ color: "var(--fg)" }}>
            {title}
          </h2>

          <div className="hidden sm:block h-4 w-px shrink-0" style={{ background: "var(--rule-light)" }} />

          <p className="font-lora text-xs leading-snug flex-1 min-w-0 hidden md:block" style={{ color: "var(--fg-muted)" }}>
            {description.split(".")[0].trim()}.
          </p>

          <TagList tags={techStack} limit={4} size="sm" className="hidden lg:flex shrink-0" />

          <div className="flex items-center gap-2 ml-auto shrink-0">
            <Magnetic>
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
                style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.text }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = a.border;
                  e.currentTarget.style.color = "var(--bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = a.bg;
                  e.currentTarget.style.color = a.text;
                }}
              >
                Preview <ArrowUpRight className="h-3 w-3" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
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
                <FaGithub className="h-3 w-3" /> Source
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
