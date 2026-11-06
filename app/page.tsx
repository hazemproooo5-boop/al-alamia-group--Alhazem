"use client";

import { BrowserRouter } from "react-router-dom";
import App from "../src/App";

export default function HomePage() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
