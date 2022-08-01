import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { UserContextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
