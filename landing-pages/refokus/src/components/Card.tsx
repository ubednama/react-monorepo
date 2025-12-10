import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";

const Card = ({
  width,
  start,
  para,
  hover,
}: {
  width: string;
  start: boolean;
  para: boolean;
  hover: string;
  heading: string;
  text: string;
  team?: string;
}) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: hover === "true" ? "#7443ff" : "#3e3e46", padding: "25px" }}
      className={`bg-zinc-800 p-5 rounded-xl ${width} min-h-120 flex flex-col justify-between`}
    >
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <h3>Up Next: Culture</h3>
          <IoIosArrowRoundForward />
        </div>
        <h1 className="text-3xl font-medium mt-5">Who we are</h1>
      </div>
      <div className="down w-full">
        {start && (
          <>
            <h1 className="text-6xl font-semibold tracking-tight leading-none">
              Start a Project
            </h1>
            <button className="rounded-full py-2 px-5 mt-5 border border-zinc-50">
              Contact Us
            </button>
          </>
        )}
        {para && (
          <p className="text-sm text-zinc-500 font-medium">
            Explore what drives our team.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
