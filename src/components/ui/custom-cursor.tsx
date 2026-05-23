import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .cursor-pointer")) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .cursor-pointer")) {
        setIsHovered(false);
      }
    };

    const style = document.createElement("style");
    style.innerHTML = `
      @media (hover: hover) and (pointer: fine) {
        body, a, button, [role='button'], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.head.removeChild(style);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "var(--gold)",
        }}
        animate={{
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: outerX,
          top: outerY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1px solid var(--gold)",
        }}
        animate={{
          scale: isHovered ? 1.7 : 1,
          backgroundColor: isHovered ? "rgba(201, 168, 76, 0.08)" : "rgba(201, 168, 76, 0)",
          borderColor: isHovered ? "var(--gold)" : "rgba(201, 168, 76, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 25 }}
      />
    </>
  );
};
