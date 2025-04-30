import Header from "./components/Header.tsx";
import { FC, ReactElement } from "react";
import DashboardContent from "./pages/Dashboard/DashboardContent.tsx";

const App: FC = (): ReactElement => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl bg-white">
        <DashboardContent />
      </main>
    </div>
  );
};

export default App;
