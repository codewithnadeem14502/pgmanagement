// RegisterForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import config from "../../config.json"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pgname, setPgname] = useState("");
  const [pgaddress, setPgaddress] = useState("");
  const [pgnumber, setPgnumber] = useState("");
  const [pgplantype, setPgplantype] = useState("a");
  const [paid, setPaid] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const URL = config.BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respond = await axios.post(
        `${URL}/api/v1/pg/register`,
        {
          email,
          password,
          pgname,
          pgaddress,
          pgnumber,
          pgplantype,
          paid,
        }
      );

      const message = respond.data.message;
      if (message == "Created Successfully") {
        // console.log("Registration successful");
        enqueueSnackbar(message, { variant: "success" });
        navigate("/admin/pglist");
      } else {
        console.error("Registration failed");
        enqueueSnackbar(message, { variant: "error" });
        // Handle the error, show a message to the user, etc.
      }
    } catch (error) {
      console.error("Error during registration:", error);
      enqueueSnackbar(message, { variant: "error" });
      // Handle network errors, etc.
    }
  };

  const handlePaidChange = (e) => {
    setPaid(e.target.value === "true");
  };

  return (
    <div className="container mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-indigo-300 p-8 rounded-md shadow-lg mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        <BackButton />
        <h2 className="text-2xl font-bold m-4">Register</h2>

        {/* Email Input */}
        <div className="my-5">
          <label
            htmlFor="email"
            className="block text-gray-700 text-xl font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="my-5">
          <label
            htmlFor="password"
            className="block text-gray-700 text-xl font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* PG Name Input */}
        <div className="my-5">
          <label
            htmlFor="pgname"
            className="block text-gray-700 text-xl font-bold mb-2"
          >
            PG Name
          </label>
          <input
            type="pgname"
            id="pgname"
            name="pgname"
            placeholder="Enter your PG Name"
            value={pgname}
            onChange={(e) => setPgname(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* PG Address Input */}
        <div className="my-5">
          <label
            htmlFor="pgaddress"
            className="block text-gray-700 text-xl font-bold mb-2"
          >
            PG Address
          </label>
          <input
            type="pgaddress"
            id="pgaddress"
            name="pgaddress"
            placeholder="Enter your PG Address"
            value={pgaddress}
            onChange={(e) => setPgaddress(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* PG Number Input */}
        <div className="my-5">
          <label
            htmlFor="pgnumber"
            className="block text-gray-700 text-xl font-bold mb-2"
          >
            PG Number
          </label>
          <input
            type="pgnumber"
            id="pgnumber"
            name="pgnumber"
            placeholder="Enter your PG Number"
            value={pgnumber}
            onChange={(e) => setPgnumber(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* PG Plan Type Input */}
        <div className="mb-4">
          <label
            htmlFor="pgplantype"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select Plant Type
          </label>
          <select
            id="pgplantype"
            name="pgplantype"
            value={pgplantype}
            onChange={(e) => setPgplantype(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none text-gray-700 text-xl  focus:border-blue-500"
          >
            {" "}
            <option value="">Select Plan Type</option>
            <option value="Harmony">Harmony</option>
            <option value="Unity">Unity</option>
            <option value="Integrity">Integrity</option>
          </select>
        </div>

        {/* Radio Buttons for Paid */}
        <div className="my-5">
          <label className="block text-gray-700 text-xl font-bold mb-2">
            Paid
          </label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paid"
                value="true"
                checked={paid === true}
                onChange={handlePaidChange}
                className="form-radio  text-blue-500"
              />
              <span className="ml-2 text-lg">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="paid"
                value="false"
                checked={paid === false}
                onChange={handlePaidChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2  text-lg">No</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
