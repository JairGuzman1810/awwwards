import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import Button from "./Button";

// List of navigation links
const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

// Navbar - Fixed top navigation bar with logo, product button, nav links, and audio toggle
const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // State to track if audio is playing
  const [isIndicatorActive, setIsIndicatorActive] = useState(false); // State to toggle animation bars
  const [lastScrollY, setLastScrollY] = useState(0); // State to track the last scroll position
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // State to track if the navbar is visible

  const navContainerRef = useRef(null); // Ref for the navbar container
  const audioElementRef = useRef(null); // Ref for the audio element

  const { y: currentScrollY } = useWindowScroll(); // Get current scroll position

  // Handle navbar visibility based on scroll direction
  useEffect(() => {
    // Show or hide navbar based on scroll direction
    if (currentScrollY === 0) {
      setIsNavbarVisible(true); // Always show on top of page
      navContainerRef.current.classList.remove("floating-nav"); // Remove float class
    } else if (currentScrollY > lastScrollY) {
      setIsNavbarVisible(false); // Hide when scrolling down
      navContainerRef.current.classList.add("floating-nav"); // Add float class
    } else if (currentScrollY < lastScrollY) {
      setIsNavbarVisible(true); // Show when scrolling up
      navContainerRef.current.classList.add("floating-nav"); // Ensure float class is present
    }

    setLastScrollY(currentScrollY); // Update last scroll position
  }, [currentScrollY, lastScrollY]); // Run on scroll

  // Animate navbar based on visibility
  useEffect(() => {
    // Animate navbar appearance using GSAP
    gsap.to(navContainerRef.current, {
      y: isNavbarVisible ? 0 : -100, // Slide in or out vertically
      opacity: isNavbarVisible ? 1 : 0, // Fade in or out
      duration: 0.2, // Transition speed
    });
  }, [isNavbarVisible]); // Run when visibility changes

  // toggleAudioIndicator - Toggle audio playback and indicator animation
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev); // Toggle audio playback
    setIsIndicatorActive((prev) => !prev); // Toggle animation bars
  };

  // Play or pause audio depending on state
  useEffect(() => {
    // If the audio is marked as playing
    if (isAudioPlaying) {
      // Attempt to play the audio using the ref (safe optional chaining)
      audioElementRef.current?.play();
    } else {
      // Otherwise, pause the audio if it exists
      audioElementRef.current?.pause();
    }
    // Only run this effect when the `isAudioPlaying` state changes
  }, [isAudioPlaying]);

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
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClassName="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Right section: navigation links and audio indicator */}
          <div className="flex h-full items-center">
            {/* Desktop nav links */}
            <div className="hidden md:block">
              {/* Anchor links to different page sections */}
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`} // Anchor to specific section
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio visualizer toggle button */}
            <button
              className="ml-10 flex items-center space-x-0.5 cursor-pointer"
              onClick={toggleAudioIndicator}
            >
              {/* Hidden looping audio file */}
              <audio
                className="hidden"
                ref={audioElementRef}
                src="/audio/loop.mp3"
                loop
              />

              {/* Animated audio bars */}
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${isIndicatorActive && "active"}`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
