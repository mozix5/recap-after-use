import { FaCode, FaGithubAlt, FaLinkedinIn } from "react-icons/fa";
import me2 from '../../../../../Documents/Project/recap after use/src/assets/me2.png'
const Contact = () => {
  return (
    <div className="h-screen  mx-[269px] font-bebas flex items-center justify-center">
      <div className=" flex">
        <div className="uppercase text-[12rem] flex flex-col font-semibold pr-4 text-white ">
          <span className=" leading-none">Drop me</span>
          <span className=" leading-none">a line</span>
        </div>
        <div className=" flex flex-col text-white">
          <div className=" flex-1 pt-[14px] pl-4">
            <div className=" text-4xl">Contact</div>
            <div className=" pt-4 tracking-wide text-gray-400">
                mozix5@icloud.com
            </div>
          </div>
          <div className=" font-bebas flex-1 pt-[6px] pl-4">
            <div className=" text-4xl ">Stalk me</div>
            <div className="flex flex-col text-xl gap-2 pt-4 text-gray-400">
              <a href="https://github.com/mozix5" target="_blank">
                <FaGithubAlt className=" cursor-pointer hover:text-hoverText" />
              </a>
              <a
                href="https://www.linkedin.com/in/mosin-md-86569a202/"
                target="_blank"
              >
                <FaLinkedinIn className=" cursor-pointer hover:text-hoverText" />
              </a>
              <a href="https://github.com/mozix5" target="_blank">
                <FaCode className=" cursor-pointer hover:text-hoverText" />
              </a>
            </div>
          </div>
        </div>
        <div className="h-96 pl-8">
          <img className="h-full" src={me2} alt='me'/>
        </div>
      </div>
    </div>
  );
};

export default Contact;
