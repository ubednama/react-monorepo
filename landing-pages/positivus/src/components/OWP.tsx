const OWP = () => {
  const processSteps = [
    {
      number: "01",
      title: "Consultation",
      content:
        "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
      status: "open",
    },
    {
      number: "02",
      title: "Research and Strategy Development",
      content: "",
      status: "close",
    },
    {
      number: "03",
      title: "Implementation",
      content: "",
      status: "close",
    },
    {
      number: "04",
      title: "Monitoring and Optimization",
      content: "",
      status: "close",
    },
    {
      number: "05",
      title: "Reporting and Communication",
      content: "",
      status: "close",
    },
    {
      number: "06",
      title: "Continual Improvement",
      content: "",
      status: "close",
    },
  ];
  return (
    <div className="space-y-20">
      <hr className="w-16 border-[3.5px] border-figmaGreen mx-auto" />
      <div className="flex gap-10 items-center w-[55%]">
        <div className="bg-figmaGreen px-1.5 py-1 font-semibold text-4xl rounded-md min-w-fit">
          Our Working Process
        </div>
        <div className="max-w-2xl text-gray-600 leading-tight">
          Step-by-Step Guide to Achieving Your Business Goals
        </div>
      </div>

      <div className="space-y-4">
        {processSteps.map((step) => (
          <div
            key={step.number}
            className={`border border-black border-b-4 rounded-3xl ${step.status === "open" ? "bg-figmaGreen" : "bg-zinc-50"} py-12 pl-16 pr-20 space-y-6`}
          >
            <div className="flex justify-between">
              <div className="hover:no-underline">
                <div className="flex items-center gap-6">
                  <span className="text-5xl font-bold">{step.number}</span>
                  <span className="text-3xl">{step.title}</span>
                </div>
              </div>
              <div className="border border-black bg-white rounded-full size-14 flex items-center justify-center font-bold text-4xl pb-2">
                {step.status === "open" ? "-" : "+"}
              </div>
            </div>
            {step.status === "open" && (
              <>
                <hr className="border border-black" />
                <div className="text-gray-600 font-medium w-[90%] ">
                  {step.content}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OWP;
