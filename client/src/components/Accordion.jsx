import React, { useState } from "react";

const Accordion = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionData = [
    {
      question:
        "Why in our pricing plans only number of tenants are changing and the rest of all other features are completely the same?",
      answer:
        "In our plans, the terms 'for small sized', 'for medium sized', and 'for large sized' has nothing to do with the sizes (height) of buildings. These terms have been introduced according to the number of tenants a particular building can accommodate. For an example, say there are three PG owners, each one of them owns a 5 floor PG building. Now, depending upon the carpet area and the overall architecture of a building, the number of rooms, number of tenant sharing (1, 2, 3, 4,..) will vary, which will ultimately lead to the increase or decrease in the number of tenants. As a result, even the removal of one feature from our plans apart from the number of tenants will be completely unfair to a PG owner. ",
    },
    {
      question:
        "Why are we not providing monthly and yearly reports or analysis?        ",
      answer: `Let us introduce two anatomies: Fixed businesses and Variable businesses:
      
      i) Fixed businesses here refers to those businesses where overall monthly or yearly costs & profits can be predicted or say these businesses are less volatile in nature
      Example: A milk supplier who has 100 monthly active customers, PGs', A salesman who sells 60 healthcare insurances monthly for a year for a fixed margin

      ii) Variable businesses refers to those businesses where depending upon the number of clients, product features, and a lot of other parameters come into play which in turn results in high volatility. Now, specifically speaking about PGs, a PG owner already knows about the monthly food expenses, Wifi expenses, and other miscellaneous expenses (these will slightly vary not much). The owner already predicts about the rent amount which will be collected after the end of every month, his/her monthly expenditure costs and profit margins with some slight changes in the numbers according to the passage of every month. Now, if we provide monthly and yearly reports with graphs, histograms or pie charts, a PG owner will get bombarded with too much of unnecessary information which is already known to him/her.
      Example: Securities and Capital markets, Mechanical and Aerospace Industries, Computer & IT, Electronics Industries
      `,
    },
    {
      question:
        "Why are we providing history for only a maximum of two months for tenants data?",
      answer:
        "Say that the tenant has been residing in the PG for the past 10 months and intends to continue. Logically, the history of the tenant for the last three, four or more months is unnecessary, as the tenant is expected to consistently pay monthly rent to secure continued accomodation in the PG. A record of just one month's history should suffice for the PG owner. However, for a safer side, we are providing the history data for an additional month.",
    },

    {
      question: "What about the refund policy?",
      answer:
        "PG owners can claim a 100% refund on their plan only if informed within a week from the date of purchase. ",
    },
  ];

  return (
    <>
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 text flex justify-center items-center md:text-3xl my-14">
        FAQs
      </h1>

      <div id="accordion" className="mt-5 bg-white">
        {accordionData.map((item, index) => (
          <div key={index}>
            <h2>
              <button
                type="button"
                className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-black border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 bg-slate-100 gap-3  ${
                  activeAccordion === index ? "bg-gray-100" : ""
                }`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeAccordion === index}
                aria-controls={`accordion-collapse-body-${index}`}
              >
                <span>{item.question}</span>
                <svg
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              className={`${
                activeAccordion === index ? "" : "hidden"
              } p-5 border border-b-0 border-gray-200 bg-slate-200 rounded-b-lg `}
              id={`accordion-collapse-body-${index}`}
              aria-labelledby={`accordion-collapse-heading-${index}`}
            >
              <p className="mb-2 text-black whitespace-pre-line">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Accordion;
