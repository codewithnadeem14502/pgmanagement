import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import config from "../../config.json";
const EditPg = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [pgname, setPgName] = useState("");
  const [pgaddress, setPgAddress] = useState("");
  const [pgnumber, setPgNumber] = useState("");
  const [pgplantype, setPgPlanType] = useState("");
  const [paid, setPaid] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const URL = config.BACKEND_URL;
  useEffect(() => {
    // Fetch existing Pg data for editing
    axios
      .get(`${URL}/api/v1/pg/pgdetails/${id}`)
      .then((response) => {
        const {
          email,
          password,
          pgname,
          pgaddress,
          pgnumber,
          pgplantype,
          paid,
        } = response.data;
        setEmail(email);
        setPgName(pgname);
        setPgAddress(pgaddress);
        setPgNumber(pgnumber);
        setPgPlanType(pgplantype);
        setPaid(paid);

        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${URL}/api/v1/pg/edit/${id}`, {
        email,
        pgname,
        pgaddress,
        pgnumber,
        pgplantype,
        paid,
      });
      console.log(response);
      const message = response.data.message;

      if (message == "Updated Successfully") {
        // console.log("Registration successful");
        enqueueSnackbar(message, { variant: "success" });
        navigate(-1);
      } else {
        console.error("Registration failed");
        enqueueSnackbar(message, { variant: "error" });
        // Handle the error, show a message to the user, etc.
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handlePaidChange = (e) => {
    setPaid(e.target.value === "true");
  };
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold m-5 mb-0">
        Edit Pg Details{" "}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white p-8 rounded-md shadow-lg mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        {/* Render your form fields here with corresponding state and onChange handlers */}
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
            className="w-full border p-2 rounded border-black focus:outline-none focus:border-blue-500"
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
            onChange={(e) => setPgName(e.target.value)}
            className="w-full border p-2 rounded border-black focus:outline-none focus:border-blue-500"
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
            onChange={(e) => setPgAddress(e.target.value)}
            className="w-full border p-2 rounded border-black focus:outline-none focus:border-blue-500"
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
            onChange={(e) => setPgNumber(e.target.value)}
            className="w-full border p-2 rounded border-black focus:outline-none focus:border-blue-500"
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
            onChange={(e) => setPgPlanType(e.target.value)}
            className="w-full border p-2 rounded border-black focus:outline-none text-gray-700 text-xl  focus:border-blue-500"
          >
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

        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Update
          </button>

          <BackButton />
        </div>
      </form>
    </div>
  );
};

export default EditPg;
