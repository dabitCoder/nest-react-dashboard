import Header from "../../components/Header.tsx";
import SummaryContent from "./SummaryContent.tsx";

const Summary = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl bg-white">
        <SummaryContent />
      </main>
    </div>
  );
};

export default Summary;
