import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-r text-gray-500 border-b border-neutral-200/75 bg-white text-neutral-900">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between max-w-7xl">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl font-bold">Vitenest</h1>
        </div>
        <div>
          <p className="text-sm text-neutral-90">
            Analyze your content performance
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
