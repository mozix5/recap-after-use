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
import Particles from "@/components/ui/particles.tsx";
import { ArrowDown, Mail } from "lucide-react";

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

    return () => {
      window.removeEventListener("resize", measureImageTravel);
    };
  }, [measureImageTravel]);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["0 0.42", "end end"],
  });
  const x3 = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.1, 0.9, 1],
      [0, -spaceLeft, -spaceLeft, 0],
      { clamp: true }
    ),
    { stiffness: 100, damping: 20 }
  );
  const x2 = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.1, 0.9, 1],
      [0, spaceRight, spaceRight, 0],
      { clamp: true }
    ),
    { stiffness: 100, damping: 20 }
  );
  return (
    <div className="bg-black">
      <div className="relative flex h-screen items-center justify-center px-6">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
        <div className="relative z-10 flex flex-col items-center">
          <div className="font-bebas flex flex-col text-[clamp(4.5rem,20vw,11rem)] font-bold leading-none tracking-widest text-white">
            <span>recap</span>
            <span className="pl-8 md:pl-16">after</span>
            <span className="pl-20 md:pl-56">use</span>
          </div>
          <p className="mt-6 max-w-2xl text-center font-mono text-sm uppercase tracking-[0.28em] text-white/70 sm:text-base">
            Frontend developer crafting animated, responsive web experiences.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-5 py-3 font-mono text-sm uppercase tracking-widest text-black transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              <ArrowDown className="h-4 w-4" />
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-mono text-sm uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </div>
        </div>
        {/* <div className="relative h-[500px] w-full overflow-hidden">
          <VideoText
            fontSize={10}
            className=" tracking-widest"
            src="https://cdn.geekwire.com/wp-content/uploads/2016/12/ezgif.com-resize-10.gif"
          >
            RECAP AFTER USE
          </VideoText>
        </div> */}
      </div>
      <div className="relative py-20" ref={scrollContainerRef}>
        <div className="flex sticky top-1/2 -translate-y-1/2 items-start overflow-hidden z-50">
          <motion.div
            ref={capRef}
            className="relative left-[20vw] z-20 w-[40%] md:w-[20%]"
            style={{ x: x3 }}
          >
            <img className="object-contain h-full w-full" src={cap} alt="cap" />
          </motion.div>
          <motion.div
            ref={bodyRef}
            className=" z-10 relative left-[2vw] w-[80%] md:w-[56.5%]"
            style={{ x: x2 }}
          >
            <img
              className="object-contain h-full w-full"
              src={body}
              alt="body"
            />
          </motion.div>
        </div>
        <div className="h-[50vh]"></div>
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
        <div className="h-screen"></div>
      </div>
      <div className=" relative">
        <div className="text-white absolute bottom-0 left-0 right-0">
          <Footer />
        </div>
      </div>
      <SmoothCursor />
    </div>
  );
};

export default App;
