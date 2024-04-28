import React, { useRef } from "react";
import {motion} from 'framer-motion'
const Profile = () => {
    const objRef=useRef()
  return (
    <div className="h-screen bg-primary flex justify-center items-center text-white">
      <div className=" lg:w-[65vw] h-full flex flex-col gap-8">
        <motion.div
          className=" h-32 w-32 bg-white"
          initial={{ opacity: 0 ,x:100}}
          whileInView={{ opacity: 1 ,x:0}}
          viewport={{amount:"all",}}
        ></motion.div>
        <div className=" text-2xl">Md Mosin</div>
        <div className="text-5xl">Frontend Developer</div>
        <div className=" text-xl leading-relaxed font-semibold tracking-wide pr-12">
          I'm a Senior Designer in the Shop team at Shopify, originally from
          England and now based in Sweden. With a background in freelance work
          specialising in creating interactive websites, I'm passionate about
          building experiences that are not only beautiful and functional but
          also take into account the broader ecosystems in which they exist.
        </div>
      </div>
    </div>
  );
};

export default Profile;
