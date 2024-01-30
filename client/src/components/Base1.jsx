import React from "react";
import { motion } from "framer-motion";
// import body2image from "../assets/download.jpeg";
import body2image from "../assets/homebuilding.svg";

const Base1 = () => {
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const textAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="px-5 text-white mt-5">
      <motion.div
        className="w-full flex justify-between items-center px-1 md:px-5"
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
      >
        <div className="w-[600px] h-auto">
          <motion.h2
            className="font-bold text-lg md:text-xl"
            variants={textAnimation}
          >
            To all the PG owners out there, while you run your PG,
          </motion.h2>
          <motion.h2
            className="font-bold text-lg md:text-xl"
            variants={textAnimation}
          >
            There are some questions to be asked for:
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl font-medium mt-5 pb-2 ml-5"
            variants={textAnimation}
          >
            Are you frustrated with managing rents?
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-medium pb-2 ml-5"
            variants={textAnimation}
          >
            Are you fed up calculating various amounts?
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-medium pb-2 ml-5"
            variants={textAnimation}
          >
            Should hard copy documents for the authentication of a tenant become
            obsolete?
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-medium pb-2 ml-5"
            variants={textAnimation}
          >
            Do you need all the tenants' details at one place?
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-medium pb-2 ml-5 mb-5"
            variants={textAnimation}
          >
            Are you in search of hassle-free rent management?
          </motion.p>

          <motion.h2
            className="font-bold text-lg md:text-xl ml-0 md:ml-10"
            variants={textAnimation}
          >
            What is the answer to these questions?
          </motion.h2>
          <motion.h1
            className="font-bold text-lg md:text-xl ml-0 md:ml-5"
            variants={textAnimation}
          >
            <span className="font-bold text-blue-500">"EasePG"</span> is one
            word answer to all your questions above
          </motion.h1>
        </div>
        <div className="w-[500px] h-[340px] hidden lg:block round-lg">
          <motion.img
            src={body2image}
            alt="body"
            className="w-full h-full object-fit pr-10"
            initial="hidden"
            animate="visible"
            variants={imageAnimation}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Base1;
