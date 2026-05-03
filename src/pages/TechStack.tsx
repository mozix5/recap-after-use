import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import JavaScript from "@/svg/JavaScript";
import Github from "@/svg/Github";
import Mongodb from "@/svg/Mongodb";
import React from "@/svg/React";
import Next from "@/svg/Next";
import Redux from "@/svg/Redux";
import Node from "@/svg/Node";
import Sql from "@/svg/Sql";
import TypeScript from "@/svg/TypeScript";
import Vercel from "@/svg/Vercel";
import { motion } from "framer-motion";

const TechStack = () => (
  <section
    className="relative overflow-hidden py-24 px-4 sm:px-8 lg:px-16 border-t"
    style={{ background: "var(--bg)", borderColor: "var(--rule)" }}
  >
    {/* Dot grid bg */}
    <div
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--rule-light) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    <div className="relative mx-auto max-w-5xl">
      {/* Header */}
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
          The
          <br />
          <span
            style={{ WebkitTextStroke: "1px var(--fg)", color: "transparent" }}
          >
            Stack
          </span>
        </h2>
        <div
          className="h-px w-24 mt-4"
          style={{
            background: "linear-gradient(to right, var(--gold), transparent)",
          }}
        />
      </motion.div>

      {/* Orbit */}
      <div className="relative flex h-[480px] w-full flex-col items-center justify-center overflow-hidden">
        <span
          className="pointer-events-none whitespace-pre-wrap bg-clip-text text-center text-7xl font-semibold leading-none text-transparent font-bebas"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--fg), var(--fg-dim))",
          }}
        >
          Tools
        </span>
        <OrbitingCircles iconSize={38} radius={140}>
          <JavaScript />
          <Github />
          <Mongodb />
          <React />
        </OrbitingCircles>
        <OrbitingCircles radius={200} reverse speed={2}>
          <Next />
          <Redux />
          <Node />
          <Next />
          <Sql />
          <TypeScript />
          <Vercel />
        </OrbitingCircles>
      </div>

      {/* Footer label */}
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
