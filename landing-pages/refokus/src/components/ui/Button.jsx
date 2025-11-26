import { IoIosReturnRight } from "react-icons/io";
import PropTypes from 'prop-types';

const Button = ({ title = "Get Started" }) => {
  return (
    <div className="w-40 px-4 py-2 cursor-pointer bg-zinc-100 flex justify-between items-center text-black rounded-full">
      <span className="text-sm font-medium">{title}</span>
      <IoIosReturnRight></IoIosReturnRight>
    </div>
  );
};

Button.propTypes = {
  title: PropTypes.string
};

export default Button;
