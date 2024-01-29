import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import config from "../../config.json";
const AllPGlist = () => {
  const [pgList, setPgList] = useState([]);
  const navigate = useNavigate();
  const [cookies] = useCookies(["access-token"]);
  const URL = config.BACKEND_URL;

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
  useEffect(() => {
    console.log(pgList);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/pg/allpg`, {
          headers: {
            Authorization: `Bearer ${cookies["access-token"]}`,
          },
        });

        setPgList(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleRedirect = () => {
    navigate("/admin/pgregister");
  };
  const handleHomepage = () => {
    navigate("/");
  };
  return (
    <div className="container mx-auto p-4 ">
      <div className=" flex-col   justify-between items-center ">
        <h1 className="text-xl font-bold mb-4 md:text-3xl">
          All Registed PG List
        </h1>
        <div className="flex justify-end items-center">
          <button
            onClick={handleHomepage}
            className="bg-yellow-500 text-black m-3 p-3 rounded-lg font-semibold hover:bg-yellow-600"
          >
            {" Home "}
          </button>
          <button
            className="m-3 p-3 bg-blue-500 font-semibold hover:bg-blue-600 rounded-lg"
            onClick={handleRedirect}
          >
            Add PG
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {pgList.map((data, index) => (
          <div
            key={data._id}
            className="bg-slate-200 p-4 shadow-md rounded-md hover:bg-yellow-300"
          >
            <Link to={`/admin/pglist/${data._id}`}>
              {/* Display your PG data here */}
              <p className="text-lg ">S/no : {index + 1}</p>
              <p className="text-lg font-semibold">PgName : {data?.pgname}</p>
              <p className="text-lg">Email : {data?.email}</p>
              <p className="text-lg">PgName : {data?.pgnumber}</p>
              <p className="text-lg">Address : {data?.pgaddress}</p>
              <p className="text-lg">Plan : {data?.pgplantype}</p>
              <p className="text-lg">Deposit : {data?.paid ? "Yes" : "No"}</p>
              <p className="text-lg">Date :{formatDate(data?.Date)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPGlist;
