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
    "Full Stack Developer",
    "React · Next.js · Node.js",
    "TypeScript",
    "Angular",
    "MongoDB · PostgreSQL",
    "Open to Opportunities",
    "1+ Year Production Experience",
    "Based in India",
  ],
  stats: [
    { value: "1+", label: "Years XP" },
    { value: "3+", label: "Projects" },
    { value: "25%", label: "Faster pipelines" },
  ],
  quote: "“I don’t just ship features — I own them end-to-end, from schema to screen, with performance and clarity as the baseline.”",
  description: "Full Stack Developer with 1+ year of production experience building enterprise SaaS platforms and consumer-grade web applications. Shipped features that cut processing time by 25%, boosted platform configurability by 40%, and accelerated frontend delivery by 40%.",
  objective: "Proven ability to own end-to-end features across the MERN stack and Next.js in fast-moving product environments — with a sharp eye for craft, accessibility, and security."
};

// ── Experience Data ── //
export const timeline = [
  {
    period: "2025",
    issue: "03",
    title: "Graduate Engineer Trainee",
    label: "Sterling Software · CAMS Group",
    icon: Rocket,
    description:
      "Delivered core modules of DICE (Distributor Commission Management SaaS), driving a 30% uplift in operational efficiency and making commission plans 40% more configurable for enterprise clients. Secured a live fintech platform by remediating 7 critical vulnerabilities including exposed AES keys, XSS surfaces, and insecure session architecture.",
    points: [
      "Node.js pipelines − 25% faster",
      "Angular accessibility refactor",
      "Scheduler concurrency & memory fix",
      "7 fintech security vulns closed",
      "Session-based auth with RBAC",
      "CSP headers & XSS remediation",
    ],
  },
  {
    period: "2023",
    issue: "02",
    title: "Frontend Developer Intern",
    label: "Celebal Technologies",
    icon: Code2,
    description:
      "Built a 15-component React component library adopted across 3 internal projects, cutting feature delivery time by 40%. Integrated 8+ REST API endpoints into live UIs and resolved 30+ production frontend bugs, reducing site downtime by 15% and improving Core Web Vitals scores.",
    points: [
      "15-component React library",
      "8+ REST APIs integrated",
      "30+ prod bugs resolved",
      "Core Web Vitals improved",
    ],
  },
  {
    period: "2024",
    issue: "01",
    title: "B.Tech — CS Engineering",
    label: "Lovely Professional University",
    icon: GraduationCap,
    description:
      "Bachelor of Technology in Computer Science Engineering with a CGPA of 7.5. Built strong foundations across data structures, algorithms, operating systems, databases, and full-stack development. Certified React Developer via Boardinfinity.",
    points: [
      "CGPA 7.5",
      "Phagwara, Punjab · 2020–2024",
      "Certified React Developer",
      "Full-Stack Bootcamp certified",
    ],
  },
];

// ── Projects Data ── //
export const projects = [
  {
    title: "View Box",
    description:
      "Full-stack movie discovery and review platform with real-time search, watchlist, likes, and reviews. Architectured a service-oriented Redux state layer eliminating redundant API calls across 10+ components.",
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
      "Architectured service-oriented Redux slices (reviewSlice, authSlice, searchMovieSlice) eliminating redundant API calls across 10+ components.",
      "Built real-time movie search with debounced input and instant dropdown, integrated live with the TMDB API.",
      "Designed glassmorphism + cinematic backdrop UI with async loading states for a premium, immersive experience.",
    ],
    metrics: ["Redux State", "Real-time Search", "TMDB API"],
    liveUrl: "https://viewbox-two.vercel.app/",
    sourceUrl: "https://github.com/mozix5/ViewBox",
  },
  {
    title: "Pet Pal",
    description:
      "Full-stack multi-service pet marketplace covering adoption, grooming, boarding, vet consultation, and transport. Built with a unified MERN platform and Redux for scalable global state across a multi-feature product.",
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
      "Engineered an AI-powered ethical breeding compatibility scorer and a real-time AI vet chatbot, adding intelligent automation to core user flows.",
      "Implemented a Tinder-style playdate matching system with real-time chat — showcasing advanced UI patterns and WebSocket integration.",
      "Integrated a secure pet essentials store with checkout flow, combining e-commerce and social features in a single cohesive product.",
    ],
    metrics: ["MERN Stack", "WebSocket Chat", "AI Features"],
    liveUrl: "https://pet-pal-iota.vercel.app/auth",
    sourceUrl: "https://github.com/mozix5/PetPal",
  },
  {
    title: "Issue Tracker",
    description:
      "Production-grade full-stack issue management system with role-based access control. Designed a normalized MySQL schema supporting multi-status workflows (Open → In Progress → Closed) with zero migration conflicts.",
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
      "Implemented NextAuth.js role-based access control, restricting create/edit/delete actions to authorized users only.",
      "Built Recharts analytics dashboards to visualize issue resolution velocity and status distribution at a glance.",
      "Deployed on Vercel with a Supabase PostgreSQL backend, handling schema migrations and environment configuration end-to-end.",
    ],
    metrics: ["NextAuth RBAC", "Recharts Analytics", "Supabase + Vercel"],
    liveUrl: "https://issue-tracker-umber-ten.vercel.app",
    sourceUrl: "https://github.com/mozix5/issue-tracker",
  },
  {
    title: "turboText",
    description: "A distraction-free writing interface built for speed and focus.",
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
      "Built a clean, responsive dashboard-style layout with clear writing actions and focused mode.",
      "Designed tactile hover states, visual feedback loops, and micro-animations for a premium writing feel.",
      "Structured reusable UI components so the interface can grow into a full editor toolkit.",
    ],
    metrics: ["Responsive UI", "Motion Polish", "Clean UX"],
    liveUrl: "https://turbo-text.vercel.app",
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
  { href: "https://portfolyo-amber.vercel.app/", label: "Portfolio", icon: FaCode },
];
