import ReactLenis from "lenis/react";
import { ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisOptions = {
    lerp: 0.05,
    smoothWheel: true,
    syncTouch: false,
  };
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
