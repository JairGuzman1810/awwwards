import About from "./components/About";
import Contact from "./components/Contact";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Story from "./components/Story";

// App - Root component that renders the main page layout and hero section
const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Renders the Navbar */}
      <Navbar />

      {/* Renders the Hero */}
      <Hero />

      {/* Renders the About */}
      <About />

      {/* Renders the Features section */}
      <Features />

      {/* Renders the Story section */}
      <Story />

      {/* Renders the Contact section */}
      <Contact />
    </main>
  );
};

export default App;
