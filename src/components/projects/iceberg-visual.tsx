import { motion, MotionValue } from "framer-motion";
import icebergImg from "@/assets/iceberg2.png";
import { BELOW_STATS } from "./iceberg-scroll";
import { IcebergWaterline } from "./iceberg-waterline";

interface IcebergVisualProps {
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
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
  statTransforms: Array<{ opacity: MotionValue<number>; x: MotionValue<number> }>;
}

export function IcebergVisual({
  isHovered,
  onMouseEnter,
  onMouseLeave,
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
  statTransforms,
}: IcebergVisualProps) {
  return (
    <div
      className="relative w-full max-w-[270px] sm:max-w-[320px] md:max-w-[400px] mx-auto aspect-[431/548]"
      style={{ cursor: "crosshair" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{
          width: "80%",
          height: "70%",
          top: "25%",
          background: "radial-gradient(circle, rgba(201, 168, 76, 0.15) 0%, transparent 70%)",
          filter: "blur(30px)",
          zIndex: 0,
        }}
        animate={{ opacity: isHovered ? 1 : 0.2, scale: isHovered ? 1.05 : 0.95 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          clipPath: "inset(22% 0 0 0)",
          y: finalBaseY,
          x: finalBaseX,
          scale: finalBaseScale,
          opacity: baseOpacity,
        }}
      >
        <motion.img
          src={icebergImg}
          alt="Submerged base of the iceberg"
          className="w-full h-full object-cover select-none"
          style={{
            filter: isHovered
              ? "brightness(0.95) saturate(0.85) drop-shadow(0 0 12px rgba(201,168,76,0.25))"
              : "brightness(0.78) saturate(0.6) opacity(0.85)",
            transition: "filter 0.5s ease",
          }}
          draggable={false}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ clipPath: "inset(0 0 78% 0)", y: finalTipY, opacity: tipOpacity }}
      >
        <motion.img
          src={icebergImg}
          alt="Visible tip of the iceberg"
          className="w-full h-full object-cover select-none"
          style={{
            filter: isHovered ? "brightness(1) saturate(1)" : "brightness(0.85) saturate(0.7)",
            transition: "filter 0.5s ease",
          }}
          draggable={false}
        />
      </motion.div>

      {BELOW_STATS.map((stat, i) => (
        <motion.div
          key={i}
          className="absolute hidden xl:flex items-center gap-2 z-30 group cursor-pointer pointer-events-auto"
          style={{
            top: stat.top,
            ...(stat.side === "left"
              ? { right: "calc(100% + 20px)" }
              : { left: "calc(100% + 20px)" }),
            flexDirection: stat.side === "left" ? "row-reverse" : "row",
            opacity: statTransforms[i].opacity,
            x: statTransforms[i].x,
          }}
        >
          <span
            className="font-mono text-[8px] transition-all duration-300 group-hover:scale-125 select-none"
            style={{
              color: "var(--gold)",
              filter: "drop-shadow(0 0 3px rgba(201, 168, 76, 0.7))",
            }}
          >
            ◆
          </span>
          <div className="h-[1px] w-8 border-t border-dashed border-[var(--rule-light)] group-hover:border-solid group-hover:border-[var(--gold)] transition-all duration-300" />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap px-3 py-1.5 rounded transition-all duration-300 border border-[var(--rule-light)] group-hover:border-[var(--gold)] group-hover:shadow-[0_0_12px_rgba(201,168,76,0.15)]"
            style={{
              color: "var(--fg)",
              background: "rgba(16, 16, 16, 0.85)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span className="text-[var(--gold)] mr-2 font-semibold">0{i + 1}</span>
            <span className="text-[var(--fg-dim)] mr-2">/</span>
            <span>{stat.label}</span>
          </span>
        </motion.div>
      ))}

      <IcebergWaterline
        finalWaterlineOpacity={finalWaterlineOpacity}
        finalWaterlineOpacitySecondary={finalWaterlineOpacitySecondary}
        waterlineScaleX={waterlineScaleX}
        finalLabelsOpacity={finalLabelsOpacity}
        labelsY={labelsY}
      />
    </div>
  );
}
