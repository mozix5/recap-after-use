import { OrbitingCircles } from "@/components/ui/orbiting-circles.tsx";
import JavaScript from "@/svg/JavaScript.tsx";
import Github from "@/svg/Github.tsx";
import Mongodb from "@/svg/Mongodb.tsx";
import React from "@/svg/React.tsx";
import Next from "@/svg/Next.tsx";
import Redux from "@/svg/Redux.tsx";
import Node from "@/svg/Node.tsx";
import Sql from "@/svg/Sql.tsx";
import TypeScript from "@/svg/TypeScript.tsx";
import Vercel from "@/svg/Vercel.tsx";

const TechStack = () => {
  return (
    <div className="pb-40 mx-[269px] text-white">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
          Techs
        </span>
        <OrbitingCircles iconSize={40} radius={140}>
          <JavaScript />
          <Github />
          <Mongodb />
          <React />
        </OrbitingCircles>
        <OrbitingCircles radius={180} reverse speed={2}>
          <Next />
          <Redux />
          <Node />
          <Next />
          <Sql />
          <TypeScript />
          <Vercel />
        </OrbitingCircles>
      </div>
    </div>
  );
};

export default TechStack;
