import App from "./App.tsx";
import { ReactNode } from "react";
import Summary from "./pages/Summary.tsx";

const routes: { path: string; element: () => ReactNode }[] = [
  {
    path: "/",
    element: App,
  },
  {
    path: "/:id/summary",
    element: Summary,
  },
];

export default routes;
