import { useState, useRef, useEffect } from "react";
import PlanetBadge from "@/components/PlanetBadge";
import { ArrowUpRight, Github, Radar } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  role: string;
  timeline: string;
  status: string;
  techStack: string[];
  image: string;
  planet: string;
  color: string;
  highlights: string[];
  metrics: string[];
  liveUrl: string;
  sourceUrl: string;
  index: number;
};
const ProjectCard = ({
  title,
  description,
  role,
  timeline,
  status,
  techStack,
  image,
  planet,
  color,
  highlights,
  metrics,
  liveUrl,
  sourceUrl,
  index,
}: ProjectCardProps) => {
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
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#07090d]/90 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-[#0b0f15]/95">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
            <div className="flex items-center font-mono text-xs uppercase tracking-widest text-gray-500">
              <div
                className={`mr-3 h-2 w-2 rounded-full bg-${scheme.accent}`}
              ></div>
              CASE_{String(index + 1).padStart(2, "0")}
            </div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
              <span className="text-green-400">{status}</span>
              <span className="text-gray-600">/</span>
              <span className="text-gray-500">{timeline}</span>
            </div>
          </div>

          <div
            className={`grid gap-0 lg:grid-cols-[0.95fr_1.05fr] ${isEven ? "" : "lg:[&>*:first-child]:order-2"}`}
          >
            <div className="p-5 sm:p-6">
              <div className="mb-5">
                <h2
                  className={`text-3xl font-semibold text-${scheme.secondary} leading-tight sm:text-4xl`}
                >
                  {title}
                </h2>
                <div
                  className={`mt-3 h-px w-24 bg-gradient-to-r ${scheme.primary}`}
                ></div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-widest text-gray-300">
                  {role}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-widest text-gray-300">
                  {metrics[0]}
                </span>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-gray-300 sm:text-base">
                {description}
              </p>

              <div className="mb-6">
                <div className="mb-3 flex items-center">
                  <Radar className={`mr-2 h-4 w-4 text-${scheme.accent}`} />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500">
                    What changed
                  </h3>
                </div>
                <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
                  {highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span
                        className={`mt-2 h-1 w-1 shrink-0 rounded-full bg-${scheme.accent}`}
                      ></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full border border-${scheme.darkAccent} bg-black/30 px-3 py-1 text-xs text-${scheme.lightAccent}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`group inline-flex items-center gap-2 rounded-full bg-${scheme.darkAccent} px-4 py-2.5 text-sm text-${scheme.lightAccent} transition-colors duration-300 hover:bg-${scheme.accent}`}
                >
                  <span>Live Preview</span>
                  <ArrowUpRight
                    className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-${scheme.lightAccent}`}
                  />
                </a>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center rounded-full border border-${scheme.darkAccent} px-4 py-2.5 text-sm text-${scheme.secondary} transition-colors duration-300 hover:bg-${scheme.darkAccent}/30`}
                >
                  <Github className="mr-2 inline h-4 w-4" />
                  Source Code
                </a>
              </div>
            </div>

            <div className="relative border-t border-white/10 p-4 lg:border-l lg:border-t-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
                <img
                  src={image}
                  alt={title}
                  className={`h-full w-full object-cover transition-all duration-500 ${isHovered ? "scale-105 brightness-105" : "scale-100 brightness-75"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20"></div>
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/80 backdrop-blur">
                    {planet}
                  </span>
                  <span className={`font-mono text-xs uppercase text-${scheme.accent}`}>
                    Active
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {metrics.slice(0, 3).map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white/75 backdrop-blur"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
