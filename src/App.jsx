import Hero from "./components/Hero";

// App - Root component that renders the main page layout and hero section
const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden text-white">
      {/* Renders the main Hero section */}
      <Hero />

      <section className="z-0 min-h-screen w-screen bg-blue-500" />
    </main>
  );
};

export default App;
