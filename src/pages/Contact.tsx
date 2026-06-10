import { socials, sections } from "@/data/content";
import me2 from "@/assets/me2.png";
import { motion } from "framer-motion";
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

      <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
        <div>
          {/* Primary Title Line: "Drop me" */}
          <div className="font-bebas leading-none uppercase">
            <TextWipe delay={0.1}>
              <span className="block font-black text-[5.5rem] min-[380px]:text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[12rem] text-[var(--fg)]">
                {sections.contact.titlePrimary}
              </span>
            </TextWipe>
          </div>

          {/* Stroked Title Line + Vertically Stacked Info Panel */}
          <div className="font-bebas leading-none uppercase mb-8 flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <TextWipe delay={0.15}>
              <span className="block font-black text-[5.5rem] min-[380px]:text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[12rem] text-[var(--fg)]">
                {sections.contact.titleStroked}
              </span>
            </TextWipe>

            {/* Email and Social Details stacked vertically */}
            <motion.div
              className="flex flex-col gap-3 pb-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--fg-dim)] shrink-0 select-none mb-1 md:mb-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Objective Tag */}
              <div className="flex items-center gap-2 mb-1">
                <span className="h-[2px] w-6 bg-[var(--gold)] shrink-0" />
                <span className="text-[var(--gold)] font-bold tracking-[0.3em]">
                  {sections.contact.objectiveLabel}
                </span>
              </div>

              {/* Email Address */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-[var(--fg)] font-semibold">Direct ·</span>
                <a
                  href={`mailto:${sections.contact.email}`}
                  className="hover:text-[var(--gold)] transition-colors duration-300 select-all normal-case font-sans text-sm tracking-normal text-[var(--fg-muted)]"
                >
                  {sections.contact.email}
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                <span className="text-[var(--fg)] font-semibold">Elsewhere ·</span>
                <div className="flex gap-3">
                  {socials.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[var(--gold)] transition-colors duration-300 font-bold text-[var(--fg-muted)]"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right column portrait image */}
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
