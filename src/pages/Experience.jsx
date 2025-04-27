import { useScroll, motion, useSpring } from "framer-motion";
import React, { useRef } from "react";

const Experience = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div className=" h-screen text-mono text-white relative" ref={containerRef}>
      Experience
      <div
        className=" absolute top-0 left-0 right-0 h-20 bg-red-300 origin-[0%}"
        style={{ scaleX }}
      ></div>
     
    </div>
  );
};

export default Experience;
