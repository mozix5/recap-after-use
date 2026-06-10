import { useState, useRef, useEffect } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

export const WATERLINE_TOP = "22%";

export const BELOW_STATS = [
  { side: "left" as const, label: "48 codebases under the surface", top: "50%" },
  { side: "left" as const, label: "Silent system pipelines", top: "66%" },
  { side: "right" as const, label: "Invisible backend engines", top: "44%" },
  { side: "right" as const, label: "Raw developer toolkits", top: "60%" },
];

const SPRING = { stiffness: 90, damping: 20 };

export interface IcebergScrollValues {
  wrapperRef: React.RefObject<HTMLDivElement>;
  isHovered: boolean;
  setIsHovered: (v: boolean) => void;
  charHighlight: number;
  finalTipY: MotionValue<number>;
  tipOpacity: MotionValue<number>;
  finalBaseY: MotionValue<number>;
  finalBaseX: MotionValue<number>;
  finalBaseScale: MotionValue<number>;
  baseOpacity: MotionValue<number>;
  finalWaterlineOpacity: MotionValue<number>;
  finalWaterlineOpacitySecondary: MotionValue<number>;
  waterlineScaleX: MotionValue<number>;
  finalLabelsOpacity: MotionValue<number>;
  labelsY: MotionValue<number>;
  assemblyFactor: MotionValue<number>;
  statTransforms: Array<{ opacity: MotionValue<number>; x: MotionValue<number> }>;
  ctaOpacity: MotionValue<number>;
  ctaY: MotionValue<number>;
}

