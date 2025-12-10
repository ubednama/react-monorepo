const amazon = "/assets/Companies/amazon.png";
const dribble = "/assets/Companies/dribble.png";
const hubspot = "/assets/Companies/hubspot.png";
const netflix = "/assets/Companies/netflix.png";
const notion = "/assets/Companies/notion.png";
const zoom = "/assets/Companies/zoom.png";

const CompanyStrap = () => {
    const logos = [amazon, dribble, hubspot, netflix, notion, zoom]
  return (
    <div className="flex items-center justify-between bg-zinc-100 py-8 px-28">
    {logos.map((img, idx) => (
        <img className="h-8" src={img} key={idx} />
    ))}
  </div>
  )
}

export default CompanyStrap