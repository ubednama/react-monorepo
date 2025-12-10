const logo = "/assets/Hero/logo.png";
import { Button } from "@repo/ui";
import { items } from "../constants/navbarItems";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center max-w-7xl mx-auto py-8">
      <div className="flex items-center gap-10">
        <div className="logo cursor-pointer">
          <img src={logo} alt="" className="h-8" />
        </div>
        <div className="links hidden md:flex items-center gap-10">
          {items.map((item, index) => (
            <a
              key={index}
              className={`text-lg cursor-pointer ${index === 0 ? "font-medium" : ""}`}
              href="#"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
      <Button className="hidden md:block py-4 px-7 border border-black rounded-xl hover:bg-black hover:text-white transition-all duration-300 h-auto bg-transparent text-black">
        Request a quote
      </Button>
    </nav>
  );
};

export default NavBar;