export function useIcebergScroll(): IcebergScrollValues {
  const [isHovered, setIsHovered] = useState(false);
  const [charHighlight, setCharHighlight] = useState(0);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 1279px)");
    setIsCompact(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsCompact(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const rawTipY = useTransform(scrollYProgress, [0.10, 0.30], [-80, 0]);
  const rawTipOpacity = useTransform(scrollYProgress, [0.10, 0.26], [0, 1]);
  const rawBaseY = useTransform(scrollYProgress, (v) => {
    const start = 0.28;
    const end = isCompact ? 0.48 : 0.45;
    if (v < start) return 300;
    if (v > end) return 0;
    const pct = (v - start) / (end - start);
    return 300 - pct * 300;
  });
  const rawBaseOpacity = useTransform(scrollYProgress, (v) => {
    const start = 0.28;
    const end = isCompact ? 0.48 : 0.45;
    if (v < start) return 0;
    if (v > end) return 1;
    return (v - start) / (end - start);
  });
  const rawWaterlineScaleX = useTransform(scrollYProgress, (v) => {
    const start = isCompact ? 0.45 : 0.43;
    const end = isCompact ? 0.55 : 0.52;
    if (v < start) return 0;
    if (v > end) return 1;
    return (v - start) / (end - start);
  });
  const rawWaterlineOpacity = useTransform(scrollYProgress, (v) => {
    const start = isCompact ? 0.45 : 0.43;
    const end = isCompact ? 0.55 : 0.52;
    if (v < start) return 0;
    if (v > end) return 0.4;
    return ((v - start) / (end - start)) * 0.4;
  });
  const rawLabelsOpacity = useTransform(scrollYProgress, (v) => {
    const start = isCompact ? 0.50 : 0.48;
    const end = isCompact ? 0.65 : 0.62;
    if (v < start) return 0;
    if (v > end) return 0.85;
    return ((v - start) / (end - start)) * 0.85;
  });
  const rawLabelsY = useTransform(scrollYProgress, (v) => {
    const start = isCompact ? 0.50 : 0.48;
    const end = isCompact ? 0.65 : 0.62;
    if (v < start) return 5;
    if (v > end) return 0;
    const pct = (v - start) / (end - start);
    return 5 - pct * 5;
  });

  const tipY = useSpring(rawTipY, SPRING);
  const tipOpacity = useSpring(rawTipOpacity, SPRING);
  const baseY = useSpring(rawBaseY, SPRING);
  const baseOpacity = useSpring(rawBaseOpacity, SPRING);
  const waterlineScaleX = useSpring(rawWaterlineScaleX, SPRING);
  const waterlineOpacity = useSpring(rawWaterlineOpacity, SPRING);
  const labelsOpacity = useSpring(rawLabelsOpacity, SPRING);
  const labelsY = useSpring(rawLabelsY, SPRING);

  const tipBobY = useMotionValue(0);
  const baseBobY = useMotionValue(0);
  const baseBobX = useMotionValue(0);
  const baseBobScale = useMotionValue(1);
  const hoverWaterlineOpacity = useMotionValue(0);
  const hoverLabelsOpacity = useMotionValue(0);

  useEffect(() => {
    const c = animate(tipBobY, [0, -3, 0], { duration: 4.5, repeat: Infinity, ease: "easeInOut" });
    return () => c.stop();
  }, [tipBobY]);

  useEffect(() => {
    let cY: ReturnType<typeof animate>;
    let cX: ReturnType<typeof animate>;
    let cScale: ReturnType<typeof animate>;

    if (isHovered) {
      cY = animate(baseBobY, [2, 10, 2], { duration: 5, repeat: Infinity, ease: "easeInOut" });
      cX = animate(baseBobX, [0, -3, 3, 0], { duration: 5, repeat: Infinity, ease: "easeInOut" });
      cScale = animate(baseBobScale, 1.015, { duration: 0.5, ease: "easeOut" });
    } else {
      cY = animate(baseBobY, [0, -4, 0], { duration: 7, repeat: Infinity, ease: "easeInOut" });
      cX = animate(baseBobX, [-2, 2, -2], { duration: 7, repeat: Infinity, ease: "easeInOut" });
      cScale = animate(baseBobScale, 1.0, { duration: 0.5, ease: "easeOut" });
    }

    return () => {
      cY.stop();
      cX.stop();
      cScale.stop();
    };
  }, [isHovered, baseBobY, baseBobX, baseBobScale]);

  useEffect(() => {
    const wC = animate(hoverWaterlineOpacity, isHovered ? 0.5 : 0, { duration: 0.4 });
    const lC = animate(hoverLabelsOpacity, isHovered ? 0.55 : 0, { duration: 0.4 });
    return () => {
      wC.stop();
      lC.stop();
    };
  }, [isHovered, hoverWaterlineOpacity, hoverLabelsOpacity]);

  const assemblyFactor = useTransform(scrollYProgress, (v) => {
    const start = isCompact ? 0.58 : 0.45;
    const end = isCompact ? 0.70 : 0.52;
    if (v < start) return 0;
    if (v > end) return 1;
    return (v - start) / (end - start);
  });

  const finalTipY = useTransform(
    [tipY, tipBobY, assemblyFactor],
    ([yVal, bobVal, factor]: number[]) => yVal + bobVal * factor,
  );
  const finalBaseY = useTransform(
    [baseY, baseBobY, assemblyFactor],
    ([yVal, bobVal, factor]: number[]) => yVal + bobVal * factor,
  );
  const finalBaseX = useTransform(
    [baseBobX, assemblyFactor],
    ([bobVal, factor]: number[]) => bobVal * factor,
  );
  const finalBaseScale = useTransform(
    [baseBobScale, assemblyFactor],
    ([scaleVal, factor]: number[]) => 1 + (scaleVal - 1) * factor,
  );
  const finalWaterlineOpacity = useTransform(
    [waterlineOpacity, hoverWaterlineOpacity, assemblyFactor],
    ([baseO, hoverO, factor]: number[]) => (baseO + hoverO) * factor,
  );
  const finalWaterlineOpacitySecondary = useTransform(
    finalWaterlineOpacity,
    (v: number) => v * 0.7,
  );
  const finalLabelsOpacity = useTransform(
    [labelsOpacity, hoverLabelsOpacity, assemblyFactor],
    ([baseO, hoverO, factor]: number[]) => (baseO + hoverO) * factor,
  );

  const statTransforms = BELOW_STATS.map((stat, i) => {
    const start = 0.57 + i * 0.10;
    const end = 0.67 + i * 0.10;
    const rawOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    const rawX = useTransform(scrollYProgress, [start, end], [stat.side === "left" ? 10 : -10, 0]);
    const opacity = useSpring(rawOpacity, SPRING);
    const x = useSpring(rawX, SPRING);
    return { opacity, x };
  });

  const rawCtaOpacity = useTransform(scrollYProgress, (v) => {
    const start = isCompact ? 0.78 : 0.95;
    const end = isCompact ? 0.90 : 0.99;
    if (v < start) return 0;
    if (v > end) return 1;
    return (v - start) / (end - start);
  });

  const rawCtaY = useTransform(scrollYProgress, (v) => {
    const start = isCompact ? 0.78 : 0.95;
    const end = isCompact ? 0.90 : 0.99;
    if (v < start) return 15;
    if (v > end) return 0;
    const pct = (v - start) / (end - start);
    return 15 - pct * 15;
  });

  const ctaOpacity = useSpring(rawCtaOpacity, SPRING);
  const ctaY = useSpring(rawCtaY, SPRING);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCharHighlight(Math.max(0, Math.min(1, v / 0.20)));
  });

  return {
    wrapperRef,
    isHovered,
    setIsHovered,
    charHighlight,
    finalTipY,
    tipOpacity,
    finalBaseY,
    finalBaseX,
    finalBaseScale,
    baseOpacity,
    finalWaterlineOpacity,
    finalWaterlineOpacitySecondary,
    waterlineScaleX,
    finalLabelsOpacity,
    labelsY,
    assemblyFactor,
    statTransforms,
    ctaOpacity,
    ctaY,
  };
}
