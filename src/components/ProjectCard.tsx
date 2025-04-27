import { useState, useRef, useEffect } from "react";
import PlanetBadge from "@/components/PlanetBadge";

const ProjectCard = ({
  title,
  description,
  techStack,
  image,
  planet,
  color,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  // Check if card is in viewport for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Color schemes based on planet type
  const colorSchemes: any = {
    amber: {
      primary: "from-amber-400 to-orange-600",
      secondary: "amber-300",
      accent: "amber-500",
      darkAccent: "amber-900",
      lightAccent: "amber-200",
    },
    blue: {
      primary: "from-blue-400 to-indigo-600",
      secondary: "blue-300",
      accent: "blue-500",
      darkAccent: "blue-900",
      lightAccent: "blue-200",
    },
    red: {
      primary: "from-red-400 to-rose-600",
      secondary: "red-300",
      accent: "red-500",
      darkAccent: "red-900",
      lightAccent: "red-200",
    },
    purple: {
      primary: "from-purple-400 to-fuchsia-600",
      secondary: "purple-300",
      accent: "purple-500",
      darkAccent: "purple-900",
      lightAccent: "purple-200",
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      {/* Space coordinates */}
      <div
        className={`absolute ${isEven ? "-left-4 top-0" : "-right-4 top-0"} text-xs font-mono text-gray-500`}
      >
        SECTOR: X-{(index + 1) * 243} Y-{(index + 2) * 118}
      </div>

      {/* Planet badge */}
      <PlanetBadge planetName={planet} color={color} isEven={isEven} />

      {/* Main card */}
      <div
        className={`relative ${isEven ? "ml-12" : "mr-12"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Spaceship scanner beam effect */}

        {/* Card container */}
        <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-800 overflow-hidden shadow-xl transform transition-all duration-500 hover:shadow-2xl">
          {/* Cockpit-style interface header */}
          <div
            className={`bg-gray-950 border-b border-gray-800 px-6 py-4 flex items-center justify-between`}
          >
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full bg-${scheme.accent} mr-3`}
              ></div>
              <h3 className="font-mono text-sm text-gray-400">
                PROJECT_ID:{index + 1}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-green-500">ONLINE</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {new Date().getFullYear()}
              </div>
            </div>
          </div>

          {/* Project content */}
          <div
            className={`flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"}`}
          >
            {/* Project info section */}
            <div className="md:w-1/2 p-8">
              {/* Title with spacecraft dashboard style */}
              <div className="mb-6">
                <h2
                  className={`text-4xl font-bold text-${scheme.secondary} leading-tight`}
                >
                  {title}
                </h2>
                <div
                  className={`h-1 w-24 bg-gradient-to-r ${scheme.primary} rounded-full mt-4`}
                ></div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-8 leading-relaxed">
                {description}
              </p>

              {/* Tech stack */}
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <div className={`h-4 w-1 bg-${scheme.accent} mr-2`}></div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-400 font-mono">
                    Tech Specifications
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-lg text-xs bg-gray-800 text-${scheme.lightAccent} border border-${scheme.darkAccent}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  className={`bg-${scheme.darkAccent} hover:bg-${scheme.accent} text-${scheme.lightAccent} px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2 group`}
                >
                  <span>View Project</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-${scheme.lightAccent}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
                <button
                  className={`border border-${scheme.darkAccent} text-${scheme.secondary} px-6 py-3 rounded-lg hover:bg-${scheme.darkAccent}/30 transition-colors duration-300`}
                >
                  Source Code
                </button>
              </div>
            </div>

            {/* Project image/visual section */}
            <div className="md:w-1/2 relative">
              {/* Spaceship viewport frame */}
              <div className="h-full p-6 flex items-center justify-center">
                <div className="relative rounded-lg w-full h-full overflow-hidden">
                  {/* Viewport frame */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-transparent to-gray-800 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-transparent to-gray-800 pointer-events-none"></div>

                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-600"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-600"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-600"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-600"></div>

                  {/* Project image */}
                  <div className="absolute inset-4 bg-black">
                    <div className="w-full h-full relative overflow-hidden">
                      <img
                        src={image}
                        alt={title}
                        className={`w-full h-full object-cover filter transition-all duration-500 ${isHovered ? "brightness-110 scale-105" : "brightness-75 scale-100"}`}
                      />

                      {/* Scan line effect */}
                      <div className="absolute inset-0 bg-scan-lines opacity-30 pointer-events-none"></div>

                      {/* UI overlay elements */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <div className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg border border-gray-700 text-xs font-mono text-white/90">
                          {planet} SECTOR
                        </div>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full bg-${scheme.accent} animate-ping opacity-75`}
                          ></div>
                          <div
                            className={`text-${scheme.accent} text-xs font-mono`}
                          >
                            ACTIVE
                          </div>
                        </div>
                      </div>

                      {/* Target reticle animation on hover */}
                      {isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div
                            className={`w-32 h-32 rounded-full border-2 border-${scheme.accent} opacity-70 animate-ping`}
                          ></div>
                          <div
                            className={`absolute w-24 h-24 rounded-full border border-${scheme.accent} opacity-50`}
                          ></div>
                          <div
                            className={`absolute w-16 h-16 rounded-full border border-${scheme.accent} opacity-60`}
                          ></div>
                          <div
                            className={`absolute w-2 h-16 bg-${scheme.accent} opacity-70`}
                          ></div>
                          <div
                            className={`absolute w-16 h-2 bg-${scheme.accent} opacity-70`}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard footer */}
          <div className="bg-gray-950 border-t border-gray-800 px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-2 rounded-full bg-${scheme.accent}`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full bg-${scheme.accent} animate-ping opacity-50`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full bg-${scheme.accent}`}
                ></div>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                LOG: PROJECT_SCAN_COMPLETE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
