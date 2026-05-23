import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/content";

/* ── Single timeline entry ── */
function Entry({ item, index }: { item: (typeof timeline)[0]; index: number }) {
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
            <EntryCard item={item} inView={inView} delay={index * 0.1} />
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
            <EntryCard item={item} inView={inView} delay={index * 0.1} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Card body ── */
function EntryCard({
  item,
  inView,
  delay,
}: {
  item: (typeof timeline)[0];
  inView: boolean;
  delay: number;
}) {
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
      <div className="flex flex-wrap gap-2">
        {item.points.map((pt) => (
          <span
            key={pt}
            className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1"
            style={{ border: "1px solid var(--rule)", color: "var(--fg-dim)" }}
          >
            {pt}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main section ── */
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
      className="relative overflow-hidden border-t"
      style={{ background: "var(--bg)", borderColor: "var(--rule)" }}
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
            <motion.h2
              className="font-bebas leading-none tracking-tight"
              style={{
                fontSize: "clamp(4.5rem,13vw,9rem)",
                color: "var(--fg)",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Exper
              <br />
              <span
                style={{
                  WebkitTextStroke: "1px var(--fg)",
                  color: "transparent",
                }}
              >
                ience
              </span>
            </motion.h2>

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
            <Entry key={item.title} item={item} index={index} />
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
