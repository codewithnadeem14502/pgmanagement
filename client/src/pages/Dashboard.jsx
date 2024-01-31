import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../utils/UserContext";
import config from "../../config.json"
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import { FaSortUp, FaSortDown } from "react-icons/fa";
const Dashboard = () => {
  const URL = config.BACKEND_URL;
  const navigate = useNavigate();
  const { user } = useUser();
  const userIDcontext = user.id;
  const userplantype = user.plantype;
  const [sortByFloor, setSortByFloor] = useState(null);
  const [filteredFloor, setFilteredFloor] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [counter, setCounter] = useState(23);
  // console.log(userplantype, counter);
  const [tenants, setTenants] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [searchInput, setSearchInput] = useState("");
  const [filteredTenants, setFilteredTenants] = useState([]);
  const updateFilteredTenants = (data, searchTerm) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filteredData = data.filter((tenant) =>
      tenant.clientName.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredTenants(filteredData);
  };

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/v1/tenant/user/${userIDcontext}`
        );
        setTenants(response.data);
        updateFilteredTenants(response.data, searchInput);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchTenantData();
  }, [userIDcontext, searchInput]);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this tenant?"
    );

    if (shouldDelete) {
      try {
        // Make API request to delete tenant
        await axios.delete(`${URL}/api/v1/tenant/delete/${id}`);

        // Update the state to remove the deleted tenant
        setTenants((prevTenants) =>
          prevTenants.filter((tenant) => tenant._id !== id)
        );

        // Show a success notification
        enqueueSnackbar("Deleted Successfully", { variant: "success" });
      } catch (error) {
        console.error("Error deleting data:", error);

        // Show an error notification
        enqueueSnackbar("Error deleting tenant", { variant: "error" });
      }
    }
  };

  // console.log(tenants.length);
  const handleAdd = () => {
    setCounter(counter + 1);
    console.log(counter);
    // navigate("/addtenants");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handlecounter = () => {
    setCounter(counter + 1);
    return counter;
  };
  const updatedremaningamount = (getsharing, getisNew) => {
    newRemainingAmount = getsharing;

    if (getisNew == true) {
      newRemainingAmount += getisNew;
    }
    return newRemainingAmount;
  };
  const handleedit = (id) => {
    navigate(`/tenant/${id}`);
  };

  const handleSortByFloor = (selectedFloor) => {
    setSortByFloor(selectedFloor);
    setFilteredFloor(
      tenants.filter((tenant) =>
        selectedFloor === "All" ? true : tenant.floorNo === selectedFloor
      )
    );
  };
  const handleSortByFlatNo = () => {
    const sortedTenants = (filteredFloor || tenants).sort((a, b) => {
      if (sortOrder === "asc") {
        return a.flatNo.localeCompare(b.flatNo);
      } else {
        return b.flatNo.localeCompare(a.flatNo);
      }
    });

    setFilteredFloor(sortedTenants);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
  };
  return (
    <>
      <Header />

      <div className="m-10 ">
        <div className="flex-row justify-between  items-center">
          <div className="w-full flex flex-wrap justify-between items-center mt-5">
            <select
              value={sortByFloor || "All"}
              onChange={(e) => handleSortByFloor(e.target.value)}
              className="border p-2 rounded mb-5"
            >
              <option value="All">All Floors</option>
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
              {/* Add more options for other floors as needed */}
            </select>
            <input
              type="text"
              placeholder="Search by Name"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                updateFilteredTenants(tenants, e.target.value); // Call the function here
              }}
              className="border p-2 rounded mb-5"
            />

            {(userplantype === "Harmony" && tenants.length < 12) ||
            (userplantype === "Unity" && tenants.length < 25) ||
            userplantype === "Integrity" ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAdd}
                // onChange={setCounter(counter + 1)}
              >
                <Link to={"/addtenants"}>Add Tenant</Link>
              </button>
            ) : (
              <p>Your {userplantype} plan has reached the limit.</p>
            )}

            <BackButton />
          </div>

          <div>
            <h1 className="mb-5 text-white  text-xl font-bold my-10 md:text-3xl">
              Dashboard
            </h1>
          </div>

          {searchInput ? (
            // If there is a search input, render filteredTenants
            <div className="overflow-scroll no-scrollbar">
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
                      Adhaar Card No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Tenant New
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Floor No
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-2 border-black cursor-pointer relative"
                    >
                      <div className="flex justify-between  items-center">
                        Room No
                        <div className="ml-6 flex  flex-col">
                          <FaSortUp
                            className={`text-white hover:text-black ${
                              sortOrder === "asc" ? "text-gray-300" : ""
                            }`}
                            onClick={handleSortByFlatNo}
                          />
                          <FaSortDown
                            className={`text-white hover:text-black ${
                              sortOrder === "desc" ? "text-gray-300" : ""
                            }`}
                            onClick={handleSortByFlatNo}
                          />
                        </div>
                      </div>
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
                    <th
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
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Rent Paid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Action
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
                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black ">
                        {tenant?.IsNew ? "Yes" : "No"}
                      </td>
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
                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                        {tenant?.RentAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                        {tenant?.RemainingAmount}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                        {tenant?.RentPaid ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                        {tenant?.Status + " days left"}
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap border-2 border-black">
                        <div className="flex justify-between items-center">
                          <FaPen
                            className="text-green-500 w-5 h-5 mr-5 hover:text-green-600"
                            onClick={() => handleedit(tenant?._id)}
                          />

                          <MdDelete
                            className="text-red-500 w-5 h-5 hover:text-red-600"
                            onClick={() => handleDelete(tenant?._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-scroll no-scrollbar">
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
                      Adhaar Card No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Tenant New ?
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Floor No
                    </th>
                    <th
                      scope="col"
                      className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-2 border-black cursor-pointer relative"
                    >
                      <div className="flex justify-between  items-center">
                        Room No
                        <div className="ml-6 flex  flex-col">
                          <FaSortUp
                            className={`text-white hover:text-black ${
                              sortOrder === "asc" ? "text-gray-300" : ""
                            }`}
                            onClick={handleSortByFlatNo}
                          />
                          <FaSortDown
                            className={`text-white hover:text-black ${
                              sortOrder === "desc" ? "text-gray-300" : ""
                            }`}
                            onClick={handleSortByFlatNo}
                          />
                        </div>
                      </div>
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
                    <th
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
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Rent Paid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider   border-2 border-black"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-x-2 divide-black">
                  {(filteredFloor || tenants).map((tenant, index) => (
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
                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black ">
                        {tenant?.IsNew ? "Yes" : "No"}
                      </td>
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
                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                        {tenant?.RentAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                        {tenant?.RemainingAmount}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                        {tenant?.RentPaid ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-2 border-black">
                        {/* {tenant?.Status + " days left"} */}
                        {tenant.RemainingAmount == 0
                          ? tenant.Status == 0
                            ? "Paid on Due Date"
                            : tenant.Status == 1
                            ? "Paid before " + tenant.Status + " day"
                            : "Paid before " + tenant.Status + " days"
                          : tenant.Status == 0
                          ? "Due Date"
                          : tenant.Status == 1
                          ? tenant.Status + " day  left"
                          : tenant.Status + " days  left"}
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap border-2 border-black">
                        <div className="flex justify-between items-center">
                          <FaPen
                            className="text-green-500 w-5 h-5 mr-5 hover:text-green-600"
                            onClick={() => handleedit(tenant?._id)}
                          />

                          <MdDelete
                            className="text-red-500 w-5 h-5 hover:text-red-600"
                            onClick={() => handleDelete(tenant?._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
