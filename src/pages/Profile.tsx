import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import me from "@/assets/me.png";
import { profileData } from "@/data/content";
import { Signature } from "@/components/ui/signature";



function Ticker() {
  // Repeat the items 10 times to ensure the content is wider than any screen,
  // making the 50% translation a seamless infinite loop.
  const doubled = Array(10).fill(profileData.tickerItems).flat();
  return (
    <div
      className="overflow-hidden border-y py-2.5"
      style={{ borderColor: "var(--rule)" }}
    >
      <motion.div
        className="flex gap-10 whitespace-nowrap will-change-transform w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "var(--fg-dim)" }}
          >
            {item}
            <span style={{ color: "var(--gold)", opacity: 0.6 }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const Profile = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, amount: 0.25 });
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <Ticker />

      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div ref={leftRef}>
            <motion.div
              className="flex items-baseline gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span
                className="font-bebas text-6xl leading-none"
                style={{ color: "var(--rule-light)" }}
              >
                01
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.4em]"
                style={{ color: "var(--fg-dim)" }}
              >
                The Developer
              </span>
            </motion.div>

            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={leftInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="absolute top-0 inset-x-0 h-[2px] z-10"
                style={{
                  background:
                    "linear-gradient(to right, var(--gold), transparent)",
                }}
              />

              <img
                src={me}
                alt="Md Mosin"
                className="w-full object-cover"
                style={{
                  filter: "brightness(0.85) contrast(1.1) saturate(0.6)",
                  maxHeight: 460,
                  objectPosition: "top",
                }}
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--bg) 0%, rgba(8,8,8,0.2) 45%, transparent 70%)",
                }}
              />

              <div
                className="absolute bottom-0 inset-x-0 px-4 py-3 flex items-center justify-between"
                style={{ borderTop: "1px solid var(--rule)" }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-widest"
                  style={{ color: "var(--fg-muted)" }}
                >
                  Md Mosin — Developer
                </span>
                <span
                  className="font-mono text-[9px] uppercase tracking-widest"
                  style={{ color: "var(--gold)" }}
                >
                  Active ◉
                </span>
              </div>
            </motion.div>


          </div>

          <div ref={rightRef} className="lg:pt-20">
            <div className="overflow-hidden mb-2">
              <motion.h1
                className="font-bebas leading-[0.9] tracking-tight"
                style={{
                  fontSize: "clamp(5rem,13vw,9rem)",
                  color: "var(--fg)",
                }}
                initial={{ y: 100 }}
                animate={rightInView ? { y: 0 } : {}}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                MD
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1px var(--fg)",
                    color: "transparent",
                  }}
                >
                  Mosin
                </span>
              </motion.h1>
            </div>

            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={rightInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
            >
              <div
                className="h-[1px] w-12"
                style={{ background: "var(--gold)" }}
              />
              <span
                className="font-mono text-[9px] uppercase tracking-[0.5em]"
                style={{ color: "var(--gold)" }}
              >
                Full Stack Developer
              </span>
            </motion.div>

            <motion.div
              className="mb-8 pl-5"
              style={{ borderLeft: "2px solid var(--gold)" }}
              initial={{ opacity: 0, x: 20 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p
                className="font-lora italic text-lg sm:text-xl leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                {profileData.quote}
              </p>
              <div className="flex justify-end mt-4">
                <Signature className="w-36 h-12 opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>

            <motion.p
              className="font-lora text-base leading-relaxed mb-10"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0 }}
              animate={rightInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.38, duration: 0.5 }}
            >
              {profileData.description}
            </motion.p>

            <motion.div
              className="p-5 relative"
              style={{ border: "1px solid var(--rule-light)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className="absolute -top-[9px] left-4 px-2 font-mono text-[9px] uppercase tracking-widest"
                style={{ background: "var(--bg)", color: "var(--fg-dim)" }}
              >
                Objective
              </div>
              <p
                className="font-lora text-sm leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                {profileData.objective}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
};

export default Profile;
