// src/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import config from "../../config.json";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const URL = config.BACKEND_URL;

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${URL}/api/v1/pg/forgotpassword`, {
        email,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-slate-300  max-w-md w-full p-10 shadow-md rounded-md">
          <BackButton />
          <h1 className="text-2xl pt-5  font-semibold mb-4">Forgot Password</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-md p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleForgotPassword}
          >
            Send Reset Link
          </button>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
