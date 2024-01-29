// AddTenantForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import config from "../../config.json";

const AddTenantForm = () => {
  // console.log("hello ");
  const URL = config.BACKEND_URL;

  const { user } = useUser();
  const userIDcontext = user.id;
  const { enqueueSnackbar } = useSnackbar();
  // console.log("context ", user.id);
  const [userId, setuserId] = useState(userIDcontext);
  const [clientName, setclientName] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [noOfSharing, setnoOfSharing] = useState("");
  const [DateFrom, setDateFrom] = useState(0);
  const [DateTo, setDateTo] = useState(new Date());
  const [adhaarcardno, setadhaarcardno] = useState("");
  const [RentAmount, setRentAmount] = useState("");
  const [AmountPaid, setAmountPaid] = useState("");
  const [RemainingAmount, setRemainingAmount] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Status, setStatus] = useState("");
  const [deposit, setDeposit] = useState("");
  const [sharing1, setSharing1] = useState("");
  const [sharing2, setSharing2] = useState("");
  const [sharing3, setSharing3] = useState("");
  const [sharing4, setSharing4] = useState("");
  const [sharing5, setSharing5] = useState("");
  const [IsNew, setIsNew] = useState(false);
  const [DepositPaid, setDepositPaid] = useState(false);
  const [RentPaid, setRentPaid] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roomOptions, setRoomOptions] = useState([]);
  // const [status, setStatus] = useState("");
  // console.log("aoum paid " + AmountPaid + " " + "ddd " + deposit);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // console.log("User ID:", user.id);
      // console.log("Date :", user);

      const respond = await axios.post(`${URL}/api/v1/tenant/add/`, {
        userId,
        clientName,
        floorNo,
        flatNo,
        noOfSharing,
        DateFrom,
        DateTo,
        RentAmount,
        AmountPaid,
        RemainingAmount,
        PhoneNo,
        Status,
        IsNew,
        DepositPaid,
        RentPaid,
        adhaarcardno,
        sharing1,
        sharing2,
        sharing3,
        sharing4,
        sharing5,
        deposit,
      });
      // console.log("Created Successfully");
      const message = respond.data.message;
      if (message == "Created Successfully") {
        // console.log("Registration successful");
        enqueueSnackbar(message, { variant: "success" });
        navigate("/dashboard");
      } else {
        console.error("failed to add");
        enqueueSnackbar(message, { variant: "error" });
        // Handle the error, show a message to the user, etc.
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Internal Server Error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate minimum date (e.g., set a minimum age of 18 years)
  // const currentDate = new Date();
  // const firstDayOfMonth = new Date(
  //   currentDate.getFullYear(),
  //   currentDate.getMonth(),
  //   1
  // );

  const handleIsNewChange = (e) => {
    setIsNew(e.target.value === "true");
  };
  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value === "true");
  // };
  const handleDepositPaidChange = (e) => {
    setDepositPaid(e.target.value === "true");
  };
  const handleRentPaidChange = (e) => {
    setRentPaid(e.target.value === "true");
  };
  // handleDateFromChange function
  const handleDateFromChange = (selectedDate) => {
    const startDate = new Date(selectedDate);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate()
    );

    setDateFrom(selectedDate);
    setDateTo(endDate.toISOString().split("T")[0]);
  };
  useEffect(() => {
    setuserId(userIDcontext);
  }, [userIDcontext]);

  const updatedRemainingAmount = (getsharing, getisNew) => {
    let newRemainingAmount = 0;
    let chooseoption = getsharing;

    if (chooseoption == 1) {
      newRemainingAmount += Number(sharing1);
    }
    if (chooseoption == 2) {
      newRemainingAmount += Number(sharing2);
    }
    if (chooseoption == 3) {
      newRemainingAmount += Number(sharing3);
    }
    if (chooseoption == 4) {
      newRemainingAmount += Number(sharing4);
    }
    if (chooseoption == 5) {
      newRemainingAmount += Number(sharing5);
    }

    if (getisNew == true) {
      newRemainingAmount += Number(deposit);
    }
    // console.log(newRemainingAmount - Number(AmountPaid));

    return newRemainingAmount - Number(AmountPaid);
  };
  const updatedepositamount = (AmountPaid, deposit) => {
    if (Number(AmountPaid) >= Number(deposit)) {
      // console.log("aoum paid " + AmountPaid + " " + "ddd " + deposit);
      // console.log("ansfrom paid", true);
      return true;
    } else return false;
  };
  const updaterentpaid = (RemainingAmount) => {
    if (Number(RemainingAmount) == 0) {
      return true;
    } else return false;
  };
  useEffect(() => {
    const newRemainingAmount = updatedRemainingAmount(noOfSharing, IsNew);
    const newrentamount = updatedrentamount(noOfSharing);
    const newdeposit = updatedepositamount(AmountPaid, deposit);
    const newrentpaid = updaterentpaid(RemainingAmount);
    // const newstatus = getNumberOfDays(DateTo, DateFrom);
    // setStatus(newstatus);
    setRentAmount(newrentamount);
    setRemainingAmount(newRemainingAmount);
    setDepositPaid(newdeposit);
    setRentPaid(newrentpaid);
  }, [
    noOfSharing,
    IsNew,
    deposit,
    AmountPaid,
    DepositPaid,
    RentPaid,
    RemainingAmount,
    sharing1,
    sharing2,
    sharing3,
    sharing4,
    sharing5,
  ]);

  const updatedrentamount = (getsharing) => {
    let newRemainingAmount = 0;
    let chooseoption = getsharing;

    if (chooseoption == 1) {
      newRemainingAmount += Number(sharing1);
    }
    if (chooseoption == 2) {
      newRemainingAmount += Number(sharing2);
    }
    if (chooseoption == 3) {
      newRemainingAmount += Number(sharing3);
    }
    if (chooseoption == 4) {
      newRemainingAmount += Number(sharing4);
    }
    if (chooseoption == 5) {
      newRemainingAmount += Number(sharing5);
    }
    // {
    //   console.log(newRentamount);
    // }

    return newRemainingAmount;
  };

  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  const getCurrentDate = () => {
    return new Date();
  };

  useEffect(() => {
    const updateStatus = () => {
      const currentDate = getCurrentDate();
      if (DateTo) {
        const daysDifference = calculateDaysDifference(currentDate, DateTo);

        // Update status based on your condition
        if (daysDifference === 19748) {
          setStatus(0);
        } else {
          setStatus(Math.abs(daysDifference));
        }
      }
    };

    // Update status initially
    updateStatus();

    // Update status every day (24 * 60 * 60 * 1000 milliseconds)
    const intervalId = setInterval(updateStatus, 24 * 60 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [DateTo]); // Include DateTo in the dependency array

  const handleFloorChange = (e) => {
    const selectedFloor = e.target.value;
    setFloorNo(selectedFloor);

    // Define your room options based on the selected floor
    const newRoomOptions = generateRoomOptions(selectedFloor);
    setRoomOptions(newRoomOptions);
  };

  const generateRoomOptions = (selectedFloor) => {
    if (selectedFloor === "Gr") {
      return [
        "Gr-1",
        "Gr-2",
        "Gr-3",
        "Gr-4",
        "Gr-5",
        "Gr-6",
        "Gr-7",
        "Gr-8",
        "Gr-9",
        "Gr-10",
        "Gr-11",
        "Gr-12",
        "Gr-13",
        "Gr-14",
        "Gr-15",
        "Gr-16",
        "Gr-17",
        "Gr-18",
        "Gr-19",
        "Gr-20",
      ];
    } else if (selectedFloor.startsWith("F")) {
      // Extract the floor number from the selectedFloor string
      const floorNumber = parseInt(selectedFloor.slice(1), 20);

      // Generate array for the specified floor
      const floorArray = [];
      for (let i = floorNumber * 100 + 1; i <= floorNumber * 100 + 20; i++) {
        floorArray.push(String(i));
      }
      return floorArray;
    }

    // Handle other cases or return an empty array if the floor is not recognized
    return [];
  };

  return (
    <>
      <Header />
      <div>
        <div className="flex justify-between items-center m-2 md:m-5">
          <h1 className="text-lg md:text-xl  font-bold m-5 mb-0">
            Add Tenants
          </h1>
          <BackButton />
        </div>
        <form
          className="max-w-md bg-indigo-300 p-8 rounded-md shadow-lg mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl"
          onSubmit={handleSubmit}
        >
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <label className="block mb-2 font-bold">Tenant Name</label>
          <input
            type="text"
            name="clientName"
            value={clientName}
            onChange={(e) => setclientName(e.target.value)}
            className="w-full p-2 border"
            required
          />
          <div className="flex   flex-wrap justify-evenly items-center mt-5  ">
            <div className="">
              <label className="block mb-2 font-bold">Floor No</label>
              <select
                name="floorNo"
                value={floorNo}
                required
                onChange={handleFloorChange}
                className="w-full p-2 border"
              >
                <option value="">Select Floor</option>
                <option value="Gr">Ground Floor</option>
                <option value="F1">Floor 1</option>
                <option value="F2">Floor 2</option>
                <option value="F3">Floor 3</option>
                <option value="F4">Floor 4</option>
                <option value="F5">Floor 5</option>
                <option value="F6">Floor 6</option>
                <option value="F7">Floor 7</option>
                <option value="F8">Floor 8</option>
                <option value="F9">Floor 9</option>

                {/* Add more floor options as needed */}
              </select>
              <label className="block mb-2 font-bold">Room No</label>
              <select
                name="flatNo"
                value={flatNo}
                required
                onChange={(e) => setFlatNo(e.target.value)}
                className="w-full p-2 border"
              >
                <option value="">Select Room</option>
                {/* Dynamically populate room options based on selected floor */}
                {roomOptions.map((roomOption, index) => (
                  <option key={index} value={roomOption}>
                    {roomOption}
                  </option>
                ))}
              </select>
              <label className="block mb-2 font-bold">No Of Sharing</label>
              <select
                name="noOfSharing"
                value={noOfSharing}
                required
                onChange={(e) => setnoOfSharing(e.target.value)}
                className="w-full p-2 border"
              >
                <option value="">Select No Of Sharing</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <label className="block mb-2 font-bold">Deposit</label>
              <input
                type="text"
                name="deposit"
                required
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full p-2 border"
              />{" "}
              <label className="block mb-2 font-bold">PhoneNo</label>
              <input
                type="text"
                name="PhoneNo"
                value={PhoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full p-2 border"
                required
              />
              <label className="block mb-2 font-bold">Adhaar Card No</label>
              <input
                type="text"
                name="adhaarcardno"
                value={adhaarcardno}
                required
                onChange={(e) => setadhaarcardno(e.target.value)}
                className="w-full p-2 border"
              />
            </div>

            <div>
              <label className="block mb-2 font-bold">Sharing 1</label>
              <input
                type="text"
                name="sharing1"
                value={sharing1}
                required
                onChange={(e) => setSharing1(e.target.value)}
                className="w-full p-2 border"
              />{" "}
              <label className="block mb-2 font-bold">Sharing 2</label>
              <input
                type="text"
                name="sharing2"
                value={sharing2}
                required
                onChange={(e) => setSharing2(e.target.value)}
                className="w-full p-2 border"
              />{" "}
              <label className="block mb-2 font-bold">Sharing 3 </label>
              <input
                type="text"
                name="sharing3"
                value={sharing3}
                required
                onChange={(e) => setSharing3(e.target.value)}
                className="w-full p-2 border"
              />{" "}
              <label className="block mb-2 font-bold">Sharing 4</label>
              <input
                type="text"
                name="sharing4"
                value={sharing4}
                required
                onChange={(e) => setSharing4(e.target.value)}
                className="w-full p-2 border"
              />
              <label className="block mb-2 font-bold">Sharing 5</label>
              <input
                type="text"
                name="sharing5"
                value={sharing5}
                required
                onChange={(e) => setSharing5(e.target.value)}
                className="w-full p-2 border"
              />
            </div>
          </div>
          <div className="my-5">
            <label className="block text-xl font-bold mb-2">Date From</label>
            <input
              type="date"
              name="DateFrom"
              value={DateFrom}
              required
              // min={firstDayOfMonth.toISOString().split("T")[0]}
              className="w-full p-2 border"
              onChange={(e) => handleDateFromChange(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="block text-xl font-bold mb-2">Date To</label>
            <input
              type="date"
              name="DateTo"
              value={DateTo}
              required
              // min={firstDayOfMonth.toISOString().split("T")[0]}
              className="w-full p-2 border"
              readOnly // Make the DateTo input read-only to prevent manual input
            />
          </div>
          <label className="block mb-2 font-bold">Amount Paid</label>
          <input
            type="text"
            name="AmountPaid"
            value={AmountPaid}
            required
            // value={newpaidamount(RemainingAmount, AmountPaid)}
            onChange={(e) => setAmountPaid(e.target.value)}
            className="w-full p-2 border"
          />
          <label className="block mb-2 font-bold">Rent Amount</label>
          <input
            type="text"
            name="RentAmount"
            value={RentAmount}
            required
            onChange={(e) => setRentAmount(e.target.value)}
            className="w-full p-2 border"
          />
          <label className="block mb-2 font-bold">Remaining Amount</label>
          <input
            type="text"
            name="RemainingAmount"
            // updatedremaningamount(noOfSharing, IsNew)
            value={RemainingAmount}
            required
            onChange={(e) => setRemainingAmount(e.target.value)}
            className="w-full p-2 border"
          />

          {/* Status */}
          <label className="block mb-2 font-bold">Status</label>
          <input
            type="text"
            name="status"
            value={Status}
            required
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border"
          />
          {/* IsNew */}
          <div className="flex flex-wrap justify-evenly items-center">
            <div className="my-5">
              <label className="block  text-xl font-bold mb-2">
                Tenant New?
              </label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="IsNew"
                    value="true"
                    checked={IsNew === true}
                    onChange={handleIsNewChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="IsNew"
                    value="false"
                    checked={IsNew === false}
                    onChange={handleIsNewChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-lg">No</span>
                </label>
              </div>
            </div>
            {/* DepositPaid */}
            <div className="my-5">
              <label className="block  text-xl font-bold mb-2">
                DepositPaid
              </label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="DepositPaid"
                    value="true"
                    checked={DepositPaid === true}
                    onChange={handleDepositPaidChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="DepositPaid"
                    value="false"
                    checked={DepositPaid === false}
                    onChange={handleDepositPaidChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-lg">No</span>
                </label>
              </div>
            </div>
            {/* RentPaid */}
            <div className="my-5">
              <label className="block  text-xl font-bold mb-2">RentPaid</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="RentPaid"
                    value="true"
                    checked={RentPaid === true}
                    onChange={handleRentPaidChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="RentPaid"
                    value="false"
                    checked={RentPaid === false}
                    onChange={handleRentPaidChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2 text-lg">No</span>
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 text-lg bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTenantForm;
