import { motion, MotionValue } from "framer-motion";
import { BELOW_STATS } from "./iceberg-scroll";

interface IcebergMobileStatsProps {
  assemblyFactor: MotionValue<number>;
}

export function IcebergMobileStats({ assemblyFactor }: IcebergMobileStatsProps) {
  return (
    <motion.div
      className="flex xl:hidden flex-col gap-2 mt-4 max-w-[270px] sm:max-w-[320px] md:max-w-[340px] w-full px-4"
      style={{ opacity: assemblyFactor }}
    >
      {BELOW_STATS.map((stat, i) => (
        <div
          key={i}
          className="flex items-center gap-2 justify-center font-mono text-[9px] uppercase tracking-[0.15em] whitespace-nowrap px-3 py-1.5 rounded border border-[var(--rule-light)]"
          style={{
            color: "var(--fg)",
            background: "rgba(16, 16, 16, 0.85)",
            backdropFilter: "blur(4px)",
          }}
        >
          <span
            className="text-[8px] select-none"
            style={{
              color: "var(--gold)",
              filter: "drop-shadow(0 0 2px rgba(201, 168, 76, 0.6))",
            }}
          >
            ◆
          </span>
          <span className="text-[var(--gold)] font-semibold">0{i + 1}</span>
          <span className="text-[var(--fg-dim)]">/</span>
          <span>{stat.label}</span>
        </div>
      ))}
    </motion.div>
  );
}
