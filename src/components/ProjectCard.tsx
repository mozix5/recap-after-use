import { useState, useRef, useEffect, type MouseEvent } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type ProjectCardProps = {
  title: string; description: string;
  techStack: string[]; images: string[];
  color: string;
  liveUrl: string; sourceUrl: string; index: number;
};

const accents: Record<string, { border: string; text: string; bg: string }> = {
  gold:  { border: "var(--gold)", text: "var(--gold)", bg: "var(--gold-muted)" },
  white: { border: "var(--fg-muted)", text: "var(--fg)", bg: "rgba(240,237,230,0.05)" },
  dim:   { border: "var(--fg-dim)", text: "var(--fg-muted)", bg: "rgba(240,237,230,0.03)" },
};

const ProjectCard = ({
  title, description, techStack, images,
  color, liveUrl, sourceUrl, index,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    const obs = new IntersectionObserver(
      ([e]) => setIsInView(e.isIntersecting),
      { threshold: 0.15 }
    );
    if (el) obs.observe(el);
    return () => { if (el) obs.unobserve(el); };
  }, []);

  const go = (delta: number, e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(delta);
    setCurrentImgIndex((p) => (p + delta + images.length) % images.length);
  };

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

        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentImgIndex}
              src={images[currentImgIndex]}
              alt={`${title} screenshot ${currentImgIndex + 1}`}
              custom={direction}
              initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? "100%" : "-100%", opacity: 0 }}
              transition={{ x: { type: "spring", stiffness: 280, damping: 28 }, opacity: { duration: 0.18 } }}
              className="absolute inset-0 w-full h-full select-none"
              style={{
                objectFit: "cover",
                objectPosition: "top",
                filter: isHovered ? "brightness(1) saturate(1)" : "brightness(0.88) saturate(0.75)",
                transition: "filter 0.4s ease",
              }}
              draggable={false}
            />
          </AnimatePresence>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.6) 100%), linear-gradient(160deg, ${a.border}08 0%, transparent 40%)` }}
          />

          {images.length > 1 && (
            <div
              className="absolute top-3 right-3 font-mono text-[10px] tracking-widest px-2 py-1 z-20"
              style={{ background: "rgba(8,8,8,0.75)", color: "var(--fg-dim)", border: "1px solid var(--rule)" }}
            >
              {currentImgIndex + 1} / {images.length}
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => go(-1, e)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full border backdrop-blur-sm transition-all duration-300 z-20"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  background: "rgba(8,8,8,0.6)",
                  color: "rgba(240,237,230,0.8)",
                  opacity: isHovered ? 1 : 0,
                  transform: `translateY(-50%) scale(${isHovered ? 1 : 0.75})`,
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={(e) => go(1, e)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full border backdrop-blur-sm transition-all duration-300 z-20"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  background: "rgba(8,8,8,0.6)",
                  color: "rgba(240,237,230,0.8)",
                  opacity: isHovered ? 1 : 0,
                  transform: `translateY(-50%) scale(${isHovered ? 1 : 0.75})`,
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 py-1.5 px-3 rounded-full border"
                style={{
                  background: "rgba(8,8,8,0.65)",
                  borderColor: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(8px)",
                  opacity: isHovered ? 1 : 0.75,
                  transition: "opacity 0.3s",
                }}
              >
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDirection(i > currentImgIndex ? 1 : -1);
                      setCurrentImgIndex(i);
                    }}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === currentImgIndex ? 18 : 5,
                      background: i === currentImgIndex ? a.border : "rgba(240,237,230,0.2)",
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="px-5 py-4 border-t flex items-center gap-4 flex-wrap" style={{ borderColor: "var(--rule)" }}>
          <h2 className="font-bebas text-2xl leading-none shrink-0" style={{ color: "var(--fg)" }}>
            {title}
          </h2>

          <div className="hidden sm:block h-4 w-px shrink-0" style={{ background: "var(--rule-light)" }} />

          <p className="font-lora text-xs leading-snug flex-1 min-w-0 hidden md:block" style={{ color: "var(--fg-muted)" }}>
            {description.split(".")[0].trim()}.
          </p>

          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            {techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5"
                style={{ border: "1px solid var(--rule)", color: "var(--fg-dim)" }}
              >
                {t}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="font-mono text-[9px]" style={{ color: "var(--fg-dim)" }}>
                +{techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto shrink-0">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
              style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.text }}
              onMouseEnter={(e) => { e.currentTarget.style.background = a.border; e.currentTarget.style.color = "var(--bg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = a.bg; e.currentTarget.style.color = a.text; }}
            >
              Preview <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
              style={{ border: "1px solid var(--rule-light)", color: "var(--fg-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--fg-muted)"; e.currentTarget.style.color = "var(--fg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule-light)"; e.currentTarget.style.color = "var(--fg-muted)"; }}
            >
              <FaGithub className="h-3 w-3" /> Source
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
