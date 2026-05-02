import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import SmoothScroll from "@/components/SmoothScroll";

createRoot(document.getElementById("root")!).render(
  <SmoothScroll>
    <App />
  </SmoothScroll>,
);
