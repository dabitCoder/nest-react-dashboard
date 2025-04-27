import Header from "./components/Header.tsx";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl bg-white">
        <ArticlesGrid />
      </main>
    </div>
  )
}

export default App
