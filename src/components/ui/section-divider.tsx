import { motion } from "framer-motion";

interface SectionDividerProps {
  text: string;
  delay?: number;
  className?: string;
}

export const SectionDivider = ({
  text,
  delay = 0.2,
  className = "pt-12",
}: SectionDividerProps) => {
  return (
    <motion.div
      className={`flex items-center gap-4 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div
        className="h-px flex-1"
        style={{ background: "var(--rule-light)" }}
      />
      <span
        className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--fg-dim)] hover:text-[var(--gold)] hover:drop-shadow-[0_0_8px_var(--gold)] transition-all duration-500 cursor-default"
      >
        {text}
      </span>
      <span style={{ color: "var(--gold)", fontSize: 8 }}>◆</span>
      <div
        className="h-px flex-1"
        style={{ background: "var(--rule-light)" }}
      />
    </motion.div>
  );
};
