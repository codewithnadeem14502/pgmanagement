import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../utils/UserContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import config from "../../config.json";
const History = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("current");
  const { user } = useUser();
  const userIDcontext = user.id;
  const [tenants, setTenants] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const URL = config.BACKEND_URL;
  console.log(userIDcontext);
  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/v1/tenant/user/${userIDcontext}`
        );
        setTenants(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTenantData();
  }, [userIDcontext]);

  const handleToggleMonth = (month) => {
    setSelectedMonth(month);
  };

  const filteredTenants = tenants.filter((tenant) => {
    const currentDate = new Date();
    const tenantDateFrom = new Date(tenant.DateFrom);

    if (selectedMonth === "current") {
      return tenantDateFrom.getMonth() === currentDate.getMonth();
    } else if (selectedMonth === "previous") {
      return (
        tenantDateFrom.getMonth() === currentDate.getMonth() - 1 ||
        (tenantDateFrom.getMonth() === 11 && currentDate.getMonth() === 0)
      );
    }

    return true;
  });
  const handleHome = () => {
    navigate("/");
  };
  const getMonthName = (monthNumber) => {
    const months = [
      "January's",
      "February's",
      "March's",
      "April's",
      "May's",
      "June's",
      "July's",
      "August's",
      "September's",
      "October's",
      "November's",
      "December's",
    ];
    return months[monthNumber];
  };

  const getPreviousMonthName = () => {
    const currentDate = new Date();
    const previousMonth =
      currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
    return getMonthName(previousMonth);
  };

  const monthName =
    selectedMonth === "current"
      ? getMonthName(new Date().getMonth())
      : getPreviousMonthName();
  return (
    <>
      <Header />
      <div className="m-10 overflow-scroll no-scrollbar">
        {/* <div className="flex">
        <FaAngleDoubleRight className="text-red-500 w-5 h-5 hover:text-red-600" />
        <h1
          className="text-lg mb-5 font-bold hover:underline"
          onClick={handleHome}
        >
          HOME
        </h1>
      </div> */}
        <div className="flex-row justify-between items-center">
          <div className="w-full flex flex-wrap justify-between items-center">
            <BackButton />

            <div className="flex space-x-4 mt-5 md:mt-0">
              <button
                className={`${
                  selectedMonth === "current" ? "bg-blue-500" : "bg-gray-300"
                } text-white px-4 py-2 rounded hover:bg-blue-700`}
                onClick={() => handleToggleMonth("current")}
              >
                Current Month
              </button>
              <button
                className={`${
                  selectedMonth === "previous" ? "bg-blue-500" : "bg-gray-300"
                } text-white px-4 py-2 rounded hover:bg-blue-700`}
                onClick={() => handleToggleMonth("previous")}
              >
                Previous Month
              </button>
            </div>
          </div>
          <div>
            <h1 className="mb-5  text-xl font-bold my-10 md:text-3xl">
              {`${monthName} history`}
            </h1>
          </div>
        </div>
        <table className="min-w-full divide-y-2 divide-x-2 divide-black ">
          <thead className="bg-indigo-500 ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider    border-2 border-black "
              >
                S/no
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider   border-2 border-black"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider    border-2 border-black"
              >
                Phone No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider    border-2 border-black"
              >
                adhaarcardno
              </th>
              {/* <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
            >
              Is New
            </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
              >
                Floor No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
              >
                Room No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
              >
                No of Sharing
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider border-2 border-black"
              >
                Date From
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider  border-2 border-black"
              >
                Date To
              </th>
              {/* <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider    border-2 border-black"
            >
              Rent Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
            >
              Remaining Amount
            </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
              >
                Rent Paid
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-x-2 divide-black">
            {filteredTenants.map((tenant, index) => (
              <tr key={tenant?._id}>
                <td className="px-6 py-4 whitespace-nowrap border-2 border-black ">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  border-2 border-black">
                  {tenant?.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  border-2 border-black">
                  {tenant?.PhoneNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  border-2 border-black">
                  {tenant?.adhaarcardno}
                </td>

                {/* <td className="px-6 py-4 whitespace-nowrap border-2 border-black ">
                {tenant?.IsNew ? "Yes" : "No"}
              </td> */}
                <td className="px-6 py-4 whitespace-nowrap border-2 border-black ">
                  {tenant?.floorNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-2 border-black ">
                  {tenant?.flatNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  border-2 border-black">
                  {tenant?.noOfSharing}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                  {tenant?.DateFrom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                  {tenant?.DateTo}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                {tenant?.RentAmount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                {tenant?.RemainingAmount}
              </td>

            */}
                <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                  {tenant?.RentPaid ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;
