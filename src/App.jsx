import React, { useRef } from "react";
import cap from "./assets/cap.png";
import body from "./assets/body.png";
import { useScroll, useTransform, motion } from "framer-motion";
const App = () => {
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["0 0.42", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 4678]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -460]);
  const x3 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, -460, -460, -460, -460, 0],
    { clamp: false }
  );
  const x2 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 980, 980, 980, 980, 0],
    { clamp: false }
  );
  // const x2 = useTransform(scrollYProgress, [0, 1], [0, 980]);
  return (
    <div className=" bg-black overflow-x-hidden">
      <div className="bg-red-500 h-screen"></div>

      {/* <div className="min-h-screen flex items-center justify-center bg-black"> */}
      <div className="relative w-screen h-[600vh]" ref={scrollContainerRef}>
        <div className="">
          <motion.div
            className="absolute left-80 z-10 w-[20%]"
            style={{ y: y, x: x3 }}
          >
            <img className=" object-contain h-full w-full " src={cap}></img>
          </motion.div>
          <motion.div
            className="absolute right-[318px]  w-[56.5%] "
            style={{ x: x2, y: y }}
          >
            <img className=" object-contain h-full w-full" src={body}></img>
          </motion.div>
      <div className="bg-yellow-500 h-[140vh]"></div>
      <div className="bg-blue-500 h-screen"></div>

        </div>
      </div>
      {/* </div> */}
      <div className="bg-red-500 h-screen"></div>
    </div>
  );
};

export default App;
