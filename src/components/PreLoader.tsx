import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const words = [
  "Hello",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "Olá",
  "おい",
  "Hallå",
  "Guten tag",
  "Hallo",
];

interface PreLoaderProps {
  onComplete: () => void;
}

export const PreLoader: React.FC<PreLoaderProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [lenis]);

  useEffect(() => {
    if (index === 0) {
      const timeout = setTimeout(() => {
        setIndex(1);
      }, 1300);
      return () => clearTimeout(timeout);
    } else if (index < words.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808] text-[#f0ede6] text-5xl md:text-6xl font-medium overflow-hidden"
    >
      <div className="relative flex items-center">
        <div className="preloader-dot" />
        <span className="relative pl-2 font-sans">
          {words[index]}
        </span>
      </div>
    </motion.div>
  );
};

export default PreLoader;
