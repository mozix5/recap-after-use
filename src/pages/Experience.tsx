import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline, sections } from "@/data/content";
import { ExperienceEntry } from "@/components/experience/ExperienceEntry";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionDivider } from "@/components/ui/section-divider";

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
          issueNumber={sections.experience.issueNumber}
          issueTitle={sections.experience.issueTitle}
          titlePrimary={sections.experience.titlePrimary}
          titleStroked={sections.experience.titleStroked}
          description={sections.experience.description}
          className="mb-20"
          showLongDivider
        />

        <div className="relative" ref={timelineRef}>
          <div
            className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-px"
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

        <SectionDivider text="Still in print" className="mt-4" delay={0} />
      </div>
    </section>
  );
};

export default Experience;
