import { motion } from "framer-motion";
import React from "react";

type TextWipeProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
};

export const TextWipe = ({
  children,
  delay = 0,
  duration = 0.85,
  once = true,
}: TextWipeProps) => {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{
        duration,
        ease: [0.76, 0, 0.24, 1],
        delay,
      }}
      style={{ display: "block", width: "100%" }}
    >
      {children}
    </motion.div>
  );
};
