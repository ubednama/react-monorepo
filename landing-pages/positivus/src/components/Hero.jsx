import MicIcon from "../assets/Hero/micIcon.png"

const Hero = () => {

  return (
    <div className="mx-auto mt-0">
      <div className="grid grid-cols-2 gap-12">
          <div className="space-y-8">
            <h1 className="text-5xl font-semibold leading-tight w-96">Navigating the digital landscape for success</h1>
            <div className="text-lg">Our digital marketing agency helps businesses <br />grow and succeed online through a range of<br /> services including SEO, PPC, social media marketing,<br /> and content creation.</div>
            <button className="border  text-white px-8 py-3 rounded-lg bg-figmaDark">Book a consultation</button>
        </div>
        <img src={MicIcon}></img>
      </div>
    </div>
  );
};

export default Hero;
