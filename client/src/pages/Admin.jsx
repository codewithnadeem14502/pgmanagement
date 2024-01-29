// LoginForm.js

import config from "../../config.json";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";
const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, setCookie] = useCookies(["accesstoken"]);
  const navigate = useNavigate();
  const URL = config.BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hahah");
    try {
      const response = await axios.post(`${URL}/api/v1/pg/admin`, {
        email,
        password,
      });
      {
        console.log(email);
      }

      const message = response.data.message;
      console.log(message);
      // Update the setCookie function to set the token in cookies
      setCookie("access-token", response.data.token);
      // console.log("token nnn ", response.data.token);
      if (message == "Admin login successfully") {
        // console.log("Registration successful");
        enqueueSnackbar(message, { variant: "success" });
        navigate("/admin/pglist");
      } else {
        console.error("Registration failed");
        enqueueSnackbar(message, { variant: "error" });
        // Handle the error, show a message to the user, etc.
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      console.error("Error logging in:", error.message);
      // Handle error (show a message, redirect, etc.)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        className="max-w-md w-full p-6 bg-indigo-300 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4">Admin login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-black text-lg font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-black text-lg font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Admin;
