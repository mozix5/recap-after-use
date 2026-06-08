import { motion } from "framer-motion";
import { timeline } from "@/data/content";
import { TagList } from "@/components/ui/tag-list";

interface ExperienceCardProps {
  item: (typeof timeline)[0];
  inView: boolean;
  delay: number;
}

export const ExperienceCard = ({ item, inView, delay }: ExperienceCardProps) => {
  return (
    <div
      className="relative text-left group"
      style={{
        border: "1px solid var(--rule)",
        background: "var(--bg-surface)",
        padding: "1.5rem",
      }}
    >
      {/* Gold top bar on hover */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
        style={{
          background: "linear-gradient(to right, var(--gold), transparent)",
        }}
      />

      {/* Issue + period */}
      <div className="flex items-baseline gap-3 mb-4">
        <span
          className="font-bebas leading-none"
          style={{
            fontSize: "3.5rem",
            color: "var(--rule-light)",
            lineHeight: 1,
          }}
        >
          {item.period}
        </span>
        <div className="flex flex-col">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "var(--fg-dim)" }}
          >
            Issue {item.issue}
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.3em] mt-0.5"
            style={{ color: "var(--gold)", opacity: 0.7 }}
          >
            {item.label}
          </span>
        </div>
      </div>

      {/* Rule */}
      <div className="h-px mb-4" style={{ background: "var(--rule-light)" }} />

      {/* Title */}
      <motion.h3
        className="font-bebas text-2xl sm:text-3xl mb-3 transform-gpu will-change-transform"
        style={{ color: "var(--fg)" }}
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
      >
        {item.title}
      </motion.h3>

      <p
        className="font-lora text-sm leading-relaxed mb-4"
        style={{ color: "var(--fg-muted)" }}
      >
        {item.description}
      </p>

      {/* Points */}
      <TagList tags={item.points} />
    </div>
  );
};
