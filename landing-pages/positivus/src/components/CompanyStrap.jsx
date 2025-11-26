import amazon from "../assets/Companies/amazon.png"
import dribble from "../assets/Companies/dribble.png"
import hubspot from "../assets/Companies/hubspot.png"
import netflix from "../assets/Companies/netflix.png"
import notion from "../assets/Companies/notion.png"
import zoom from "../assets/Companies/zoom.png"

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