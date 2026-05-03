import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import me from "@/assets/me.png";

/* Stat block — editorial number + label */
function StatBlock({
  value,
  label,
  delay,
  inView,
}: {
  value: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span
        className="font-bebas leading-none"
        style={{ fontSize: "clamp(2.5rem,7vw,4.5rem)", color: "var(--fg)" }}
      >
        {value}
      </span>
      <span
        className="font-mono text-[9px] uppercase tracking-[0.35em] mt-1"
        style={{ color: "var(--fg-dim)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* Scrolling ticker */
function Ticker() {
  const items = [
    "Frontend Developer",
    "React",
    "TypeScript",
    "Framer Motion",
    "UI/UX",
    "Node.js",
    "Open to Work",
    "Based in India",
  ];
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden border-y py-2.5"
      style={{ borderColor: "var(--rule)" }}
    >
      <motion.div
        className="flex gap-10 whitespace-nowrap will-change-transform"
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

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* ══ LEFT: photo panel ══ */}
          <div ref={leftRef}>
            {/* Page number + label */}
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

            {/* Photo */}
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={leftInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Gold top accent */}
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

              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--bg) 0%, rgba(8,8,8,0.2) 45%, transparent 70%)",
                }}
              />

              {/* Caption bar */}
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

            {/* Stats row */}
            <motion.div
              className="mt-6 grid grid-cols-3 gap-4"
              style={{
                borderTop: "1px solid var(--rule-light)",
                paddingTop: "1.5rem",
              }}
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <StatBlock
                value="2+"
                label="Years"
                delay={0.45}
                inView={leftInView}
              />
              <StatBlock
                value="4+"
                label="Projects"
                delay={0.55}
                inView={leftInView}
              />
              <StatBlock
                value="∞"
                label="Curiosity"
                delay={0.65}
                inView={leftInView}
              />
            </motion.div>
          </div>

          {/* ══ RIGHT: content ══ */}
          <div ref={rightRef} className="lg:pt-20">
            {/* Giant name */}
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

            {/* Gold rule */}
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

            {/* Pull quote */}
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
                &ldquo;I bridge creativity with code — building interfaces that
                are not only functional but genuinely memorable.&rdquo;
              </p>
            </motion.div>

            {/* Body copy */}
            <motion.p
              className="font-lora text-base leading-relaxed mb-10"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0 }}
              animate={rightInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.38, duration: 0.5 }}
            >
              From the first line of HTML I wrote, I knew that web development
              was where my heart and passion would thrive. I&apos;m a digital
              craftsman who values craft, precision, and the details that make
              an interface feel alive.
            </motion.p>

            {/* Objective block */}
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
                Making the web a better place — one pixel, one component, one
                meaningful interaction at a time.
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
