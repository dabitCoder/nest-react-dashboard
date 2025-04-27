import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import routes from "./routes.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route element={route.element()} path={route.path} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
