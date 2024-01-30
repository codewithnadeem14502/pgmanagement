import React from "react";

import Header from "../components/Header";
import PricingCards from "../components/PricingCards";
import Accordion from "../components/Accordion";
import Footer from "../components/Footer";
import Base1 from "../components/Base1";
import Base2 from "../components/Base2";
import Base3 from "../components/Base3";
const Home = () => {
  return (
    <div className="w-full h-screen bg-slate-800">
      <Header />
      <Base1 />
      {/* <Base2 /> */}
      <Base3 />
      <PricingCards />
      <Accordion />
      <Footer />
    </div>
  );
};

export default Home;
