import { ArrowUpRight } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Local Restaurant Success",
      description:
        "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.",
    },
    {
      title: "B2B Software Company Growth",
      description:
        "For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.",
    },
    {
      title: "National Retail Chain Impact",
      description:
        "For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.",
    },
  ];
  return (
    <div className="space-y-20">
      <hr className="w-16 border-[3.5px] border-figmaGreen mx-auto" />
      <div className="flex gap-10 items-center">
        <div className="bg-figmaGreen px-1.5 py-1 font-semibold text-4xl rounded-md">
          Case Studies
        </div>
        <div className="w-[40%] max-w-2xl text-gray-600 leading-tight">
          Explore Real-Life Examples of Our Proven Digital Marketing Success
          through Our Case Studies
        </div>
      </div>

      <div className="bg-[#191A23] rounded-[40px] py-20">
        <div className="grid md:grid-cols-3 gap-8 divide-x-2 divide-gray-400">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="space-y-6 px-16"
            >
              <div className="text-white">{study.description}</div>
              <a
                href="#"
                className="inline-flex items-center justify-center text-figmaGreen hover:text-green-800"
              >
                Learn more <span className="text-xl ml-2"><ArrowUpRight /></span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
