import { useRef, useEffect } from "react";

const SpaceshipNavigation = ({ projects, activeProject, scrollPosition }) => {
  const spaceshipRef = useRef(null);

  // Calculate spaceship position based on active project and scroll
  useEffect(() => {
    if (spaceshipRef.current) {
      // Position logic for the spaceship
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / totalHeight;

      // Calculate spaceship position (8% to 92% of screen height)
      const position = 8 + scrollPercentage * 84;
      spaceshipRef.current.style.top = `${position}%`;
    }
  }, [scrollPosition]);

  return (
    <div className="sticky left-0 top-0 w-16 z-20 pointer-events-none h-[100vh]">
      {/* Navigation track */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent">
        {/* Project markers */}
        {projects.map((project, index) => {
          // Calculate marker position based on project count and viewport
          const position = 8 + (index / (projects.length - 1)) * 84;
          const isActive = index === activeProject;

          return (
            <div
              key={index}
              className={`absolute w-3 h-3 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-300
                          ${isActive ? "scale-150 bg-white shadow-lg shadow-white/50" : "bg-gray-600"}`}
              style={{ top: `${position}%` }}
            >
              {/* Planet indicator */}
              <div
                className={`absolute left-6 whitespace-nowrap text-xs font-mono
                              transition-all duration-300 ${isActive ? "opacity-100" : "opacity-30"}`}
              >
                {project.planet}
              </div>
            </div>
          );
        })}
      </div>

      {/* Spaceship indicator */}
      <div
        ref={spaceshipRef}
        className="absolute left-8 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
      >
        <div className="relative">
          {/* Spaceship icon */}
          <svg
            width="40"
            height="30"
            viewBox="0 0 40 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform -rotate-90"
          >
            <path d="M20 0L37.3205 25.5H2.67949L20 0Z" fill="white" />
            <path d="M20 5L29.3301 22H10.6699L20 5Z" fill="#121212" />
            <rect
              x="18"
              y="25"
              width="4"
              height="5"
              fill="#FF5B5B"
              className="animate-pulse"
            />
          </svg>

          {/* Engine glow */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full filter blur-md opacity-60 animate-pulse"></div>
        </div>

        {/* Current project info */}
        <div className="absolute top-0 left-12 whitespace-nowrap bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700">
          <div className="text-xs font-mono text-gray-400">
            CURRENT PROJECT:
          </div>
          <div className="text-sm font-medium text-white">
            {projects[activeProject]?.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceshipNavigation;
