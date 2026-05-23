import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

type MagneticProps = {
  children: React.ReactElement;
  range?: number;
  strength?: number;
};

export const Magnetic = ({ children, range = 50, strength = 0.35 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        setPosition({ x: distanceX * strength, y: distanceY * strength });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [range, strength]);

  return (
    <div ref={ref} style={{ display: "inline-block" }}>
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
