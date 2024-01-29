import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./utils/UserContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
