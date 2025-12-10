import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  titleOne: string;
  titleTwo: string;
  bgColor: string;
  textBgColor: string;
  textColor: string;
  icon: string;
  arrowBgColor: string;
  arrowColor: string;
}

const ServiceCard = ({
  titleOne,
  titleTwo,
  bgColor,
  textBgColor,
  textColor,
  icon,
  arrowBgColor,
  arrowColor
}: ServiceCardProps) => {
  return (
    <div className={`${bgColor} rounded-3xl border-2 border-black p-12 space-y-4 grid grid-cols-2 border-b-8 gap-10`}>
      <div className="flex flex-col justify-between">
        <div className={`text-3xl text-${textColor} rounded-md px-1`}>
          <h3 className={`bg-${textBgColor} w-fit rounded-md px-1`}
          > {titleOne}</h3>
          <h3 className={`bg-${textBgColor} w-fit rounded-md px-1`} >{titleTwo}</h3>
        </div>
        <div className="flex items-center gap-2 text-xl">
          <span className={`p-2 rounded-full ${arrowColor} bg-${arrowBgColor} flex items-center justify-center text-xl`}><ArrowUpRight /></span>{" "}<span className={`text-${arrowBgColor} `}>Learn more</span>
        </div>
      </div>
      <div>
        <img className="h-44" src={icon} alt={titleOne} />
      </div>
    </div>
  );
};

export default ServiceCard;
