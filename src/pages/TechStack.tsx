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
