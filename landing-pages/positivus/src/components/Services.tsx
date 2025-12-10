import ServiceCard from "./ServiceCard";
const one = "/assets/Services/one.png";
const two = "/assets/Services/two.png";
const three = "/assets/Services/three.png";
const four = "/assets/Services/four.png";
const five = "/assets/Services/five.png";
const six = "/assets/Services/six.png";

const Services = () => {
  const Services = [
    {
      titleOne: "Search engine",
      titleTwo: "Optimization",
      bgColor: "bg-white",
      arrowColor: "text-figmaGreen",
      arrowBgColor: "black",
      textColor: "black",
      textBgColor: "figmaGreen",
      icon: one,
    },
    {
      titleOne: "Pay-per-click",
      titleTwo: "advertising",
      bgColor: "bg-figmaGreen",
      arrowColor: "text-figmaGreen",
      arrowBgColor: "black",
      textColor: "black",
      textBgColor: "white",
      icon: two,
    },
    {
      titleOne: "Social Media",
      titleTwo: "Marketing",
      bgColor: "bg-black",
      arrowColor: "text-black",
      arrowBgColor: "white",
      textColor: "black",
      textBgColor: "white",
      icon: three,
    },
    {
      titleOne: "Email",
      titleTwo: "Marketing",
      bgColor: "bg-white",
      arrowColor: "text-figmaGreen",
      arrowBgColor: "black",
      textColor: "black",
      textBgColor: "figmaGreen",
      icon: four,
    },
    {
      titleOne: "Content",
      titleTwo: "Creation",
      bgColor: "bg-figmaGreen",
      arrowColor: "text-figmaGreen",
      arrowBgColor: "black",
      textColor: "black",
      textBgColor: "white",
      icon: five,
    },
    {
      titleOne: "Analytics and",
      titleTwo: "Tracking",
      bgColor: "bg-black",
      arrowColor: "text-black",
      arrowBgColor: "white",
      textColor: "black",
      textBgColor: "figmaGreen",
      icon: six,
    },
  ];
  return (
    <div>
      <div className="space-y-20">
        <div className="flex gap-10 items-center">
          <div className="bg-figmaGreen px-1.5 py-1 font-semibold text-4xl rounded-md">
            Services
          </div>
          <div className="w-[40%] max-w-2xl text-gray-600 leading-tight">
            At our digital marketing agency, we offer a range of services to
            help businesses grow and succeed online. These services include:
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-3 gap-12">
          {Services.map((data, idx) => (
            <ServiceCard
              key={idx}
              titleOne={data.titleOne}
              titleTwo={data.titleTwo}
              bgColor={data.bgColor}
              arrowBgColor={data.arrowBgColor}
              arrowColor={data.arrowColor}
              icon={data.icon}
              textColor={data.textColor}
              textBgColor={data.textBgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
