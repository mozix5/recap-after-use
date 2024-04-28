import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Footer = () => {
  const [hover, setHover] = useState(false);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 60,
  };

  return (
    <div className="flex py-8 text-white items-center justify-center mx-[269px]">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ fontFamily: "Mixiwa" }}
        className={` text-xl text-caret cursor-pointer flex gap-2 ${
          hover ? "justify-between flex-1 " : "justify-center"
        }`}
      >
        <motion.span layout transition={spring}>
          &#60;/
        </motion.span>
        <a href="https://portfolyo-amber.vercel.app/" target="_blank">
          <span>mozix</span>
        </a>
        <motion.span layout transition={spring}>
          &#62;
        </motion.span>
      </div>
    </div>
  );
};

export default Footer;
