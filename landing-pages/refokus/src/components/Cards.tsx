import Card from "./Card";

const Cards = () => {
  const contents = [
    { header: "Up Next: News", title: "Insights and behind the scenes", width: "basis-1/3", start: false, para: true, team: "Explore what drives our team", hover: "none" },
    { header: "Get In Touch", title: "Let's get to it, together.", width: "basis-2/3", start: true, para: false, team: "", hover: "bg-violet-500" },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto py-20 flex gap-3">
        {contents.map((content, index) => (<Card
          key={index}
          width={content.width}
          start={content.start}
          hover={content.hover}
          para={content.para}
          heading={content.header}
          text={content.title}
          team={content.team}
        />))}
      </div>
    </div>
  );
};

export default Cards;
