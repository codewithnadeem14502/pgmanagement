import React from "react";
import { motion } from "framer-motion";
import books from "../assets/books.svg";
import automatic from "../assets/automatic.svg";
import addtenant from "../assets/addtenant.svg";
import addtenant2 from "../assets/addtenant2.svg";
import confuse from "../assets/confuse.svg";
import history from "../assets/history.svg";
import home from "../assets/home.svg";
import security from "../assets/security.svg";

const pointsData = [
  {
    point: "Easy addition and removal of tenants' data ",
    image: addtenant2,
  },
  {
    point:
      "Easy addition and removal of tenants' data  with completely user friendly desgin",
    image: addtenant,
  },
  {
    point:
      "SSL guarantees 100% data security, preventing leaks for you and your tenants.",
    image: security,
  },
  {
    point:
      "Automated algorithms effortlessly and securely handle the maintenance of tenants' details    ",
    image: automatic,
  },
  {
    point:
      "Eliminate the need to remember rent amounts for paid and unpaid tenants.",
    image: confuse,
  },
  {
    point:
      "Monthly, we update and analyze tenants' data for accuracy, including the previous month",
    image: history,
  },
  {
    point:
      "In short, one stop destination for your hassle free rent management",
    image: home,
  },
  {
    point: "Complete elimination of old fashion book keeping records",
    image: books,
  },
  // Add similar entries for each point with its respective image
  // ...
];
const RentManagement = () => {
  return (
    <div className="flex flex-wrap justify-center items-center mt-16 px-5 md:px-10">
      {pointsData.map((data, index) => (
        <motion.div
          key={index}
          className={`bg-slate-800 text-white p-6 m-5  ml-5  md:w-64 lg:w-96 flex-col  lg:flex rounded-md shadow-md border-2 lg:flex-row `}
          initial={{ x: index % 2 === 0 ? -1000 : 1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="lg:w-1/2 p-5">
            <img
              src={data.image}
              alt={`Point ${index + 1}`}
              className="w-full h-auto rounded-md lg:h-full lg:w-auto"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-4 ">
            <p className="text-lg font-semibold mb-2">{data.point}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RentManagement;
