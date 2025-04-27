import App from "./App.tsx";
import { ReactNode } from "react";

const routes: { path: string; element: () => ReactNode }[] = [
  {
    path: "/",
    element: App,
  },
  {
    path: "/:id/summary",
    element: App,
  },
];

export default routes;
