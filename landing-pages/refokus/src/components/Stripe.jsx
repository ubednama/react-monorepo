import PropTypes from 'prop-types';

const Stripe = ({ val }) => {
  return (
    <div style={{flex: '0 0 auto'}} className=" w-[16.66%] h-16 flex justify-between items-center px-4 py-5 border-t border-b border-r border-zinc-600">
      <img src={val.url} alt="stripe" />
      <span className="font-semibold">{val.number}</span>
    </div>
  );
};

Stripe.propTypes = {
  val: PropTypes.shape({
    url: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
};

export default Stripe;
