import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { RouterController } from "./routes/RouterController.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterController />
  </React.StrictMode>
);
