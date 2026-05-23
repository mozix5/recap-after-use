import { socials } from "@/data/content";
import me2 from "@/assets/me2.png";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";



const Contact = () => (
  <section
    id="contact"
    className="relative overflow-hidden border-t"
    style={{ background: "var(--bg)", borderColor: "var(--rule)" }}
  >
    <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-16 py-24">
      {/* ── Section Label ── */}
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.45em] mb-6"
        style={{ color: "var(--fg-dim)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Issue 05 · Correspondence
      </motion.p>

      <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
        {/* ── Left: typography ── */}
        <div>
          <motion.div
            className="font-bebas leading-none uppercase mb-8"
            style={{ fontSize: "clamp(4rem,14vw,10rem)", color: "var(--fg)" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="block">Drop me</span>
            <span
              className="block"
              style={{
                WebkitTextStroke: "1px var(--fg)",
                color: "transparent",
              }}
            >
              a line
            </span>
          </motion.div>

          {/* Gold rule */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px w-12" style={{ background: "var(--gold)" }} />
            <span
              className="font-mono text-[9px] uppercase tracking-[0.5em]"
              style={{ color: "var(--gold)" }}
            >
              Open to opportunities
            </span>
          </motion.div>

          {/* Email */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <p
              className="font-mono text-[9px] uppercase tracking-[0.4em] mb-2"
              style={{ color: "var(--fg-dim)" }}
            >
              Email
            </p>
            <a
              href="mailto:mosinmd827@gmail.com"
              className="font-lora text-xl transition-colors"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--fg-muted)")
              }
            >
              mosinmd827@gmail.com
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <p
              className="font-mono text-[9px] uppercase tracking-[0.4em] mb-4"
              style={{ color: "var(--fg-dim)" }}
            >
              Elsewhere
            </p>
            <div className="flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center transition-all"
                    style={{
                      border: "1px solid var(--rule-light)",
                      color: "var(--fg-dim)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--gold)";
                      e.currentTarget.style.color = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--rule-light)";
                      e.currentTarget.style.color = "var(--fg-dim)";
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right: image ── */}
        <motion.div
          className="relative shrink-0 hidden lg:block"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative overflow-hidden" style={{ width: 240 }}>
            <div
              className="absolute top-0 inset-x-0 h-[2px] z-10"
              style={{
                background:
                  "linear-gradient(to right, var(--gold), transparent)",
              }}
            />
            <img
              src={me2}
              alt="Md Mosin"
              className="w-full h-auto"
              style={{
                filter: "brightness(0.8) contrast(1.05) saturate(0.5)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Contact;
