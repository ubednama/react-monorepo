const Marquee = ({ imagesUrls }: { imagesUrls: string[] }) => {
  return (
    <div style={{ flex: '0 0 auto' }} className="w-full flex py-8 gap-20 whitespace-nowrap">
      {imagesUrls.map((url, index) => (
        <img
          src={url}
          key={index}
          alt="marquee"
          className="shrink-0 w-[7vw]"
        />
      ))}
      {imagesUrls.map((url, index) => (
        <img
          src={url}
          key={index}
          alt="marquee"
          className="shrink-0 w-[7vw]"
        />
      ))}
    </div>
  );
}

export default Marquee;
