import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import config from "../../config.json";

import logo from "../assets/mainlogo.svg";

const Header = () => {
  const navigate = useNavigate();
  const { user, removeCookie } = useUser();
  const userIDcontext = user.id;
  const { enqueueSnackbar } = useSnackbar();
  const URL = config.BACKEND_URL;
  const [menuVisible, setMenuVisible] = useState(false);

  const handleHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  const handleLogout = async () => {
    try {
      // Make an API request to logout
      const response = await axios.get(`${URL}/api/v1/pg/logout`);
      const message = response.data.message;
      if (message === "Logout Successful") {
        // Clear the "access-token" cookie on the client side
        removeCookie("access-token");

        // Show a success notification
        enqueueSnackbar(message, { variant: "success" });

        // Redirect to the login page
        navigate("/login");
      } else {
        console.error("Logout error:", response);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="flex justify-between items-center p-4 md:p-6 bg-slate-800">
      <img
        src={logo}
        alt="logo"
        onClick={handleHome}
        className="w-28 h-20 md:w-34 md:h-28 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
      />
      {!userIDcontext && (
        <div className="hidden md:block">
          <button
            className="ml-4 p-3 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-yellow-500 transition-all duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      )}
      <div className="md:hidden">
        <MdMenu
          size={30}
          className="cursor-pointer transition-transform transform hover:scale-110"
          onClick={toggleMenu}
        />
      </div>

      {menuVisible && (
        <div className="md:hidden absolute top-20 right-2  bg-slate-800 p-7 rounded-lg shadow-lg md:top-10 md:p-4 md:w-56 md:right-4 transition-all duration-300">
          {!userIDcontext ? (
            <button
              className="block mb-2 p-2 bg-yellow-400 text-sm rounded-lg hover:bg-yellow-500 transition-all duration-300"
              onClick={() => {
                toggleMenu();
                handleLogin();
              }}
            >
              Login
            </button>
          ) : (
            <>
              <button
                className="block mb-2 p-2 font-semibold text-white text-sm rounded-lg hover:text-indigo-500 transition-all duration-300"
                onClick={() => {
                  toggleMenu();
                  handleDashboard();
                }}
              >
                Dashboard
              </button>
              <button
                className="block mb-2 p-2 font-semibold text-white text-sm rounded-lg hover:text-indigo-500 transition-all duration-300"
                onClick={() => {
                  toggleMenu();
                  handleProfile();
                }}
              >
                Profile
              </button>
              <button
                className="block mb-2 p-2 font-semibold text-white text-sm rounded-lg hover:text-indigo-500 transition-all duration-300"
                onClick={() => {
                  toggleMenu();
                  handleHistory();
                }}
              >
                History
              </button>
              <button
                className="block mb-2 p-2 bg-yellow-400 text-sm rounded-lg hover:bg-yellow-500 transition-all duration-300"
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
      {userIDcontext && (
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="p-3 font-semibold text-lg text-white rounded-lg hover:text-indigo-500 transition-all duration-300"
            onClick={handleDashboard}
          >
            Dashboard
          </button>{" "}
          <button
            className="p-3 font-semibold text-lg text-white rounded-lg hover:text-indigo-500 transition-all duration-300"
            onClick={handleProfile}
          >
            Profile
          </button>
          <button
            className="p-3 font-semibold text-lg text-white rounded-lg hover:text-indigo-500 transition-all duration-300"
            onClick={handleHistory}
          >
            History
          </button>
          <button
            className="p-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-yellow-500 transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
