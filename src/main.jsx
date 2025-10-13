import React from "react";
import ReactDOM from "react-dom/client";

// Tailwind + base styles
import "./index.css";

// Your mobile overrides (must be after index.css)
import "./styles/responsive.css";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
