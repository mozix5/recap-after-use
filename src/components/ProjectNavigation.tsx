type ProjectNavigationItem = { title: string };
type Props = { projects: ProjectNavigationItem[]; activeProject: number };

const getPos = (i: number, n: number) => n <= 1 ? 50 : 8 + (i / (n - 1)) * 84;

const ProjectNavigation = ({ projects, activeProject }: Props) => {
  const cursor = getPos(activeProject, projects.length);

  return (
    <div className="sticky left-0 top-0 w-12 z-20 pointer-events-none h-[100vh]">
      {/* Vertical track */}
      <div
        className="absolute left-5 top-[8%] bottom-[8%] w-px"
        style={{ background: "var(--rule-light)" }}
      >
        {/* Fill indicator */}
        <div
          className="absolute top-0 left-0 w-full transition-all duration-400 ease-out"
          style={{ height: `${cursor}%`, background: "linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.3))" }}
        />
      </div>

      {/* Node markers */}
      {projects.map((project, i) => {
        const pos = getPos(i, projects.length);
        const active = i === activeProject;
        return (
          <div
            key={i}
            className="absolute left-[14px] -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${pos}%` }}
          >
            <div
              className="transition-all duration-300"
              style={{
                width: active ? 8 : 5,
                height: active ? 8 : 5,
                background: active ? "var(--gold)" : "var(--fg-dim)",
                boxShadow: active ? "0 0 8px var(--gold)" : "none",
              }}
            />
            {active && (
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-widest"
                style={{ color: "var(--gold)" }}
              >
                {project.title}
              </div>
            )}
          </div>
        );
      })}

      {/* Travelling cursor — small square */}
      <div
        className="absolute left-[14px] -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-out"
        style={{ top: `${cursor}%` }}
      >
        <div style={{ width: 12, height: 12, border: "1px solid var(--gold)", background: "transparent" }} />
      </div>
    </div>
  );
};

export default ProjectNavigation;
