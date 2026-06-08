import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <SmoothScroll>
    <App />
    <Analytics />
  </SmoothScroll>,
);
