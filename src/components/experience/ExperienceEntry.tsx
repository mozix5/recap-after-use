import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timeline } from "@/data/content";
import { ExperienceCard } from "./ExperienceCard";

interface ExperienceEntryProps {
  item: (typeof timeline)[0];
  index: number;
}

export const ExperienceEntry = ({ item, index }: ExperienceEntryProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = item.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-[1fr_auto_1fr] gap-0 items-start transform-gpu will-change-transform"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* ── Left cell ── */}
      <div className={`pb-16 ${isEven ? "pr-10" : ""}`}>
        {isEven && (
          <motion.div
            className="text-right transform-gpu will-change-transform"
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: index * 0.1 + 0.1 }}
          >
            <ExperienceCard item={item} inView={inView} delay={index * 0.1} />
          </motion.div>
        )}
      </div>

      {/* ── Centre: timeline axis ── */}
      <div className="flex flex-col items-center" style={{ width: 48 }}>
        {/* Icon node */}
        <motion.div
          className="relative z-10 flex h-10 w-10 items-center justify-center shrink-0"
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            background: "var(--bg)",
          }}
          initial={{ 
            scale: 0, 
            borderColor: "var(--rule-light)",
            boxShadow: "0 0 0px rgba(212, 175, 55, 0)"
          }}
          animate={inView ? { 
            scale: 1,
            borderColor: "var(--gold)",
            boxShadow: "0 0 16px 2px rgba(212, 175, 55, 0.2)"
          } : {}}
          transition={{
            type: "spring",
            stiffness: 200,
            delay: index * 0.1 + 0.05,
          }}
          whileHover={{ borderColor: "var(--gold)" }}
        >
          <Icon 
            className="h-4 w-4 transition-colors duration-500" 
            style={{ color: inView ? "var(--gold)" : "var(--fg-dim)" }} 
          />
          {/* Gold dot on active (first) */}
          {index === 0 && (
            <span
              className="absolute -top-1 -right-1 h-2 w-2 animate-pulse"
              style={{ background: "var(--gold)" }}
            />
          )}
        </motion.div>
      </div>

      {/* ── Right cell ── */}
      <div className={`pb-16 ${!isEven ? "pl-10" : ""}`}>
        {!isEven && (
          <motion.div
            className="transform-gpu will-change-transform"
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: index * 0.1 + 0.1 }}
          >
            <ExperienceCard item={item} inView={inView} delay={index * 0.1} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
