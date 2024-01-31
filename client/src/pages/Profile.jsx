import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import BackButton from "../components/BackButton";
import Header from "../components/Header";
import config from "../../config.json";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [cookies] = useCookies(["access-token"]);
  const URL = config.BACKEND_URL;
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/pg/profile`, {
          headers: {
            Authorization: `Bearer ${cookies["access-token"]}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [cookies]); // Include cookies in the dependency array to fetch data whenever cookies change

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );

    // Rearrange the parts of the default format (MM/dd/yyyy)
    const [month, day, year] = formattedDate.split("/");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Header />
      <div className="container mx-auto my-2 p-4  shadow-lg rounded-md">
        {profileData ? (
          <div>
            <div className="flex justify-between items-center my-5 ">
              <p className="text-3xl font-bold mb-4 text-white">Profile</p>
              <BackButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* <div className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
              <p className="text-lg font-bold mb-2">_id</p>
              <p>{profileData.id}</p>
            </div> */}
              <div className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
                <p className="text-lg font-bold mb-2">Email</p>
                <p>{profileData.email}</p>
              </div>
              <div className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
                <p className="text-lg font-bold mb-2">Date of purchase</p>
                <p>{formatDate(profileData?.Date)}</p>
              </div>
              <div className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
                <p className="text-lg font-bold mb-2">Plan Type</p>
                <p>{profileData?.plantype}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xl text-gray-700">Loading...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
