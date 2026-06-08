import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/content";
import { TextWipe } from "@/components/ui/text-wipe";
import { ExperienceEntry } from "@/components/experience/ExperienceEntry";

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.5"],
  });

  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transform-gpu"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--rule-light) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-16 py-24">
        {/* ── Header ── */}
        <div className="mb-20">
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.45em] mb-6"
            style={{ color: "var(--fg-dim)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Issue 03 · Career & Education
          </motion.p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="font-bebas leading-none tracking-tight"
              style={{
                fontSize: "clamp(4.5rem,13vw,9rem)",
                color: "var(--fg)",
              }}
            >
              <TextWipe delay={0.1}>
                <span>Exper</span>
              </TextWipe>
              <TextWipe delay={0.25}>
                <span
                  style={{
                    WebkitTextStroke: "1px var(--fg)",
                    color: "transparent",
                  }}
                >
                  ience
                </span>
              </TextWipe>
            </h2>

            <motion.p
              className="font-lora text-base max-w-xs leading-relaxed sm:mb-4"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A timeline of production work, real impact shipped, and the
              education that built the foundation underneath it.
            </motion.p>
          </div>

          {/* Gold rule divider */}
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
        </div>

        {/* ── Alternating timeline ── */}
        <div className="relative" ref={timelineRef}>
          {/* Scroll-driven vertical rule */}
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-px"
            style={{ height: "100%", background: "var(--rule)" }}
          >
            <motion.div
              className="w-full origin-top transform-gpu will-change-transform"
              style={{
                scaleY: lineScaleY,
                height: "100%",
                background:
                  "linear-gradient(to bottom, var(--gold), var(--fg-dim))",
              }}
            />
          </div>

          {timeline.map((item, index) => (
            <ExperienceEntry key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="flex items-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div
            className="h-px flex-1"
            style={{ background: "var(--rule-light)" }}
          />
          <span
            className="font-mono text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "var(--fg-dim)" }}
          >
            Still in print
          </span>
          <span style={{ color: "var(--gold)", fontSize: 8 }}>◆</span>
          <div
            className="h-px flex-1"
            style={{ background: "var(--rule-light)" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
