import ReactLenis from "lenis/react";
import { ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisOptions = {
    lerp: 0.08,
    duration: 1.2,
    smoothWheel: true,
    syncTouch: true,
    smoothTouch: false,
  };
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
