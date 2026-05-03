import { useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [hover, setHover] = useState(false);
  const spring = { type: "spring" as const, stiffness: 700, damping: 60 };

  return (
    <div
      className="flex py-6 items-center justify-center px-8 border-t"
      style={{ borderColor: "var(--rule-light)" }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`font-mono text-sm cursor-pointer flex gap-2 transition-all ${hover ? "justify-between flex-1" : "justify-center"}`}
        style={{ color: "var(--fg-dim)" }}
      >
        <motion.span layout transition={spring} style={{ color: "var(--gold)", opacity: 0.5 }}>
          &#60;/
        </motion.span>
        <a
          href="https://portfolyo-amber.vercel.app/"
          target="_blank"
          rel="noreferrer"
          style={{ color: hover ? "var(--fg)" : "var(--fg-muted)", transition: "color 0.2s" }}
        >
          mozix
        </a>
        <motion.span layout transition={spring} style={{ color: "var(--gold)", opacity: 0.5 }}>
          &#62;
        </motion.span>
      </div>
    </div>
  );
};

export default Footer;
