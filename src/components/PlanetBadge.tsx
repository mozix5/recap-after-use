import { useRef, useEffect } from "react";

const PlanetBadge = ({ planetName, color, isEven }) => {
  const canvasRef = useRef(null);

  // Planet colors
  const planetColors = {
    Mercury: {
      base: "#E5E5E5",
      shadow: "#ABABAB",
      highlight: "#FFFFFF",
      rings: false,
    },
    Venus: {
      base: "#FFD085",
      shadow: "#D4A76A",
      highlight: "#FFF6E5",
      rings: false,
    },
    Earth: {
      base: "#5B7BD6",
      shadow: "#2C3C6B",
      highlight: "#BAEEFF",
      rings: false,
    },
    Mars: {
      base: "#FF6B5B",
      shadow: "#B94A3E",
      highlight: "#FFCBC5",
      rings: false,
    },
    Jupiter: {
      base: "#FFCB8A",
      shadow: "#D4A96F",
      highlight: "#FFF6DC",
      rings: true,
    },
    Saturn: {
      base: "#FFF0AA",
      shadow: "#D4C98F",
      highlight: "#FFFBE5",
      rings: true,
    },
    Uranus: {
      base: "#8BE0E0",
      shadow: "#5DA0A0",
      highlight: "#D9FFFF",
      rings: true,
    },
    Neptune: {
      base: "#5B9BFF",
      shadow: "#3B65A8",
      highlight: "#C5DFFF",
      rings: false,
    },
    Pluto: {
      base: "#E5E5E5",
      shadow: "#ABABAB",
      highlight: "#FFFFFF",
      rings: false,
    },
  };

  const planetColor = planetColors[planetName] || planetColors.Earth;

  // Use canvas to draw planet
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw planet
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 3;

    // Planet base
    const gradient = ctx.createRadialGradient(
      centerX - radius / 3,
      centerY - radius / 3,
      0,
      centerX,
      centerY,
      radius,
    );
    gradient.addColorStop(0, planetColor.highlight);
    gradient.addColorStop(0.5, planetColor.base);
    gradient.addColorStop(1, planetColor.shadow);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw rings if applicable
    if (planetColor.rings) {
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        radius * 1.8,
        radius * 0.5,
        Math.PI / 6,
        0,
        2 * Math.PI,
      );
      ctx.strokeStyle = planetColor.highlight;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        radius * 1.5,
        radius * 0.4,
        Math.PI / 6,
        0,
        2 * Math.PI,
      );
      ctx.strokeStyle = planetColor.base;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Add surface details/texture
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distanceFromCenter = Math.random() * (radius * 0.8);
      const spotRadius = Math.random() * (radius * 0.15) + radius * 0.05;

      const spotX = centerX + Math.cos(angle) * distanceFromCenter;
      const spotY = centerY + Math.sin(angle) * distanceFromCenter;

      ctx.beginPath();
      ctx.arc(spotX, spotY, spotRadius, 0, 2 * Math.PI);
      ctx.fillStyle = planetColor.shadow + "80"; // Add transparency
      ctx.fill();
    }

    // Add atmosphere glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.1, 0, 2 * Math.PI);
    const glowGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      radius,
      centerX,
      centerY,
      radius * 1.2,
    );
    glowGradient.addColorStop(0, planetColor.highlight + "40");
    glowGradient.addColorStop(1, planetColor.highlight + "00");
    ctx.fillStyle = glowGradient;
    ctx.fill();
  }, [planetName]);

  return (
    <div
      className={`absolute ${isEven ? "-left-8" : "-right-8"} top-1/2 transform -translate-y-1/2`}
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          width="80"
          height="80"
          className="rounded-full"
        ></canvas>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-gray-400 whitespace-nowrap">
          {planetName}
        </div>
      </div>
    </div>
  );
};

export default PlanetBadge;
