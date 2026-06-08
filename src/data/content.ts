import { Code2, GraduationCap, Rocket } from "lucide-react";
import { FaGithubAlt, FaLinkedinIn, FaCode } from "react-icons/fa";

// View Box images
import viewBox01 from "@/assets/view-box/01_homepage.png";
import viewBox02 from "@/assets/view-box/02_signup.png";
import viewBox03 from "@/assets/view-box/03_signup_completed.png";
import viewBox04 from "@/assets/view-box/04_movie_details.png";
import viewBox05 from "@/assets/view-box/05_movie_details_added_watchlist.png";
import viewBox06 from "@/assets/view-box/06_watchlist.png";
import viewBox07 from "@/assets/view-box/07_profile.png";

// Pet Pal images
import petPal0 from "@/assets/pet-pal/0_login.png";
import petPal1 from "@/assets/pet-pal/1_dashboard.png";
import petPal2 from "@/assets/pet-pal/2_store.png";
import petPal3 from "@/assets/pet-pal/3_breeding.png";
import petPal4 from "@/assets/pet-pal/4_vetcare.png";
import petPal5 from "@/assets/pet-pal/5_social.png";
import petPal6 from "@/assets/pet-pal/6_boarding.png";
import petPalAuth from "@/assets/pet-pal/auth.png";

// Issue Tracker images
import issueCreate from "@/assets/issue-tracker/create_issue.png";
import issueDashboard from "@/assets/issue-tracker/dashboard.png";
import issueDetails from "@/assets/issue-tracker/issue_details.png";
import issueList from "@/assets/issue-tracker/issues_list.png";
import issueKanban from "@/assets/issue-tracker/kanban_board.png";
import issueSignin from "@/assets/issue-tracker/signin.png";

// Turbo Text images
import turboText1 from "@/assets/turbo-text/2026-05-23_16-50-46.png";
import turboText2 from "@/assets/turbo-text/2026-05-23_16-51-16.png";


// ── Profile Data ── //
export const profileData = {
  tickerItems: [
    "Software Engineer",
    "System Architect",
    "Performance Focused",
  ],
  stats: [
    { value: "1+", label: "Years" },
    { value: "3+", label: "Systems" },
    { value: "100%", label: "Intent" },
  ],
  quote: "“Code is cheap. Impact is everything.”",
  description: "I build high-performance systems and visceral interfaces. No unnecessary code. Just architecture that breathes.",
  objective: "Engineering the inevitable."
};

// ── Experience Data ── //
export const timeline = [
  {
    period: "2025",
    issue: "03",
    title: "The SaaS Architect",
    label: "Sterling Software · CAMS Group",
    icon: Rocket,
    description:
      "Remediated session architecture and API performance to secure a high-stakes, live distributor commission system. When the noise settled, efficiency rose by 30%.",
    points: [
      "Architected high-velocity Node.js pipelines.",
      "Engineered bulletproof session architectures.",
      "Resolved deep concurrency bottlenecks.",
      "Secured fintech surfaces against critical vulnerabilities.",
      "Transformed accessibility into a default state."
    ],
  },
  {
    period: "2023",
    issue: "02",
    title: "The System Intern",
    label: "Celebal Technologies",
    icon: Code2,
    description:
      "Authored a universal interface language, accelerating product delivery speeds. A translation of abstract design into robust, reusable components.",
    points: [
      "Curated a 15-component React design system.",
      "Bridged complex systems with seamless REST APIs.",
      "Eliminated friction across production environments.",
      "Optimized digital performance to the millisecond."
    ],
  },
  {
    period: "2020–2024",
    issue: "01",
    title: "The Foundation",
    label: "Lovely Professional University",
    icon: GraduationCap,
    description:
      "Mastered the core mathematics and logic of computation. The foundational rules of syntax, systems, and algorithms that guide the hand.",
    points: [
      "Mastered the science of computation with a CGPA of 7.5.",
      "Certified in React interface engineering.",
      "Forged through rigorous full-stack training."
    ],
  },
];

