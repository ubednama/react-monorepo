import logo from "../assets/Hero/logo.png"
import { items } from "../constants/navbarItems";

const NavBar = () => {
    

  return (
    <div className="flex justify-between items-center mt-12">
      <img src={logo} className=""/>
      <div className="flex justify-between items-center">
        <div className="flex">{items.map((item, idx) => (<div className="flex mr-8 text-gray-600" key={idx}>{item}</div>))}</div>
        <button type="button" className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white">Request a Quote</button>
      </div>
    </div>
  );
};

export default NavBar;
