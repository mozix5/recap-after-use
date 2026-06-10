import { socials, sections } from "@/data/content";
import me2 from "@/assets/me2.png";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";
import { TextWipe } from "@/components/ui/text-wipe";

const Contact = () => (
  <section
    id="contact"
    className="relative overflow-hidden"
    style={{ background: "var(--bg)" }}
  >
    <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-16 py-24">
      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.45em] mb-6"
        style={{ color: "var(--fg-dim)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Issue {sections.contact.issueNumber} · {sections.contact.issueTitle}
      </motion.p>

      <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
        <div>
          {/* Objective status label */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px w-12" style={{ background: "var(--gold)" }} />
            <span
              className="font-mono text-[9px] uppercase tracking-[0.5em] font-bold"
              style={{ color: "var(--gold)" }}
            >
              {sections.contact.objectiveLabel}
            </span>
          </motion.div>

          {/* First Line of Title */}
          <div
            className="font-bebas leading-none uppercase mb-2"
            style={{ color: "var(--fg)" }}
          >
            <TextWipe delay={0.1}>
              <span className="block font-black text-[clamp(3.5rem,11vw,12rem)]">
                {sections.contact.titlePrimary}
              </span>
            </TextWipe>
          </div>

          {/* Second Line of Title + Email + Socials Inline on Desktop */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-12">
            <div
              className="font-bebas leading-none uppercase"
              style={{ color: "var(--fg)" }}
            >
              <TextWipe delay={0.15}>
                <span className="block font-black text-[clamp(3.5rem,11vw,12rem)]">
                  {sections.contact.titleStroked}
                </span>
              </TextWipe>
            </div>

            {/* Main Email and Elsewhere Links aligned in the same row on desktop */}
            <div className="flex flex-wrap gap-12 xl:mb-2 shrink-0">
              {/* Email */}
              <motion.div
                className="shrink-0"
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
                  href={`mailto:${sections.contact.email}`}
                  className="font-lora text-xl transition-colors hover:text-[var(--gold)]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {sections.contact.email}
                </a>
              </motion.div>

              {/* Elsewhere */}
              <motion.div
                className="shrink-0"
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
          </div>
        </div>

        <motion.div
          className="relative shrink-0 hidden lg:block"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative overflow-hidden" style={{ width: 240 }}>
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
