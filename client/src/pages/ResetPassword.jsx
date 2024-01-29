// src/ResetPassword.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import config from "../../config.json";
const ResetPassword = () => {
  const { id, resetIdentifier } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const URL = config.BACKEND_URL;

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/v1/pg/resetpassword/${id}/${resetIdentifier}`,
        {
          password,
        }
      );
      const message = response.data.message;
      setMessage(response.data.message);
      enqueueSnackbar(message, { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-300 p-8 shadow-md rounded-md">
        <BackButton />
        <h1 className="text-2xl pt-5 font-semibold mb-4">Reset Password</h1>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 mb-1">
            New Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full border rounded-md p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
