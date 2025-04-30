import App from "./App.tsx";
import Summary from "./pages/Summary/Summary.tsx";

const routes = [
  {
    path: "/",
    component: App,
  },
  {
    path: "/:id/summary",
    component: Summary,
  },
];

export default routes;
