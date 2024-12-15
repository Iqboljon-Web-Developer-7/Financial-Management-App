import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/pages";

import { ContextProvider } from "./context/index.jsx";
import { initialState, reducer } from "./context/reducer.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./scss/main.scss";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider initialState={initialState} reducer={reducer}>
        <Pages />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
