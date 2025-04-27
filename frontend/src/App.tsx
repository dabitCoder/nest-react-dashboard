import Header from "./components/Header.tsx";

import Highlights from "./components/Highlights.tsx";
import ArticlesGrid from "./components/Articles/ArticlesGrid.tsx";

const App = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl bg-white">
        <Highlights />
        <ArticlesGrid />
      </main>
    </div>
  )
}

export default App
