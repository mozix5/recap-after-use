import React, { useRef } from "react";
import { motion } from "framer-motion";
import me from "../assets/me.png";
const Profile = () => {
  const objRef = useRef();
  return (
    <div className="h-[140vh] bg-primary flex justify-center text-white relative mx-[269px] items-center">
      <div className="">
        <div className=" absolute top-28 right-[250px]">
          <div className=" relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="40 50 440 512" 
              height="300px"
              // width="400px"
            >
              <path
                d="M408,64H104a56.16,56.16,0,0,0-56,56V312a56.16,56.16,0,0,0,56,56h40v80l93.72-78.14a8,8,0,0,1,5.13-1.86H408a56.16,56.16,0,0,0,56-56V120A56.16,56.16,0,0,0,408,64Z"
                fill="none"
                stroke="red"
                strokeLinejoin="round"
                // strokewidth="652px"
                strokeWidth="11px"
              ></path>
            </svg>
            <div className=" absolute top-0 left-0 right-0 px-6 pt-5 font-mono">
             Im a passionate frontend developer focused on creating interactive,
              accessible, and responsive websites.
            </div>
          </div>
        </div>
        <div className=" h-[60vh] mr-12">
          <img className="h-full w-full" src={me}></img>
        </div>
        <div className=" flex items-center justify-between absolute top-[40%] left-0 right-0">
          <div className=" capitalize font-mono text-2xl">
            <div className=" text-2xl font-mono">Md Mosin</div>
          </div>
          <div className=" flex flex-col text-2xl font-mono">
            <div>Frontend</div>
            <div>Developer</div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Profile;
