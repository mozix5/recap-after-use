import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Profile from "@/pages/Profile.tsx";
import Projects from "@/pages/Projects.tsx";
import Footer from "@/components/Footer.tsx";
import Contact from "@/pages/Contact.tsx";
import Experience from "@/pages/Experience.tsx";
import TechStack from "@/pages/TechStack.tsx";
import { CustomCursor } from "@/components/ui/custom-cursor";
import PreLoader from "@/components/PreLoader.tsx";
import { SlidingPen } from "@/components/ui/sliding-pen";

const App = () => {
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["0 0.42", "end end"],
  });

  return (
    <div style={{ background: "var(--bg)" }}>
      <CustomCursor />
      <AnimatePresence>
        {loading && (
          <PreLoader key="preloader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div
        style={{
          opacity: loading ? 0 : 1,
          pointerEvents: loading ? "none" : "auto",
          transition: "opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
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

          <div className="relative z-10 flex flex-col items-center">
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.5em] mb-8"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0 }}
              animate={loading ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Portfolio · 2026
            </motion.p>

            <div
              className="font-anton flex flex-col text-[clamp(4.5rem,20vw,11rem)] uppercase leading-none tracking-wide"
              style={{ color: "var(--fg)" }}
            >
              {["recap", "after", "use"].map((word, i) => (
                <motion.span
                  key={word}
                  className={
                    (i === 1 ? "pl-8 md:pl-16" : i === 2 ? "pl-20 md:pl-56" : "") + 
                    " block cursor-default transition-colors duration-500"
                  }
                  initial={{ opacity: 0, y: 40 }}
                  animate={loading ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
                  whileHover={i === 1 ? { color: "var(--fg)" } : {}}
                  style={{
                    WebkitTextStroke: i === 1 ? "1px var(--fg)" : "none",
                    color: i === 1 ? "transparent" : "var(--fg)",
                  }}
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
          </div>
        </div>

        <div className="relative py-20" ref={scrollContainerRef}>
          <SlidingPen scrollYProgress={scrollYProgress} loading={loading} />
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
    </div>
  );
};

export default App;
