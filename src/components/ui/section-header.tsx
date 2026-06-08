import { ReactNode } from "react";
import { motion } from "framer-motion";
import { TextWipe } from "@/components/ui/text-wipe";

interface SectionHeaderProps {
  issueNumber: string;
  issueTitle: string;
  titlePrimary: string;
  titleStroked: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  showLongDivider?: boolean;
  showShortDivider?: boolean;
}

export const SectionHeader = ({
  issueNumber,
  issueTitle,
  titlePrimary,
  titleStroked,
  description,
  className = "",
  children,
  showLongDivider = false,
  showShortDivider = false,
}: SectionHeaderProps) => {
  return (
    <div className={className}>
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.45em] mb-6"
        style={{ color: "var(--fg-dim)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Issue {issueNumber} · {issueTitle}
      </motion.p>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <h2
          className="font-bebas leading-none tracking-tight flex-1"
          style={{ fontSize: "clamp(4.5rem,13vw,9rem)", color: "var(--fg)" }}
        >
          <TextWipe delay={0.1}>
            <span>{titlePrimary}</span>
          </TextWipe>
          <TextWipe delay={0.25}>
            <span
              style={{
                WebkitTextStroke: "1px var(--fg)",
                color: "transparent",
              }}
            >
              {titleStroked}
            </span>
          </TextWipe>
        </h2>

        {description && (
          <div className="flex flex-col gap-4 max-w-xs lg:mb-4">
            <motion.p
              className="font-lora text-base leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {description}
            </motion.p>
            {children}
          </div>
        )}
      </div>

      {showLongDivider && (
        <motion.div
          className="mt-8 transform-gpu will-change-transform"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            transformOrigin: "left",
            background:
              "linear-gradient(to right, var(--gold), var(--rule-light) 40%, transparent)",
            height: "1px",
            marginTop: "2rem",
          }}
        />
      )}

      {showShortDivider && (
        <div
          className="h-px w-24 mt-4"
          style={{
            background: "linear-gradient(to right, var(--gold), transparent)",
          }}
        />
      )}
    </div>
  );
};
