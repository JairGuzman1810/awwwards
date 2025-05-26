import { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

// List of navigation links
const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

// Navbar - Fixed top navigation bar with logo, product button, and section links
const Navbar = () => {
  const navContainerRef = useRef(null); // Ref for the navbar container

  return (
    // Fixed navbar container at the top of the screen
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      {/* Centered nav content inside fixed header */}
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Left section: logo and Products button */}
          <div className="flex items-center gap-7">
            {/* Brand logo */}
            <img src="/img/logo.png" alt="logo" className="w-10" />

            {/* CTA button to view product options */}
            <Button
              id="product-button"
              title={"Products"}
              rightIcon={<TiLocationArrow />}
              containerClassName={
                "bg-blue-50 md:flex hidden items-center justify-center gap-1"
              }
            />
          </div>

          {/* Right section: navigation links (desktop only) */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {/* Anchor links to different page sections */}
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`} // Anchor link to the section
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
