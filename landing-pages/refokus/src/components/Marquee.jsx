import PropTypes from 'prop-types';

const Marquee = ({ imagesUrls }) => {
  return (
    <div style={{flex: '0 0 auto'}}  className="w-full flex py-8 gap-20 whitespace-nowrap">
      {imagesUrls.map((url, index) => (
        <img
          src={url}
          key={index}
          alt="marquee"
          className="flex-shrink-0 w-[7vw]"
        />
      ))}
      {imagesUrls.map((url, index) => (
        <img
          src={url}
          key={index}
          alt="marquee"
          className="flex-shrink-0 w-[7vw]"
        />
      ))}
    </div>
  );
}

Marquee.propTypes = {
  imagesUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Marquee;
