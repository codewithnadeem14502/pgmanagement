import React from "react";

import Header from "../components/Header";
import PricingCards from "../components/PricingCards";
import Accordion from "../components/Accordion";
import Footer from "../components/Footer";
import Base1 from "../components/Base1";
import Base2 from "../components/Base2";
const Home = () => {
  return (
    <div className="w-full h-screen bg-white px-5">
      <Header />
      <Base1 />
      <Base2 />
      <PricingCards />
      <Accordion />
      <Footer />
    </div>
  );
};

export default Home;
