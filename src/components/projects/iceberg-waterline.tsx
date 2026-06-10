import { motion, MotionValue } from "framer-motion";
import { WATERLINE_TOP } from "./iceberg-scroll";

interface IcebergWaterlineProps {
  finalWaterlineOpacity: MotionValue<number>;
  finalWaterlineOpacitySecondary: MotionValue<number>;
  waterlineScaleX: MotionValue<number>;
  finalLabelsOpacity: MotionValue<number>;
  labelsY: MotionValue<number>;
}

export function IcebergWaterline({
  finalWaterlineOpacity,
  finalWaterlineOpacitySecondary,
  waterlineScaleX,
  finalLabelsOpacity,
  labelsY,
}: IcebergWaterlineProps) {
  return (
    <div
      className="absolute -left-16 -right-16 md:-left-24 md:-right-24 pointer-events-none z-30"
      style={{ top: WATERLINE_TOP }}
    >
      <div className="relative w-full h-[24px] overflow-hidden flex items-center -top-[6px] mb-1">
        <motion.svg
          className="absolute left-0 w-[200%] h-full"
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          style={{ opacity: finalWaterlineOpacity, scaleX: waterlineScaleX }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M0,12 C150,22 150,2 300,12 C450,22 450,2 600,12 C750,22 750,2 900,12 C1050,22 1050,2 1200,12"
            fill="none"
            stroke="url(#waterline-gradient-1)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="waterline-gradient-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0" />
              <stop offset="25%" stopColor="var(--gold)" stopOpacity="0.5" />
              <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.9" />
              <stop offset="75%" stopColor="var(--gold)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>

        <motion.svg
          className="absolute left-0 w-[200%] h-full"
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          style={{ opacity: finalWaterlineOpacitySecondary, scaleX: waterlineScaleX }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M0,12 C100,2 200,22 300,12 C400,2 500,22 600,12 C700,2 800,22 900,12 C1000,2 1100,22 1200,12"
            fill="none"
            stroke="url(#waterline-gradient-2)"
            strokeWidth="1.0"
          />
          <defs>
            <linearGradient id="waterline-gradient-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <motion.div
        className="flex justify-between items-center mt-2 px-1 mx-16 md:mx-24"
        style={{ opacity: finalLabelsOpacity, y: labelsY }}
      >
        <p
          className="font-mono text-[9px] uppercase tracking-[0.25em]"
          style={{ color: "var(--gold)", background: "var(--bg-base)", padding: "1px 6px" }}
        >
          Waterline
        </p>
        <p
          className="font-mono text-[9px] uppercase tracking-[0.25em]"
          style={{ color: "var(--fg)", opacity: 0.85, background: "var(--bg-base)", padding: "1px 6px" }}
        >
          ~90% hidden
        </p>
      </motion.div>
    </div>
  );
}
