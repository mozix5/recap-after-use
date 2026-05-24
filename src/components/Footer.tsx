import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithubAlt, FaLinkedinIn } from "react-icons/fa";
import { Magnetic } from "@/components/ui/magnetic";
import { Signature } from "@/components/ui/signature";

const spring = { type: "spring" as const, stiffness: 700, damping: 60 };

const Footer = () => {
  const [hover, setHover] = useState(false);

  return (
    <footer className="relative" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-16 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">

          <div>
            <div className="-ml-3 mb-1">
              <Signature className="w-32 h-12 opacity-85 hover:opacity-100 transition-opacity" />
            </div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.4em] mt-1"
              style={{ color: "var(--fg-dim)" }}
            >
              Full Stack Developer · Open to Work
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Magnetic>
              <a
                href="https://github.com/mozix5"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center transition-all duration-200"
                style={{ border: "1px solid var(--rule-light)", color: "var(--fg-dim)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule-light)"; e.currentTarget.style.color = "var(--fg-dim)"; }}
              >
                <FaGithubAlt className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/mosin-md-86569a202/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center transition-all duration-200"
                style={{ border: "1px solid var(--rule-light)", color: "var(--fg-dim)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--rule-light)"; e.currentTarget.style.color = "var(--fg-dim)"; }}
              >
                <FaLinkedinIn className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
          </div>
        </div>

        <div
          className="mt-8 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderTop: "1px solid var(--rule-light)" }}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.4em] order-2 sm:order-1" style={{ color: "var(--fg-dim)" }}>
            © {new Date().getFullYear()} Md Mosin · All rights reserved
          </p>

          <Magnetic range={60} strength={0.3}>
            <button
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono text-sm flex gap-2 order-1 sm:order-2 items-center"
              style={{ color: "var(--fg-dim)" }}
            >
              <motion.span
                animate={{ x: hover ? -14 : 0 }}
                transition={spring}
                style={{ color: "var(--gold)", opacity: 0.5 }}
              >
                &#60;/
              </motion.span>
              <span style={{ color: hover ? "var(--fg)" : "var(--fg-muted)", transition: "color 0.2s" }}>
                mozix
              </span>
              <motion.span
                animate={{ x: hover ? 14 : 0 }}
                transition={spring}
                style={{ color: "var(--gold)", opacity: 0.5 }}
              >
                &#62;
              </motion.span>
            </button>
          </Magnetic>

          <p className="font-mono text-[9px] uppercase tracking-[0.4em] order-3 hidden sm:block" style={{ color: "var(--fg-dim)" }}>
            Built with React · Framer Motion · TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
