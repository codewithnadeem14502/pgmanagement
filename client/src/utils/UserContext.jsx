// UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access-token"]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = cookies["access-token"];

        if (accessToken) {
          const response = await axios.get(
            "http://localhost:5000/api/v1/pg/profile",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setUser(response.data);
        } else {
          // If there's no access token, set the user to an empty object
          setUser({});
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [cookies]);

  return (
    <UserContext.Provider value={{ user, loading, updateUser, removeCookie }}>
      {children}
    </UserContext.Provider>
  );
};
