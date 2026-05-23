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
import { motion } from "framer-motion";
import { TextWipe } from "@/components/ui/text-wipe";

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
    className="relative overflow-hidden border-t"
    style={{ background: "var(--bg)", borderColor: "var(--rule)" }}
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
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <p
          className="font-mono text-[10px] uppercase tracking-[0.45em] mb-4"
          style={{ color: "var(--fg-dim)" }}
        >
          Issue 04 · Toolkit
        </p>
        <h2
          className="font-bebas leading-none tracking-tight"
          style={{ fontSize: "clamp(4rem,12vw,8rem)", color: "var(--fg)" }}
        >
          <TextWipe delay={0.1}>
            <span>The</span>
          </TextWipe>
          <TextWipe delay={0.25}>
            <span
              style={{ WebkitTextStroke: "1px var(--fg)", color: "transparent" }}
            >
              Stack
            </span>
          </TextWipe>
        </h2>
        <div
          className="h-px w-24 mt-4"
          style={{
            background: "linear-gradient(to right, var(--gold), transparent)",
          }}
        />
      </motion.div>

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

      <motion.div
        className="flex items-center gap-4 pt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div
          className="h-px flex-1"
          style={{ background: "var(--rule-light)" }}
        />
        <span
          className="font-mono text-[9px] uppercase tracking-[0.4em]"
          style={{ color: "var(--fg-dim)" }}
        >
          Always expanding
        </span>
        <span style={{ color: "var(--gold)", fontSize: 8 }}>◆</span>
        <div
          className="h-px flex-1"
          style={{ background: "var(--rule-light)" }}
        />
      </motion.div>
    </div>
  </section>
);

export default TechStack;
