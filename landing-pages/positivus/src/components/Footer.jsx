import logo from "../assets/Hero/logo.png";
import { Linkedin, Twitter, Facebook } from "lucide-react";
import { items } from "../constants/navbarItems";

const Footer = () => {
  return (
    <div className="space-y-20">
      <hr className="w-16 border-[3.5px] border-figmaGreen mx-auto" />
      <footer className="bg-figmaDark rounded-t-[40px] text-white p-14">
        <div className="flex justify-between items-center">
          <img src={logo} className="" />
          <div className="flex">
            {items.map((item, idx) => (
              <div className="flex mr-8 text-white/80 underline" key={idx}>
                {item}
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-figmaGreen rounded-full bg-white p-2"
            >
              <Linkedin className="h-6 w-6 text-black" />
            </a>
            <a
              href="#"
              className="hover:text-figmaGreen rounded-full bg-white p-2"
            >
              <Facebook className="h-6 w-6 text-black" />
            </a>
            <a
              href="#"
              className="hover:text-figmaGreen rounded-full bg-white p-2"
            >
              <Twitter className="h-6 w-6 text-black" />
            </a>
          </div>
        </div>
        <div className="container px-4 py-12">
          <div className="flex justify-between">
            <div className="space-y-8">
              <div className="inline-block bg-figmaGreen p-2 px-4 py-1 rounded-md text-xl text-black">
                <h2 className="font-semibold">Contact us:</h2>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>Email: info@positivus.com</p>
                <p>Phone: 555-567-8901</p>
                <p className="">Address: 1234 Main St<br /> Moonstone City, Stardust State 12345</p>
              </div>
            </div>

            <div className="flex gap-6 bg-gray-800 h-full items-center justify-center rounded-[20px] py-16 px-12">
              <input
                type="email"
                placeholder="Email"
                className="border border-white p-5 rounded-[16px] bg-inherit w-72"
              />
              <button className="bg-figmaGreen text-black hover:bg-green-700 p-5 px-8 rounded-[16px]">
                Subscribe to news
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col gap-12 sm:flex-row items-center">
            <p className="text-sm text-gray-400">
              © 2024 Positivus. All Rights Reserved.
            </p>
            <a href="#" className="text-sm text-gray-400 hover:text-[#b4ff39]">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
