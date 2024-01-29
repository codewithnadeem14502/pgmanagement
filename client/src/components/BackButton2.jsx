import React from "react";
import { useNavigate } from "react-router-dom";
const BackButton2 = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <button
      onClick={handleBack}
      className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
    >
      {"< Back"}
    </button>
  );
};

export default BackButton2;
