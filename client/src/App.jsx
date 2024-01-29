import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AllPGlist from "./pages/AllPGlist";
import PgbyID from "./pages/PgbyID";
import EditPg from "./pages/EditPG";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import AddTenantForm from "./pages/AddTenantForm";

import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import EditTenant from "./pages/EditTenant";
import { useUser } from "./utils/UserContext";
import PageNotFound from "./pages/PageNotFound";
const App = () => {
  const { user } = useUser();
  const userIDcontext = user.id;
  console.log("main page hai ", userIDcontext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin/pgregister" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/pglist" element={<AllPGlist />} />
        <Route path="/admin/pglist/:id" element={<PgbyID />} />
        <Route path="/admin/pglist/edit/:id" element={<EditPg />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={userIDcontext ? <Dashboard /> : <Login />}
        />
        <Route
          path="/addtenants"
          element={userIDcontext ? <AddTenantForm /> : <Login />}
        />
        <Route
          path="/tenant/:id"
          element={userIDcontext ? <EditTenant /> : <Login />}
        />
        <Route
          path="/reset_password/:id/:resetIdentifier"
          element={<ResetPassword />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
