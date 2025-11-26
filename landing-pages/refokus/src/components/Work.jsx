import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Work = () => {
  const [images, setImages] = useState([
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef09178195ce0073e38f3_Refokus%20Tools-1.png",
      top: "50%",
      left: "50%",
      isActive: true,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0accfe1b3e66bc55462_Refokus%20Tools.png",
      top: "56%",
      left: "44%",
      isActive: false,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0acbc45cb2f4fc5c6b2_Yahoo.png",
      top: "45%",
      left: "56%",
      isActive: false,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef092455ce2cf591e52d1_Rainfall.png",
      top: "60%",
      left: "53%",
      isActive: false,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0ac7e7179d210dc41f0_Summon.png",
      top: "43%",
      left: "40%",
      isActive: false,
    },
    {
      url: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0af108a465002975acd_Showcase%20Websites%20(1).png",
      top: "65%",
      left: "55%",
      isActive: false,
    },
  ]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setImages((prevImages) =>
        prevImages.map((image, index) => ({
          ...image,
          isActive: index === currentIndex,
        }))
      );
      currentIndex = (currentIndex + 1) % images.length;
    }, 1500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full mt-20">
      <div className="relative max-w-screen-xl mx-auto text-center">
        <h1 className="text-[30vw] leading-none font-medium select-none tracking-tight">
          work
        </h1>
      </div>
      <div className="absolute top-0 w-full h-full">
        {images.map(
          (elem, index) =>
            elem.isActive && (
              <motion.img
                key={index}
                className="absolute w-60 rounded-lg -translate-x-[50%] -translate-y-[50%]"
                src={elem.url}
                style={{ top: elem.top, left: elem.left }}
                alt="work"
                initial={{ scale: 0 }}
                animate={{ scale: elem.isActive ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
            )
        )}
      </div>

      <p className="text-center py-4 font-normal text-lg text-[#919191]">
        Web Design, Web-flow Development, Creative Development
      </p>
    </div>
  );
};

export default Work;
