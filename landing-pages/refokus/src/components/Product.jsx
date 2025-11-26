import Button from "./ui/Button";
import PropTypes from 'prop-types';

const Product = ({ val, mover, count }) => {
  return (
    <div className="w-full py-20 h-[23rem] text-white">
      <div
        onMouseEnter={() => {
          mover(count);
        }}
        className="max-w-screen-xl mx-auto flex justify-between items-center"
      >
        <h1 className="text-6xl capitalize font-medium">{val.title}</h1>
        <div className="w-1/3">
          <p className="mb-10">{val.description}</p>
          <div className="flex items-center gap-5">
            {val.live && <Button title="Live Preview" />}
            {val.case && <Button title="Case Study" />}
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  val: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    live: PropTypes.bool,
    case: PropTypes.bool,
  }).isRequired,
  mover: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default Product;
