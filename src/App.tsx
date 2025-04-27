import Particles from "@/components/ui/particles.tsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import cap from "@/assets/cap.png";
import body from "@/assets/body.png";
import Profile from "@/pages/Profile.tsx";
import Projects from "@/pages/Projects.tsx";
import Footer from "@/components/Footer.tsx";
import Contact from "@/pages/Contact.tsx";
import TechStack from "@/pages/TechStack.tsx";
import { SmoothCursor } from "@/components/ui/smooth-cursor.tsx";

const App = () => {
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["0 0.42", "end end"],
  });
  const x3 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [0, -460, -460, -460, -460, -460, -460, -460, -460, -460, 0],
    { clamp: true },
  );
  const x2 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [0, 980, 980, 980, 980, 980, 980, 980, 980, 980, 0],
    { clamp: false },
  );
  return (
    <div className="bg-black">
      <div className=" h-screen flex justify-center items-center">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
        <div className="font-bebas text-[8rem] md:text-[11rem] leading-none font-bold flex flex-col text-white tracking-widest">
          <span>recap</span>
          <span className="pl-8 md:pl-16">after</span>
          <span className="pl-20 md:pl-56">use</span>
        </div>
      </div>
      <div className="relative py-20" ref={scrollContainerRef}>
        <div className="flex sticky top-1/2 -translate-y-1/2 items-start overflow-hidden z-50">
          <motion.div
            className="relative left-[20vw] z-20 w-[40%] md:w-[20%]"
            style={{ x: x3 }}
          >
            <img className="object-contain h-full w-full" src={cap} alt="cap" />
          </motion.div>
          <motion.div
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
        <Projects />
        <TechStack />
        {/*<Experience/>*/}
        <Contact />
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
