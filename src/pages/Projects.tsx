import { useEffect, useState, useRef } from "react";
import ProjectCard from "@/components/ProjectCard";
import SpaceshipNavigation from "@/components/SpaceshipNavigation";

const Projects = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef(null);

  // Handle scroll to update spaceship position and active project
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition(window.scrollY);

        // Calculate which project is currently in view
        const projectElements = document.querySelectorAll(".project-card");
        projectElements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          if (
            rect.top < window.innerHeight / 2 &&
            rect.bottom > window.innerHeight / 2
          ) {
            setActiveProject(index);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "turboText",
      description:
        "The Innovation Collaboration Group - a PropTech collective providing new solutions for the property industry.",
      techStack: ["React", "TypeScript", "Node.js"],
      image: "/turboText.png", // Replace with your actual image path
      planet: "Mercury",
      color: "amber",
    },
    {
      title: "Nebula Navigator",
      description:
        "A spatial visualization tool for complex data structures with interactive 3D mapping capabilities.",
      techStack: ["Three.js", "D3", "WebGL"],
      image: "/nebula.png", // Replace with your actual image path
      planet: "Neptune",
      color: "blue",
    },
    {
      title: "Quantum Quill",
      description:
        "An AI-powered content creation platform that generates text with the unpredictability of quantum mechanics.",
      techStack: ["Python", "TensorFlow", "GPT-4"],
      image: "/quantum.png", // Replace with your actual image path
      planet: "Mars",
      color: "red",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-black min-h-screen text-white mx-[190px]"
    >
      {/*Space travel progress indicator */}
      {/*<SpaceshipNavigation*/}
      {/*  projects={projects}*/}
      {/*  activeProject={activeProject}*/}
      {/*  scrollPosition={scrollPosition}*/}
      {/*/>*/}

      {/* Content container */}
      <div className="z-10 pt-32 pb-64">
        {/* Header section */}
        <header className="container mx-auto px-6 mb-40">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-50 blur-xl rounded-full"></div>
              <h1 className="relative text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">
                STELLAR PROJECTS
              </h1>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
            </div>
            <p className="mt-8 text-cyan-200 text-xl max-w-2xl mx-auto leading-relaxed">
              Journey through my portfolio of work across the digital universe,
              from interactive web applications to cutting-edge experiments in
              code.
            </p>

            {/* Spaceship dashboard elements */}
            <div className="mt-16 flex justify-center space-x-10">
              <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500 animate-pulse"></div>
                <div className="text-green-300 font-mono text-sm">
                  NAVIGATION ONLINE
                </div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500 animate-ping"></div>
                <div className="text-blue-300 font-mono text-sm">
                  SCANNING FOR PROJECTS
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="flex relative h-[300vh]">
          {/*<div className="relative">*/}
          {/*<div className="sticky h-20 top-6 left-0">*/}
          <SpaceshipNavigation
            projects={projects}
            activeProject={activeProject}
            scrollPosition={scrollPosition}
          />
          {/*</div>*/}
          {/*</div>*/}
          {/* Project cards */}
          <div className="space-y-64 container mx-auto px-6">
            {projects.map((project, index) => (
              <div key={index} className="">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  image={project.image}
                  planet={project.planet}
                  color={project.color}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