// ── Projects Data ── //
export const projects = [
  {
    title: "View Box",
    description:
      "A cinematic film database. Architecting state layers to bridge the gap between heavy data feeds and immediate, immersive rendering.",
    role: "Full-Stack Developer",
    timeline: "2025",
    status: "Live",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Redux", "TMDB API"],
    images: [
      viewBox01,
      viewBox02,
      viewBox03,
      viewBox04,
      viewBox05,
      viewBox06,
      viewBox07,
    ],
    color: "gold",
    highlights: [
      "Architected a service-oriented state layer, silencing redundant network chatter.",
      "Engineered real-time discovery with debounced precision.",
      "Sculpted an immersive, glassmorphic experience that breathes."
    ],
    metrics: ["SaaS Caching", "Cinematic Motion", "State Design"],
    liveUrl: "https://viewbox-two.vercel.app/",
    sourceUrl: "https://github.com/mozix5/ViewBox",
  },
  {
    title: "Pet Pal",
    description:
      "A multi-service veterinary interface. Integrating real-time WebSockets and algorithmic helpers to simplify care matching.",
    role: "Full-Stack Developer",
    timeline: "2025",
    status: "Shipped",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Redux"],
    images: [
      petPal1,
      petPal0,
      petPal2,
      petPal3,
      petPal4,
      petPal5,
      petPal6,
      petPalAuth,
    ],
    color: "white",
    highlights: [
      "Infused intelligent automation into core user flows via AI.",
      "Forged real-time, WebSocket-driven connections.",
      "Unified social and commerce into a seamless digital ecosystem."
    ],
    metrics: ["Unified Platform", "WebSockets", "Intelligent Scoring"],
    liveUrl: "https://pet-pal-iota.vercel.app/auth",
    sourceUrl: "https://github.com/mozix5/PetPal",
  },
  {
    title: "Issue Tracker",
    description:
      "An analytical workflow tracker. Designing a robust PostgreSQL schema and role permissions to structure collaborative engineering pipelines.",
    role: "Full-Stack Developer",
    timeline: "2025",
    status: "Live · Vercel",
    techStack: ["Next.js", "MySQL", "Recharts", "NextAuth.js", "Supabase", "PostgreSQL"],
    images: [
      issueDashboard,
      issueKanban,
      issueDetails,
      issueList,
      issueCreate,
      issueSignin,
    ],
    color: "dim",
    highlights: [
      "Enforced unbreakable role-based access control.",
      "Visualized complex data pipelines into intuitive analytics.",
      "Architected a robust, scalable backend on PostgreSQL."
    ],
    metrics: ["NextAuth RBAC", "Relational Schema", "Pipeline Analytics"],
    liveUrl: "https://issue-tracker-umber-ten.vercel.app",
    sourceUrl: "https://github.com/mozix5/issue-tracker",
  },
  {
    title: "turboText",
    description: "A minimal, focused writing environment. Stripping away the noise of the interface to create room for deep thoughts.",
    role: "Frontend Developer",
    timeline: "2025",
    status: "Live",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    images: [
      turboText1,
      turboText2,
    ],
    color: "gold",
    highlights: [
      "Stripped the interface to its essence for absolute focus.",
      "Choreographed tactile micro-animations for a visceral writing feel.",
      "Engineered a scalable foundation for future toolkits."
    ],
    metrics: ["Minimal UI", "Motion Polish", "Focus Engine"],
    liveUrl: "https://turbo-text.vercel.app",
    sourceUrl: "https://github.com/mozix5",
  },
];

export const socials = [
  { href: "https://github.com/mozix5", label: "GitHub", icon: FaGithubAlt },
  {
    href: "https://www.linkedin.com/in/mosin-md-86569a202/",
    label: "LinkedIn",
    icon: FaLinkedinIn,
  },
  { href: "https://portfolyo-amber.vercel.app/", label: "Portfolio", icon: FaCode },
];

export const sections = {
  profile: {
    issueNumber: "01",
    issueTitle: "The Developer",
    titlePrimary: "MD",
    titleStroked: "Mosin",
    role: "Full Stack Developer",
  },
  projects: {
    issueNumber: "02",
    issueTitle: "Selected Work",
    titlePrimary: "Case",
    titleStroked: "Studies",
    description: "A curated selection of work — from interactive interfaces to scroll-driven experiences built with intention.",
  },
  experience: {
    issueNumber: "03",
    issueTitle: "Career & Education",
    titlePrimary: "Exper",
    titleStroked: "ience",
    description: "A timeline of production work, real impact shipped, and the education that built the foundation underneath it.",
  },
  techStack: {
    issueNumber: "04",
    issueTitle: "Toolkit",
    titlePrimary: "The",
    titleStroked: "Stack",
  },
  contact: {
    issueNumber: "05",
    issueTitle: "Correspondence",
    titlePrimary: "Drop me",
    titleStroked: "a line",
    email: "mosinmd827@gmail.com",
    objectiveLabel: "Open to opportunities",
  },
};
