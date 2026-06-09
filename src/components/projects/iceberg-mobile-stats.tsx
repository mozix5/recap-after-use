import { motion, MotionValue } from "framer-motion";
import { BELOW_STATS } from "./iceberg-scroll";

interface IcebergMobileStatsProps {
  assemblyFactor: MotionValue<number>;
}

export function IcebergMobileStats({ assemblyFactor }: IcebergMobileStatsProps) {
  return (
    <motion.div
      className="flex xl:hidden flex-col gap-1.5 mt-4 max-w-[340px] w-full px-4"
      style={{ opacity: assemblyFactor }}
    >
      {BELOW_STATS.map((stat, i) => (
        <div key={i} className="flex items-center gap-2 justify-center">
          <span className="font-mono text-[7px]" style={{ color: "var(--gold)", opacity: 0.75 }}>
            ◆
          </span>
          <span
            className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] whitespace-nowrap px-2 py-0.5"
            style={{
              color: "var(--fg)",
              background: "var(--bg-surface)",
              border: "1px solid var(--rule-light)",
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
