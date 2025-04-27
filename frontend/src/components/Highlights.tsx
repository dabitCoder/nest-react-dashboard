import Metrics from "./Metrics.tsx";
import { FC } from "react";

const Highlights: FC = () => (
  <section className="mx-auto">
    <h1 className="text-bold text-xl font-bold">Highlights</h1>
    <span>Welcome Edelman_User, here's the summary of what's going on</span>
    <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2">
      <Metrics />
      <Metrics />
    </div>
  </section>
);

export default Highlights;
