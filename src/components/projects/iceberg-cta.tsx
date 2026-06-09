import { motion, MotionValue } from "framer-motion";

interface IcebergCtaProps {
  ctaOpacity: MotionValue<number>;
  ctaY: MotionValue<number>;
}

export function IcebergCta({ ctaOpacity, ctaY }: IcebergCtaProps) {
  return (
    <motion.a
      href="https://github.com/mozix5"
      target="_blank"
      rel="noreferrer"
      className="mt-6 md:mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] px-6 py-3 z-30"
      style={{
        border: "1px solid var(--rule-light)",
        color: "var(--fg-dim)",
        opacity: ctaOpacity,
        y: ctaY,
      }}
      whileHover={{ borderColor: "var(--gold)", color: "var(--gold)" }}
    >
      <span>Explore the depths</span>
      <span style={{ color: "var(--gold)", fontSize: 8 }}>◆</span>
      <span>GitHub</span>
    </motion.a>
  );
}
