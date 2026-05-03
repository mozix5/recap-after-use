import { Briefcase, Code2, GraduationCap, Rocket } from "lucide-react";
import turboTextPreview from "@/assets/turboText.png";
import bodyPreview from "@/assets/body.png";
import mePreview from "@/assets/me3.png";
import { FaGithubAlt, FaLinkedinIn, FaCode } from "react-icons/fa";

// ── Profile Data ── //
export const profileData = {
  tickerItems: [
    "Frontend Developer",
    "React",
    "TypeScript",
    "Framer Motion",
    "UI/UX",
    "Node.js",
    "Open to Work",
    "Based in India",
  ],
  stats: [
    { value: "2+", label: "Years" },
    { value: "4+", label: "Projects" },
    { value: "∞", label: "Curiosity" },
  ],
  quote: "“I bridge creativity with code — building interfaces that are not only functional but genuinely memorable.”",
  description: "From the first line of HTML I wrote, I knew that web development was where my heart and passion would thrive. I'm a digital craftsman who values craft, precision, and the details that make an interface feel alive.",
  objective: "Making the web a better place — one pixel, one component, one meaningful interaction at a time."
};

// ── Experience Data ── //
export const timeline = [
  {
    period: "2026",
    issue: "03",
    title: "Portfolio Experience",
    label: "Currently Building",
    icon: Rocket,
    description:
      "Designing a motion-rich portfolio with scroll animation, case-study cards, responsive sections, and a strong personal identity.",
    points: ["Framer Motion scroll systems", "Responsive React layouts"],
  },
  {
    period: "2025",
    issue: "02",
    title: "Frontend Projects",
    label: "React / TypeScript",
    icon: Code2,
    description:
      "Built interactive interfaces focused on component structure, visual polish, hover states, and clean user flows.",
    points: ["Reusable UI components", "Tailwind interface systems"],
  },
  {
    period: "2024",
    issue: "01",
    title: "Full-Stack Foundations",
    label: "Learning Track",
    icon: Briefcase,
    description:
      "Expanded from frontend into backend fundamentals, API thinking, database basics, and deployable web apps.",
    points: ["Node.js and MongoDB basics", "GitHub and Vercel workflow"],
  },
  {
    period: "∞",
    issue: "00",
    title: "CS Growth",
    label: "Education",
    icon: GraduationCap,
    description:
      "Continuing to sharpen programming fundamentals, product thinking, and the craft of building memorable web experiences.",
    points: ["Problem solving", "UI engineering taste"],
  },
];

// ── Projects Data ── //
export const projects = [
  {
    title: "turboText",
    description:
      "A focused writing interface built to make drafting, editing, and reviewing text feel fast instead of noisy.",
    role: "Frontend build, interaction design",
    timeline: "2025",
    status: "Live",
    techStack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    image: turboTextPreview,
    color: "gold",
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
    color: "white",
    highlights: [
      "Created a cinematic hero with a pen split animation tied to scroll progress.",
      "Added section navigation, project tracking, and responsive content layouts.",
      "Balanced decorative motion with readable project, skills, and contact sections.",
    ],
    metrics: [
      "Scroll animation",
      "Responsive sections",
      "Portfolio storytelling",
    ],
    liveUrl: "https://portfolyo-amber.vercel.app/",
    sourceUrl: "https://github.com/mozix5",
  },
  {
    title: "Developer Profile",
    description:
      "A characterful profile section that presents background, stack, and creative direction through an editorial interface.",
    role: "UI design, component implementation",
    timeline: "2026",
    status: "Shipped",
    techStack: ["React", "Canvas", "Tailwind", "CSS Animation"],
    image: mePreview,
    color: "dim",
    highlights: [
      "Built a distinctive editorial layout that avoids a generic about section.",
      "Used animated states to make skills and mission details feel interactive.",
      "Kept the section modular so future experience and resume content can plug in.",
    ],
    metrics: ["Visual identity", "Interactive panels", "Personal brand"],
    liveUrl: "https://portfolyo-amber.vercel.app/",
    sourceUrl: "https://github.com/mozix5",
  },
];

// ── Contact Data ── //
export const socials = [
  { href: "https://github.com/mozix5", label: "GitHub", icon: FaGithubAlt },
  {
    href: "https://www.linkedin.com/in/mosin-md-86569a202/",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  { href: "https://github.com/mozix5", label: "Portfolio", icon: FaCode },
];
