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
import { CustomCursor } from "@/components/ui/custom-cursor";

const App = () => {
  const [spaceLeft, setSpaceLeft] = useState(0);
  const [spaceRight, setSpaceRight] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const measureFrameRef = useRef(0);

  const measureImageTravel = useCallback(() => {
    if (measureFrameRef.current) {
      window.cancelAnimationFrame(measureFrameRef.current);
    }

    measureFrameRef.current = window.requestAnimationFrame(() => {
      measureFrameRef.current = 0;

      if (capRef.current && bodyRef.current) {
        const capRect = capRef.current.getBoundingClientRect();
        const bodyRect = bodyRef.current.getBoundingClientRect();
        setSpaceLeft(capRect.left + capRect.width / 2.1);
        setSpaceRight(
          window.innerWidth - bodyRect.right + bodyRect.width / 1.25,
        );
      }
    });
  }, []);

  useEffect(() => {
    measureImageTravel();
    window.addEventListener("resize", measureImageTravel);
    return () => {
      window.removeEventListener("resize", measureImageTravel);

      if (measureFrameRef.current) {
        window.cancelAnimationFrame(measureFrameRef.current);
      }
    };
  }, [measureImageTravel]);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["0 0.42", "end end"],
  });
  const x1 = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.03, 0.97, 1],
      [0, -spaceLeft, -spaceLeft, 0],
      { clamp: true },
    ),
    { stiffness: 100, damping: 20 },
  );
  const x2 = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.03, 0.97, 1],
      [0, spaceRight, spaceRight, 0],
      { clamp: true },
    ),
    { stiffness: 100, damping: 20 },
  );

  return (
    <div style={{ background: "var(--bg)" }}>
      <CustomCursor />
      <div className="relative flex h-screen items-center justify-center px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(240,237,230,0.06) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(201,168,76,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 inset-x-0 h-[1px]"
          style={{ background: "var(--rule-light)" }}
        />
        <div
          className="absolute bottom-0 inset-x-0 h-[1px]"
          style={{ background: "var(--rule-light)" }}
        />

        <div className="relative z-10 flex flex-col items-center">
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
                className={
                  i === 1 ? "pl-8 md:pl-16" : i === 2 ? "pl-20 md:pl-56" : ""
                }
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="mt-4 h-[1px] w-full max-w-xs sm:max-w-sm"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
        </div>
      </div>

      <div className="relative py-20" ref={scrollContainerRef}>
        <div className="flex sticky top-1/2 -translate-y-1/2 items-start overflow-hidden z-50">
          <motion.div
            ref={capRef}
            className="relative left-[20vw] z-20 w-[40%] transform-gpu will-change-transform md:w-[20%]"
            style={{ x: x1 }}
          >
            <img
              className="object-contain h-full w-full"
              src={cap}
              alt="cap"
              style={{ filter: "brightness(0.9) contrast(1.05)" }}
            />
          </motion.div>
          <motion.div
            ref={bodyRef}
            className="z-10 relative left-[2vw] w-[80%] transform-gpu will-change-transform md:w-[56.5%]"
            style={{ x: x2 }}
          >
            <img
              className="object-contain h-full w-full"
              src={body}
              alt="body"
              style={{ filter: "brightness(0.9) contrast(1.05)" }}
            />
            <div
              className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-40 whitespace-nowrap mix-blend-overlay"
              style={{
                fontFamily: "'Mr De Haviland', cursive",
                fontSize: "clamp(1.2rem, 3.5vw, 3.5rem)",
                color: "var(--fg)",
                transform: "rotate(-8deg)",
                filter: "blur(0.3px)",
              }}
            >
              Mosin
            </div>
          </motion.div>
        </div>
        <div className="h-[100vh]" />

        <Profile />
        <section id="projects">
          <Projects />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <TechStack />
        <section id="contact">
          <Contact />
        </section>
        <div className="h-screen" />
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-0 right-0">
          <Footer />
        </div>
      </div>

    </div>
  );
};

export default App;
