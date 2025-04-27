import ReactLenis from "lenis/react";
import { ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisOptions = {
    lerp: 0.2,
    duration: 2.5,
    smooth: true,
    smoothTouch: false,
  };
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
