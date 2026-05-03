import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import cap from "@/assets/cap.png";
import body from "@/assets/body.png";
import Profile from "@/pages/Profile.tsx";
import Projects from "@/pages/Projects.tsx";
import Footer from "@/components/Footer.tsx";
import Contact from "@/pages/Contact.tsx";
import Experience from "@/pages/Experience.tsx";
import TechStack from "@/pages/TechStack.tsx";
import { SmoothCursor } from "@/components/ui/smooth-cursor.tsx";

const App = () => {
  const [spaceLeft, setSpaceLeft] = useState(0);
  const [spaceRight, setSpaceRight] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const measureImageTravel = useCallback(() => {
    if (capRef.current && bodyRef.current) {
      const capRect = capRef.current.getBoundingClientRect();
      const bodyRect = bodyRef.current.getBoundingClientRect();
      setSpaceLeft(capRect.left + capRect.width / 2.1);
      setSpaceRight(window.innerWidth - bodyRect.right + bodyRect.width / 1.2);
    }
  }, []);

  useEffect(() => {
    measureImageTravel();
    window.addEventListener("resize", measureImageTravel);
    return () => window.removeEventListener("resize", measureImageTravel);
  }, [measureImageTravel]);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["0 0.42", "end end"],
  });
  const x3 = useSpring(
    useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, -spaceLeft, -spaceLeft, 0], { clamp: true }),
    { stiffness: 100, damping: 20 }
  );
  const x2 = useSpring(
    useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, spaceRight, spaceRight, 0], { clamp: true }),
    { stiffness: 100, damping: 20 }
  );

  return (
    <div style={{ background: "var(--bg)" }}>

      {/* ── Hero ── */}
      <div className="relative flex h-screen items-center justify-center px-6 overflow-hidden">
        {/* Dot-grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(240,237,230,0.06) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Gold vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(201,168,76,0.04) 0%, transparent 70%)",
          }}
        />
        {/* Top rule */}
        <div className="absolute top-0 inset-x-0 h-[1px]" style={{ background: "var(--rule-light)" }} />
        {/* Bottom rule */}
        <div className="absolute bottom-0 inset-x-0 h-[1px]" style={{ background: "var(--rule-light)" }} />

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Running header label */}
          <motion.p
            className="font-mono text-[10px] uppercase tracking-[0.5em] mb-8"
            style={{ color: "var(--fg-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Portfolio · 2026
          </motion.p>

          <div
            className="font-bebas flex flex-col text-[clamp(4.5rem,20vw,11rem)] font-bold leading-none tracking-widest"
            style={{ color: "var(--fg)" }}
          >
            {["recap", "after", "use"].map((word, i) => (
              <motion.span
                key={word}
                className={i === 1 ? "pl-8 md:pl-16" : i === 2 ? "pl-20 md:pl-56" : ""}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="mt-4 h-[1px] w-full max-w-xs sm:max-w-sm"
            style={{ background: "linear-gradient(to right, transparent, var(--gold), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />

          <motion.p
            className="mt-6 max-w-2xl text-center font-mono text-sm uppercase tracking-[0.28em] sm:text-base"
            style={{ color: "var(--fg-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Frontend developer crafting animated, responsive web experiences.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all"
              style={{ background: "var(--fg)", color: "var(--bg)", border: "1px solid var(--fg)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--fg)"; e.currentTarget.style.borderColor = "var(--fg)"; }}
            >
              ↓ View Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all"
              style={{ border: "1px solid var(--fg-dim)", color: "var(--fg-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--fg-muted)"; e.currentTarget.style.color = "var(--fg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--fg-dim)"; e.currentTarget.style.color = "var(--fg-muted)"; }}
            >
              ✉ Contact
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Pen split scroll ── */}
      <div className="relative py-20" ref={scrollContainerRef}>
        <div className="flex sticky top-1/2 -translate-y-1/2 items-start overflow-hidden z-50">
          <motion.div ref={capRef} className="relative left-[20vw] z-20 w-[40%] md:w-[20%]" style={{ x: x3 }}>
            <img className="object-contain h-full w-full" src={cap} alt="cap" style={{ filter: "brightness(0.9) contrast(1.05)" }} />
          </motion.div>
          <motion.div ref={bodyRef} className="z-10 relative left-[2vw] w-[80%] md:w-[56.5%]" style={{ x: x2 }}>
            <img className="object-contain h-full w-full" src={body} alt="body" style={{ filter: "brightness(0.9) contrast(1.05)" }} />
          </motion.div>
        </div>
        <div className="h-[50vh]" />

        <Profile />
        <section id="projects"><Projects /></section>
        <section id="experience"><Experience /></section>
        <TechStack />
        <section id="contact"><Contact /></section>
        <div className="h-screen" />
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-0 right-0">
          <Footer />
        </div>
      </div>

      <SmoothCursor />
    </div>
  );
};

export default App;
