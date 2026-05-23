import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const outerSpringConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  const glowSpringConfig = { damping: 35, stiffness: 120, mass: 1.2 };
  const glowX = useSpring(mouseX, glowSpringConfig);
  const glowY = useSpring(mouseY, glowSpringConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Particle[] = [];
    const colors = [
      "rgba(201, 168, 76, ",
      "rgba(236, 72, 153, ",
      "rgba(168, 85, 247, ",
    ];

    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const currentTime = Date.now();

      mouseX.set(currentX);
      mouseY.set(currentY);
      if (!isVisible) setIsVisible(true);

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const dist = Math.hypot(dx, dy);
      const timeDiff = currentTime - lastTime;

      if (dist > 1.5 && timeDiff > 0) {
        const count = Math.min(Math.floor(dist / 2), 4);
        for (let i = 0; i < count; i++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          particles.push({
            x: currentX,
            y: currentY,
            vx: -dx * 0.12 + (Math.random() - 0.5) * 1.5,
            vy: -dy * 0.12 + (Math.random() - 0.5) * 1.5,
            size: Math.random() * 3.5 + 1.2,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.015,
            color,
          });
        }
      }

      lastX = currentX;
      lastY = currentY;
      lastTime = currentTime;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .cursor-pointer")) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .cursor-pointer")) {
        setIsHovered(false);
      }
    };

    const style = document.createElement("style");
    style.innerHTML = `
      @media (hover: hover) and (pointer: fine) {
        body, a, button, [role='button'], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    let animationFrameId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.size *= 0.95;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * 0.65})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      document.head.removeChild(style);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9996,
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9997,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.16) 0%, rgba(168,85,247,0.08) 40%, rgba(99,102,241,0.04) 70%, transparent 100%)",
          filter: "blur(24px)",
          mixBlendMode: "screen",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          background: isHovered
            ? "radial-gradient(circle, rgba(201,168,76,0.22) 0%, rgba(236,72,153,0.12) 35%, rgba(99,102,241,0.08) 70%, transparent 100%)"
            : "radial-gradient(circle, rgba(201,168,76,0.16) 0%, rgba(168,85,247,0.08) 40%, rgba(99,102,241,0.04) 70%, transparent 100%)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 30 }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "var(--gold)",
        }}
        animate={{
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: outerX,
          top: outerY,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1px solid var(--gold)",
        }}
        animate={{
          scale: isHovered ? 1.7 : 1,
          backgroundColor: isHovered ? "rgba(201, 168, 76, 0.08)" : "rgba(201, 168, 76, 0)",
          borderColor: isHovered ? "var(--gold)" : "rgba(201, 168, 76, 0.35)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 25 }}
      />
    </>
  );
};
