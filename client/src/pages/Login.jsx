import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import BackButton from "../components/BackButton";
import config from "../../config.json";
import BackButton2 from "../components/BackButton2";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, setCookie] = useCookies(["accesstoken"]);
  const navigate = useNavigate();
  const URL = config.BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/api/v1/pg/login`, {
        email,
        password,
      });

      console.log("Token value:", response.data.token);
      setCookie("access-token", response.data.token);
      console.log("Access Token:", cookies.accesstoken);

      const message = response.data.message;

      if (message === "Login Successfully") {
        enqueueSnackbar(message, { variant: "success" });
        navigate("/dashboard");
      } else {
        console.error("Login failed");
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="max-w-md w-full p-6 bg-slate-300 rounded-md shadow-md relative"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <BackButton2 />
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
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
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full pr-10"
              required
            />
            <span
              className="absolute right-4 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <Link to="/forgotpassword">
            <h1 className="my-5 text-blue-500 underline font-semibold">
              Forgot your password?
            </h1>
          </Link>
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

export default Login;
