const logo = "/assets/Hero/logo.png";
import { Linkedin, Twitter, Facebook } from "lucide-react";
import { Button } from "@repo/ui";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto mt-20">
      <div className="w-full bg-[#191A23] rounded-t-[45px] p-12 md:p-14 text-white">
        <div className="top flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
          <div className="left flex flex-col md:flex-row items-center gap-10">
            <img src={logo} alt="" className="invert brightness-0 h-8" />
            <div className="links flex gap-5 md:gap-10">
              {["About us", "Services", "Use Cases", "Pricing", "Blog"].map(
                (item, index) => (
                  <a key={index} href="#" className="underline text-sm md:text-base">
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
          <div className="right flex gap-4">
            <div className="social p-2 bg-white rounded-full cursor-pointer hover:bg-[#B9FF66] transition-colors">
              <Linkedin className="text-black w-4 h-4" />
            </div>
            <div className="social p-2 bg-white rounded-full cursor-pointer hover:bg-[#B9FF66] transition-colors">
              <Facebook className="text-black w-4 h-4" />
            </div>
            <div className="social p-2 bg-white rounded-full cursor-pointer hover:bg-[#B9FF66] transition-colors">
              <Twitter className="text-black w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="mid flex flex-col md:flex-row justify-between items-center mt-16 pb-12 border-b border-gray-600 gap-8 md:gap-0">
          <div className="left text-center md:text-left">
            <span className="bg-[#B9FF66] text-black px-2 rounded-md font-medium">
              Contact us:
            </span>
            <div className="mt-5 space-y-4">
              <h5 className="text-base md:text-lg">Email: info@positivus.com</h5>
              <h5 className="text-base md:text-lg">Phone: 555-567-8901</h5>
              <h5 className="text-base md:text-lg">
                Address: 1234 Main St <br /> Moonstone City, Stardust State 12345
              </h5>
            </div>
          </div>
          <div className="right bg-[#292A32] p-8 md:p-14 rounded-3xl flex flex-col md:flex-row gap-5 w-full md:w-auto">
            <input
              type="text"
              placeholder="Email"
              className="bg-transparent border border-white rounded-xl p-4 w-full md:w-64 placeholder-white/80 focus:outline-none"
            />
            <Button className="bg-[#B9FF66] text-black px-8 py-4 rounded-xl font-medium w-full md:w-auto hover:bg-[#9eff2a] transition-colors h-auto border-none">
              Subscribe to news
            </Button>
          </div>
        </div>

        <div className="bottom mt-10 md:mt-12 flex flex-col md:flex-row gap-3 md:gap-10 text-center md:text-left text-sm md:text-base text-gray-300">
          <h5>© 2023 Positivus. All Rights Reserved.</h5>
          <h5 className="underline cursor-pointer">Privacy Policy</h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
