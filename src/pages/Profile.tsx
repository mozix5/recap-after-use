import { useState, useEffect } from "react";
import me from "@/assets/me.png";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);

  // Periodic glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 1000);
    }, 7000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
      {/* Subtle grid lines */}
      <div className="relative inset-0 opacity-5 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px w-full bg-white"
            style={{ top: `${i * 5}%` }}
          ></div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px h-full bg-white"
            style={{ left: `${i * 5}%` }}
          ></div>
        ))}
      </div>

      {/* Main container with comic panel layout */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Comic style header */}
        <header className="mb-12">
          <div
            className={`text-center ${isGlitching ? "translate-x-1" : ""} transition-transform duration-100`}
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
              <span className="inline-block transform -skew-y-3">MD</span>
              <span className="inline-block transform skew-y-3 mx-2">
                MOSIN
              </span>
            </h1>
            <div className="flex justify-center items-center mt-2">
              <div className="w-16 h-px bg-white mx-4"></div>
              <p className="text-sm tracking-widest uppercase">
                Digital Architect
              </p>
              <div className="w-16 h-px bg-white mx-4"></div>
            </div>
          </div>
        </header>

        {/* Comic strip layout - Asymmetrical panels */}
        <div className="grid grid-cols-12 grid-rows-6 gap-3 h-full">
          {/* Panel 1: Profile Image with sliced effect */}
          <div className="col-span-7 row-span-6 relative border-[#09090b] overflow-hidden rounded-lg">
            <div className=" w-3/4 flex justify-self-end pb-4">
              <div className="relative bg-white text-black p-4 rounded-2xl">
                {/* Bubble tail */}
                <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white transform rotate-45"></div>

                <div className="text-3xl font-black uppercase tracking-tighter mb-2">
                  THE DEVELOPER
                </div>
                <div className="text-sm">
                  "I'm a digital craftsman who bridges creativity with code.
                  From the first line of HTML I wrote, I knew that web
                  development was where my heart and passion would thrive."
                </div>
              </div>
            </div>
            <img
              src={me}
              alt="Profile slice"
              className=" w-full h-[50vh] object-contain"
            />
            {/* Comic panel label */}
            <div className="absolute top-4 left-4 text-xs font-mono opacity-50">
              PANEL 01/PROTAGONIST
            </div>

            {/* Comic text overlay with bubble effect */}
          </div>

          {/* Panel 2: Skills section */}
          <div
            className={`col-span-5 row-span-3 bg-[#09090b] p-6 relative overflow-hidden rounded-lg ${activeSection === "skills" ? "transform scale-105" : ""} transition-all duration-300`}
            onMouseEnter={() => setActiveSection("skills")}
            onMouseLeave={() => setActiveSection("")}
          >
            <div className="absolute top-4 right-4 text-xs font-mono opacity-50">
              PANEL 02/ABILITIES
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
              TECH STACK
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {["HTML5", "CSS3", "JavaScript", "React", "Node.js", "UI/UX"].map(
                (skill, index) => (
                  <div
                    key={skill}
                    className="border border-white py-2 px-3 text-center relative overflow-hidden rounded-md"
                    style={{
                      transform:
                        isGlitching && index % 2 ? "skewX(-5deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    <span className="relative z-10">{skill}</span>
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
                  </div>
                ),
              )}
            </div>

            {/* Comic panel decorations */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16">
              <div className="absolute top-0 left-0 h-px w-6 bg-white"></div>
              <div className="absolute top-0 left-0 w-px h-6 bg-white"></div>
            </div>

            {/* Comic sound effect on hover */}
            <div
              className={`absolute -top-4 right-8 text-xl font-black uppercase transform -rotate-12 transition-opacity duration-300 ${activeSection === "skills" ? "opacity-40" : "opacity-0"}`}
            >
              KAPOW!
            </div>
          </div>

          {/* Panel 3: Mission */}
          <div
            className={`col-span-5 row-span-3 bg-[#09090b] p-6 relative rounded-lg ${activeSection === "mission" ? "transform scale-105" : ""} transition-all duration-300`}
            onMouseEnter={() => setActiveSection("mission")}
            onMouseLeave={() => setActiveSection("")}
          >
            <div className="absolute top-4 right-4 text-xs font-mono opacity-50">
              PANEL 03/MISSION
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
              OBJECTIVE
            </h2>

            {/* Speech bubble for mission statement */}
            <div className="relative bg-white text-black p-4 rounded-2xl mb-6">
              <div className="absolute -left-3 top-6 w-6 h-6 bg-white transform rotate-45"></div>
              <p className="text-sm">
                With a foundation in both design and development, I strive to
                create digital experiences that are not only functional but also
                beautiful.
              </p>
            </div>

            {/* Quote in another speech bubble style */}
            <div className="relative bg-gray-800 p-3 rounded-xl ml-8">
              <div className="text-sm italic">
                "Making the web a better place, one pixel at a time."
              </div>
              <div className="absolute -right-2 bottom-3 w-4 h-4 bg-gray-800 transform rotate-45"></div>
            </div>

            {/* Action text - appears on hover */}
            <div
              className={`absolute -bottom-3 right-8 text-2xl font-black uppercase transform rotate-12 transition-opacity duration-300 ${activeSection === "mission" ? "opacity-30" : "opacity-0"}`}
            >
              BOOM!
            </div>
          </div>
        </div>

        {/* Comic footer */}
        <div className="mt-6 flex justify-between items-center text-xs uppercase tracking-widest">
          <div>ISSUE #01: THE GENESIS</div>
          <div className="flex space-x-6">
            <span>WRITTEN & ILLUSTRATED BY MD MOSIN</span>
            <span>2025</span>
          </div>
        </div>

        {/* Comic decorative elements */}
        <div className="absolute top-1/4 -left-4 text-3xl font-black opacity-10 transform -rotate-90">
          CHAPTER I
        </div>
        <div className="absolute bottom-1/4 -right-4 text-3xl font-black opacity-10 transform rotate-90">
          CONTINUE...
        </div>
      </div>

      {/* Sound effect text */}
      <div
        className={`absolute top-[50%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 text-9xl font-black uppercase opacity-0
         ${isGlitching ? "animate-pulse opacity-5" : ""}
         pointer-events-none`}
      >
        SNAP!
      </div>
    </div>
  );
};

export default Profile;
