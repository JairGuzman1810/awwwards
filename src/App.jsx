import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

// App - Root component that renders the main page layout and hero section
const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Renders the Navbar */}
      <Navbar />

      {/* Renders the Hero section */}
      <Hero />

      {/* Renders the About section */}
      <About />
    </main>
  );
};

export default App;
