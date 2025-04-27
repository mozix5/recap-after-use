import { useState } from "react";
import screen from "../../../../../Documents/Project/recap after use/src/assets/screen.svg";
import hoverScreen from "../../../../../Documents/Project/recap after use/src/assets/hoverScreen.svg";
import hoverKeyboard from "../../../../../Documents/Project/recap after use/src/assets/hoverKeyboard.svg";
import keyboard from "../../../../../Documents/Project/recap after use/src/assets/5f560373b66385163d918256_comp_4-1-w.svg";
import turboText from "../../../../../Documents/Project/recap after use/src/assets/turboText.png";

const Card = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className=" h-[78vh] border border-gray-700 max-w-5xl rounded-2xl text-white flex justify-between">
      <div className=" flex-1 pl-8 pt-6">
        <div className=" text-[44px] font-mono tracking-wider leading-relaxed">
          turboText
        </div>
        <div className=" font-mono text-xl leading-loose mt-10 tracking-wider">
          The Innovation Collaboration Group - a PropTech collective providing
          new solutions for the property industry.
        </div>
        {/*<CardButton />*/}
      </div>
      <div
        className=" flex-1 justify-center flex flex-col items-center "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className=" h-[19.5rem] w-[30rem] relative ">
          <img
            src={isHovered ? hoverScreen : screen}
            className=" h-full w-full [transform:rotateY(15deg)]"
          ></img>
          <div className="absolute top-0 left-0 right-0 bottom-0 pt-[23px] pl-[25px] pb-[13px] pr-[25px] ">
            <img src={turboText} className=" h-full w-full rounded-sm "></img>
          </div>
        </div>
        <div className="w-[620px] h-36">
          <img
            src={isHovered ? hoverKeyboard : keyboard}
            className=" h-full w-full"
            alt="laptop"
          ></img>
        </div>
        {/* <img src={hoverScreen} className=" h-44 w-44 text-white"></img> */}
      </div>
    </div>
  );
};

export default Card;
