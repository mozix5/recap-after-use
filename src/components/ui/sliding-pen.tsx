import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import cap from "@/assets/cap.png";
import body from "@/assets/body.png";

interface SlidingPenProps {
  scrollYProgress: MotionValue<number>;
  loading: boolean;
}

export const SlidingPen = ({ scrollYProgress, loading }: SlidingPenProps) => {
  const [spaceLeft, setSpaceLeft] = useState(0);
  const [spaceRight, setSpaceRight] = useState(0);
  const capRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const measureFrameRef = useRef(0);

  const measureImageTravel = useCallback(() => {
    if (measureFrameRef.current) {
      window.cancelAnimationFrame(measureFrameRef.current);
    }

    measureFrameRef.current = window.requestAnimationFrame(() => {
      measureFrameRef.current = 0;

      if (capRef.current && bodyRef.current) {
        const capRect = capRef.current.getBoundingClientRect();
        const bodyRect = bodyRef.current.getBoundingClientRect();
        setSpaceLeft(capRect.left + capRect.width / 2.1);
        setSpaceRight(
          window.innerWidth - bodyRect.right + bodyRect.width / 1.25,
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      measureImageTravel();
    }
    window.addEventListener("resize", measureImageTravel);
    return () => {
      window.removeEventListener("resize", measureImageTravel);

      if (measureFrameRef.current) {
        window.cancelAnimationFrame(measureFrameRef.current);
      }
    };
  }, [measureImageTravel, loading]);


  const x1 = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.03, 0.97, 1],
      [0, -spaceLeft, -spaceLeft, 0],
      { clamp: true },
    ),
    { stiffness: 100, damping: 20 },
  );

  const x2 = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.03, 0.97, 1],
      [0, spaceRight, spaceRight, 0],
      { clamp: true },
    ),
    { stiffness: 100, damping: 20 },
  );

  return (
    <div className="flex sticky top-1/2 -translate-y-1/2 items-start overflow-hidden z-50 pointer-events-none">
      <motion.div
        ref={capRef}
        className="relative left-[28.3vw] md:left-[20vw] z-20 w-[28.3%] md:w-[20%] transform-gpu will-change-transform"
        style={{ x: x1 }}
      >
        <img
          className="object-contain h-full w-full"
          src={cap}
          alt="cap"
          style={{ filter: "brightness(0.9) contrast(1.05)" }}
        />
      </motion.div>
      <motion.div
        ref={bodyRef}
        className="z-10 relative left-[2.8vw] md:left-[2vw] w-[80%] md:w-[56.5%] transform-gpu will-change-transform"
        style={{ x: x2 }}
      >
        <img
          className="object-contain h-full w-full"
          src={body}
          alt="body"
          style={{ filter: "brightness(0.9) contrast(1.05)" }}
        />
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-40 whitespace-nowrap mix-blend-overlay"
          style={{
            fontFamily: "'Mr De Haviland', cursive",
            fontSize: "clamp(1.2rem, 3.5vw, 3.5rem)",
            color: "var(--fg)",
            transform: "rotate(-8deg)",
            filter: "blur(0.3px)",
          }}
        >
          Mosin
        </div>
      </motion.div>
    </div>
  );
};
