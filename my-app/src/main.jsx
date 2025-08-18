import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";
import { BookingProvider } from "./context/BookingContext.jsx";  // <-- import

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BookingProvider>         {/* <-- wrap the whole app */}
      <App />
    </BookingProvider>
  </BrowserRouter>
);