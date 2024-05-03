import React, { useRef, useState } from "react";
import screen from "../assets/screen.svg";
import hoverScreen from "../assets/hoverScreen.svg";
import hoverKeyboard from "../assets/hoverKeyboard.svg";
import keyboard from "../assets/5f560373b66385163d918256_comp_4-1-w.svg";
import turboText from "../assets/turboText.png";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import CardButton from "./CardButton";
const Card = () => {
  const targetRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end center"],
  });
  const z = useTransform(scrollYProgress, [0, 1], [0, 3400]);
  return (
    <div className=" h-[78vh] border-2 border-white w-full rounded-2xl text-white flex justify-between">
      <div className=" flex-1 pl-8 pt-6">
        <div className=" text-[44px] font-mono tracking-wider leading-relaxed">turboText</div>
        <div className=" font-mono text-xl leading-loose mt-10 tracking-wider">
          The Innovation Collaboration Group - a PropTech collective providing
          new solutions for the property industry.
        </div>
        <CardButton/>
      </div>
      <div
        className=" flex-1 justify-center flex flex-col items-center "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          layout
          className=" h-[19.5rem] w-[30rem] relative "
          ref={targetRef}
        >
          <img
            src={isHovered ? hoverScreen : screen}
            className=" h-full w-full [transform:rotateY(15deg)]"
          ></img>
          <div className="absolute top-0 left-0 right-0 bottom-0 pt-[23px] pl-[25px] pb-[13px] pr-[25px] ">
            <img src={turboText} className=" h-full w-full rounded-sm "></img>
          </div>
        </motion.div>
        <div className="w-[620px] h-36">
          <img
            src={isHovered ? hoverKeyboard : keyboard}
            className=" h-full w-full"
          ></img>
        </div>
        {/* <img src={hoverScreen} className=" h-44 w-44 text-white"></img> */}
      </div>
    </div>
  );
};

export default Card;
