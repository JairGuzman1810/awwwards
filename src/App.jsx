import About from "./components/About";
import Hero from "./components/Hero";

// App - Root component that renders the main page layout and hero section
const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Renders the main Hero section */}
      <Hero />

      {/* Renders the About section */}
      <About />
    </main>
  );
};

export default App;
