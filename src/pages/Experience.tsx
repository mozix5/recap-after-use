import { useScroll, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const Experience = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const y1=useTransform(scrollYProgress,[0,1],[0,200])
  return (
    <div
      className=" h-screen text-mono text-white relative flex justify-center mx-[269px]"
      ref={containerRef}
    >
      <div className=" absolute top-0 left-0 font-mono text-6xl">Experience</div>
      <motion.div
        className=" my-40 w-20 bg-red-300 origin-top sticky top-5"
        style={{ scaleY,y:y1 }}
      ></motion.div>
    </div>
  );
};

export default Experience;
