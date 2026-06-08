import { useState, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardCarouselProps {
  images: string[];
  title: string;
  isHovered: boolean;
  borderColor: string;
}

export const ProjectCardCarousel = ({
  images,
  title,
  isHovered,
  borderColor,
}: ProjectCardCarouselProps) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (delta: number, e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection(delta);
    setCurrentImgIndex((p) => (p + delta + images.length) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentImgIndex}
          src={images[currentImgIndex]}
          alt={`${title} screenshot ${currentImgIndex + 1}`}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction < 0 ? "100%" : "-100%", opacity: 0 }}
          transition={{ x: { type: "spring", stiffness: 280, damping: 28 }, opacity: { duration: 0.18 } }}
          className="absolute inset-0 w-full h-full select-none"
          style={{
            objectFit: "cover",
            objectPosition: "top",
            filter: isHovered ? "brightness(1) saturate(1)" : "brightness(0.88) saturate(0.75)",
            transition: "filter 0.4s ease",
          }}
          draggable={false}
        />
      </AnimatePresence>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.6) 100%), linear-gradient(160deg, ${borderColor}08 0%, transparent 40%)`,
        }}
      />

      {images.length > 1 && (
        <div
          className="absolute top-3 right-3 font-mono text-[10px] tracking-widest px-2 py-1 z-20"
          style={{
            background: "rgba(8,8,8,0.75)",
            color: "var(--fg-dim)",
            border: "1px solid var(--rule)",
          }}
        >
          {currentImgIndex + 1} / {images.length}
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => go(-1, e)}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full border backdrop-blur-sm transition-all duration-300 z-20"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              background: "rgba(8,8,8,0.6)",
              color: "rgba(240,237,230,0.8)",
              opacity: isHovered ? 1 : 0,
              transform: `translateY(-50%) scale(${isHovered ? 1 : 0.75})`,
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={(e) => go(1, e)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full border backdrop-blur-sm transition-all duration-300 z-20"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              background: "rgba(8,8,8,0.6)",
              color: "rgba(240,237,230,0.8)",
              opacity: isHovered ? 1 : 0,
              transform: `translateY(-50%) scale(${isHovered ? 1 : 0.75})`,
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 py-1.5 px-3 rounded-full border"
            style={{
              background: "rgba(8,8,8,0.65)",
              borderColor: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
              opacity: isHovered ? 1 : 0.75,
              transition: "opacity 0.3s",
            }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDirection(i > currentImgIndex ? 1 : -1);
                  setCurrentImgIndex(i);
                }}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === currentImgIndex ? 18 : 5,
                  background: i === currentImgIndex ? borderColor : "rgba(240,237,230,0.2)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
