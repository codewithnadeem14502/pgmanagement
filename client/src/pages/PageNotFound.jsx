// NotFound.js
import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl text-gray-700 mb-4">Page Not Found</p>
        <p className="text-lg text-gray-500">
          The page you are looking for might be in another dimension.
        </p>
        <p className="text-lg font-semibold text-black">
          Kindly check your URL path
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
