const logo = "/assets/Hero/logo.png";
const micIcon = "/assets/Hero/micIcon.png";

import { Button } from "@repo/ui";

const Hero = () => {

  return (
    <div className="mx-auto mt-0">
      <div className="grid grid-cols-2 gap-12">
          <div className="space-y-8">
            <h1 className="text-5xl font-semibold leading-tight w-96">Navigating the digital landscape for success</h1>
            <div className="text-lg">Our digital marketing agency helps businesses <br />grow and succeed online through a range of<br /> services including SEO, PPC, social media marketing,<br /> and content creation.</div>
            <Button className="border text-white px-8 py-3 rounded-lg bg-figmaDark cursor-pointer hover:bg-black transition-colors">Book a consultation</Button>
        </div>
        <img src={micIcon}></img>
      </div>
    </div>
  );
};

export default Hero;
