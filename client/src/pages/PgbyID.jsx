import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
import axios from "axios";
import config from "../../config.json";
const PgbyID = () => {
  const { id } = useParams();
  const [pgDetails, setPgDetails] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const URL = config.BACKEND_URL;
  useEffect(() => {
    const fetchPgDetails = async () => {
      try {
        const response = await fetch(`${URL}/api/v1/pg/pgdetails/${id}`);
        if (!response.ok) {
          throw new Error("PG not found");
        }

        const pgData = await response.json();
        setPgDetails(pgData);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., set an error state or redirect to an error page
      }
    };

    fetchPgDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );

    // The default format is MM/dd/yyyy, so we need to rearrange the parts
    const [month, day, year] = formattedDate.split("/");
    return `${day}/${month}/${year}`;
  };

  const handleEditClick = () => {
    // Assuming you have a route for editing with the id parameter
    navigate(`/admin/pglist/edit/${id}`);
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${URL}/api/v1/pg/delete/${id}`);
      const message = response.data.message;
      console.log(response.data);
      enqueueSnackbar(message, { variant: "success" });
      navigate(-1); // Go back after successful delete
    } catch (error) {
      console.error(error);
      // Handle error, maybe display an error message to the user
    }
  };
  return (
    <div className="container mx-auto p-4">
      {pgDetails ? (
        <div className="bg-slate-300 p-6 rounded shadow-md">
          <div className=" flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              PG Details of {pgDetails.pgname}
            </h2>
            <button
              className="p-3 m-3 bg-red-500 hover:bg-red-600 rounded-lg text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <p className="text-lg mb-2">Email: {pgDetails?.email}</p>
          <p className="text-lg mb-2">PgName: {pgDetails?.pgnumber}</p>
          <p className="text-lg mb-2">Address: {pgDetails?.pgaddress}</p>
          <p className="text-lg mb-2">Plan: {pgDetails?.pgplantype}</p>
          <p className="text-lg mb-2">Date: {formatDate(pgDetails?.Date)}</p>
          <p className="text-lg mb-2">
            Deposit: {pgDetails?.paid ? "Yes" : "No"}
          </p>

          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <BackButton />
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">Loading...</p>
      )}
    </div>
  );
};

export default PgbyID;
