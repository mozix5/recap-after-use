import { motion } from "framer-motion";
import { useState } from "react";

type SignatureProps = {
  className?: string;
  color?: string;
  strokeWidth?: number;
};

export const Signature = ({
  className = "w-48 h-20",
  color = "var(--gold)",
  strokeWidth = 1.75,
}: SignatureProps) => {
  const [animationKey, setAnimationKey] = useState(0);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: "spring",
          duration: 2.2,
          bounce: 0,
          ease: "easeInOut",
        },
        opacity: { duration: 0.15 },
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.95,
      },
    },
  };

  const handleHover = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div
      className={`relative cursor-pointer select-none ${className}`}
      onMouseEnter={handleHover}
      title="Hover to replay signature"
    >
      <motion.svg
        key={animationKey}
        viewBox="15 12 110 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.path
          d="M 20,48 C 15,25 28,10 35,15 C 40,18 32,52 28,58 C 34,42 46,18 52,18 C 56,18 52,46 50,54 C 53,46 62,34 66,34 C 70,34 67,48 64,52 C 65,48 69,40 73,40 C 77,40 76,48 73,48 C 70,48 69,43 73,42 C 76,41 78,39 80,42 C 82,45 84,38 87,38 C 90,38 91,44 89,48 C 87,51 84,52 83,49 C 82,46 85,44 89,44 C 92,44 94,36 96,36 C 98,36 97,45 96,49 C 97,47 100,40 103,40 C 106,40 105,48 104,51 C 106,46 110,40 113,40 C 116,40 115,48 114,50"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />

        <motion.path
          d="M 96,26 A 1.2,1.2 0 1,1 95.9,26"
          fill={color}
          variants={dotVariants}
        />
      </motion.svg>
    </div>
  );
};
