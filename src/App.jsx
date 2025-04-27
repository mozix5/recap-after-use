import React, { useRef } from "react";
import cap from "./assets/cap.png";
import body from "./assets/body.png";
import { useScroll, useTransform, motion} from "framer-motion";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Experience from "./pages/Experience";
const App = () => {
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["0 0.42", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 5080]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -460]);
  const x3 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [0, -460, -460, -460, -460, -460, -460, -460, -460, -460, 0],
    { clamp: false }
  );
  const x2 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [0, 980, 980, 980, 980, 980, 980, 980, 980, 980, 0],
    { clamp: false }
  );
  // const x2 = useTransform(scrollYProgress, [0, 1], [0, 980]);
  return (
    <div className=" bg-primary overflow-x-hidden">
      <div className="bg-primary h-screen flex justify-center items-center">
        <div className=" font-bebas text-[11rem] leading-none font-bold flex flex-col text-white tracking-widest">
          <span>recap</span>
          <span className=" pl-16 ">after</span>
          <span className="pl-56">use</span>
        </div>
      </div>
      <div className="relative w-screen h-full" ref={scrollContainerRef}>
        <div className="">
          <motion.div
            className="absolute left-80 z-20 w-[20%]"
            style={{ y: y, x: x3 }}
          >
            <img className=" object-contain h-full w-full " src={cap}></img>
          </motion.div>
          <motion.div
            className="absolute right-[318px] z-10 w-[56.5%] "
            style={{ x: x2, y: y }}
          >
            <img className=" object-contain h-full w-full" src={body}></img>
          </motion.div>
          <div className="bg-primary h-screen"></div>
          <Profile />
          <Projects />
          <Experience/>
          <Contact />
        </div>
      </div>
      <div className=" h-screen relative">
        <div className=" bg-primary w-screen text-white absolute bottom-0 left-0 right-0 ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
