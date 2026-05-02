import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import SpaceshipNavigation from "@/components/SpaceshipNavigation";
import bodyPreview from "@/assets/body.png";
import mePreview from "@/assets/me3.png";
import turboTextPreview from "@/assets/turboText.png";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveProject = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestProject = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      projectRefs.current.forEach((projectElement, index) => {
        if (!projectElement) {
          return;
        }

        const rect = projectElement.getBoundingClientRect();
        const projectCenter = rect.top + rect.height / 2;
        const distance = Math.abs(projectCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestProject = index;
        }
      });

      setActiveProject((currentProject) => {
        if (currentProject === closestProject) {
          return currentProject;
        }

        return closestProject;
      });
    };

    const scheduleUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateActiveProject();
      });
    };

    updateActiveProject();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const projects = [
    {
      title: "turboText",
      description:
        "A focused writing interface built to make drafting, editing, and reviewing text feel fast instead of noisy.",
      role: "Frontend build, interaction design",
      timeline: "2025",
      status: "Live concept",
      techStack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      image: turboTextPreview,
      planet: "Mercury",
      color: "amber",
      highlights: [
        "Built a responsive dashboard-style layout with clear writing actions.",
        "Designed hover states and visual feedback for a more tactile workflow.",
        "Structured reusable UI pieces so the interface can grow into more editor tools.",
      ],
      metrics: ["Responsive UI", "Motion polish", "Reusable components"],
      liveUrl: "https://portfolyo-amber.vercel.app/",
      sourceUrl: "https://github.com/mozix5",
    },
    {
      title: "Portfolio System",
      description:
        "A personal portfolio experience with scroll-led animation, themed sections, and a memorable visual identity.",
      role: "Creative direction, frontend engineering",
      timeline: "2026",
      status: "In progress",
      techStack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      image: bodyPreview,
      planet: "Neptune",
      color: "blue",
      highlights: [
        "Created a cinematic hero with a pen split animation tied to scroll progress.",
        "Added section navigation, project tracking, and responsive content layouts.",
        "Balanced decorative motion with readable project, skills, and contact sections.",
      ],
      metrics: ["Scroll animation", "Responsive sections", "Portfolio storytelling"],
      liveUrl: "https://portfolyo-amber.vercel.app/",
      sourceUrl: "https://github.com/mozix5",
    },
    {
      title: "Developer Profile",
      description:
        "A characterful profile section that presents background, stack, and creative direction through a comic-inspired interface.",
      role: "UI design, component implementation",
      timeline: "2026",
      status: "Shipped section",
      techStack: ["React", "Canvas", "Tailwind", "CSS Animation"],
      image: mePreview,
      planet: "Mars",
      color: "red",
      highlights: [
        "Built a distinctive comic-panel layout that avoids a generic about section.",
        "Used animated states to make skills and mission details feel interactive.",
        "Kept the section modular so future experience and resume content can plug in.",
      ],
      metrics: ["Visual identity", "Interactive panels", "Personal brand"],
      liveUrl: "https://portfolyo-amber.vercel.app/",
      sourceUrl: "https://github.com/mozix5",
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
        <div className="relative flex">
          {/*<div className="relative">*/}
          {/*<div className="sticky h-20 top-6 left-0">*/}
          <SpaceshipNavigation
            projects={projects}
            activeProject={activeProject}
          />
          {/*</div>*/}
          {/*</div>*/}
          {/* Project cards */}
          <div className="container mx-auto space-y-40 px-6 pt-[100vh]">
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(element) => {
                  projectRefs.current[index] = element;
                }}
                className="project-card"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  role={project.role}
                  timeline={project.timeline}
                  status={project.status}
                  techStack={project.techStack}
                  image={project.image}
                  planet={project.planet}
                  color={project.color}
                  highlights={project.highlights}
                  metrics={project.metrics}
                  liveUrl={project.liveUrl}
                  sourceUrl={project.sourceUrl}
                  index={index}
                />
              </div>
            ))}
            <div className="h-screen" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
