import { motion } from "framer-motion";
import Stripe from "./Stripe";

const Stripes = () => {
  const data = [
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/63c9ce90a51cd7cf6b3689fb_css-design-awards-logos-id1L9L8Yvp%201.svg",
      number: 52,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/63d6e83420934a94d642103b_NCC2021_LogoLockup%201.svg",
      number: 2,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/63c9ce90a51cd75d563689fd_Awwards-logotype-2018%201.svg",
      number: 15,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/63c9ce90a51cd7cf6b3689fb_css-design-awards-logos-id1L9L8Yvp%201.svg",
      number: 52,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/63d6e83420934a94d642103b_NCC2021_LogoLockup%201.svg",
      number: 11,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/63c9ce90a51cd75d563689fd_Awwards-logotype-2018%201.svg",
      number: 48,
    },
  ];
  return (
    <div className="overflow-hidden mt-32">
      <motion.div
        className="flex"
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"}}>
        {data.map((elem, index) => (
          <Stripe val={elem} key={index} />
        ))}
        {data.map((elem, index) => (
          <Stripe val={elem} key={`${index}-clone`} />
        ))}
      </motion.div>
    </div>
  );
};

export default Stripes;
