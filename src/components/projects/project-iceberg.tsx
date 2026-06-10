import { motion } from "framer-motion";
import { useIcebergScroll } from "./iceberg-scroll";
import { IcebergTitle } from "./iceberg-title";
import { IcebergVisual } from "./iceberg-visual";
import { IcebergMobileStats } from "./iceberg-mobile-stats";
import { IcebergCta } from "./iceberg-cta";

interface ProjectIcebergProps {
  className?: string;
}

export const ProjectIceberg = ({ className = "" }: ProjectIcebergProps) => {
  const {
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
  } = useIcebergScroll();

  return (
    <div
      ref={wrapperRef}
      className="relative mx-[-4px] sm:mx-[-8px] lg:mx-[-16px] xl:mx-[-190px] w-[calc(100%+8px)] sm:w-[calc(100%+16px)] lg:w-[calc(100%+32px)] xl:w-[calc(100%+380px)] h-[220vh] xl:h-[300vh]"
    >
      <motion.div
        className={`sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-center overflow-hidden ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <IcebergTitle charHighlight={charHighlight} />

        <IcebergVisual
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          finalTipY={finalTipY}
          tipOpacity={tipOpacity}
          finalBaseY={finalBaseY}
          finalBaseX={finalBaseX}
          finalBaseScale={finalBaseScale}
          baseOpacity={baseOpacity}
          finalWaterlineOpacity={finalWaterlineOpacity}
          finalWaterlineOpacitySecondary={finalWaterlineOpacitySecondary}
          waterlineScaleX={waterlineScaleX}
          finalLabelsOpacity={finalLabelsOpacity}
          labelsY={labelsY}
          statTransforms={statTransforms}
        />

        <IcebergMobileStats assemblyFactor={assemblyFactor} />
        <IcebergCta ctaOpacity={ctaOpacity} ctaY={ctaY} />
      </motion.div>
    </div>
  );
};
