import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/content";
import { ExperienceEntry } from "@/components/experience/ExperienceEntry";
import { SectionHeader } from "@/components/ui/section-header";

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
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transform-gpu"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--rule-light) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-16 py-24">
        <SectionHeader
          issueNumber="03"
          issueTitle="Career & Education"
          titlePrimary="Exper"
          titleStroked="ience"
          description="A timeline of production work, real impact shipped, and the education that built the foundation underneath it."
          className="mb-20"
          showLongDivider
        />

        <div className="relative" ref={timelineRef}>
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
