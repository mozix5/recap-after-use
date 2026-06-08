import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { 
  SiJavascript, 
  SiGithub, 
  SiMongodb, 
  SiReact, 
  SiNextdotjs, 
  SiRedux, 
  SiNodedotjs, 
  SiMysql, 
  SiTypescript, 
  SiVercel,
  SiTailwindcss
} from "react-icons/si";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionDivider } from "@/components/ui/section-divider";
import { sections } from "@/data/content";

const HoverIcon = ({ children, name }: { children: React.ReactNode; name: string }) => (
  <div className="group flex h-full w-full items-center justify-center cursor-pointer">
    {children}
    <div
      className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap px-2 py-1 rounded shadow-md z-50 font-mono text-[9px] uppercase tracking-widest"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--rule-light)",
        color: "var(--gold)",
      }}
    >
      {name}
    </div>
  </div>
);

const TechStack = () => (
  <section
    className="relative overflow-hidden"
    style={{ background: "var(--bg)" }}
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--rule-light) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    <div className="relative mx-auto max-w-6xl px-4 sm:px-8 lg:px-16 py-24">
      <SectionHeader
        issueNumber={sections.techStack.issueNumber}
        issueTitle={sections.techStack.issueTitle}
        titlePrimary={sections.techStack.titlePrimary}
        titleStroked={sections.techStack.titleStroked}
        className="mb-6"
        showShortDivider
      />

      <div className="relative flex h-[480px] w-full flex-col items-center justify-center">
        <span
          className="pointer-events-none whitespace-pre-wrap bg-clip-text text-center text-7xl font-semibold leading-none text-transparent font-bebas"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--fg), var(--fg-dim))",
          }}
        >
          Tools
        </span>
        <OrbitingCircles iconSize={52} radius={140}>
          <HoverIcon name="JavaScript"><SiJavascript className="w-full h-full p-2 text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
          <HoverIcon name="GitHub"><SiGithub className="w-full h-full p-2 text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
          <HoverIcon name="MongoDB"><SiMongodb className="w-full h-full p-2 text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
          <HoverIcon name="React"><SiReact className="w-full h-full p-2 text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
        </OrbitingCircles>
        <OrbitingCircles radius={200} reverse speed={2} iconSize={46}>
          <HoverIcon name="Next.js"><SiNextdotjs className="w-full h-full p-[7px] text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
          <HoverIcon name="Redux"><SiRedux className="w-full h-full p-[7px] text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
          <HoverIcon name="Node.js"><SiNodedotjs className="w-full h-full p-[7px] text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
          <HoverIcon name="Tailwind CSS"><SiTailwindcss className="w-full h-full p-[7px] text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
          <HoverIcon name="MySQL"><SiMysql className="w-full h-full p-[7px] text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
          <HoverIcon name="TypeScript"><SiTypescript className="w-full h-full p-[7px] text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
          <HoverIcon name="Vercel"><SiVercel className="w-full h-full p-[7px] text-[var(--fg-dim)] group-hover:text-[var(--gold)] transition-colors duration-300" /></HoverIcon>
        </OrbitingCircles>
      </div>

      <SectionDivider text="Always expanding" />
    </div>
  </section>
);

export default TechStack;
