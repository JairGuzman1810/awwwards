import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); // Registers the ScrollTrigger plugin

// About - Renders the About section with scroll-triggered clip-path animation
const About = () => {
  // Initializes scroll-based animation on the #clip element
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip", // Element that triggers the animation
        start: "center center", // Animation starts when #clip is centered in viewport
        end: "+=800 center", // Animation ends 800px after start
        scrub: 0.5, // Links scroll position to animation progress
        pin: true, // Pins the #clip element during scroll
        pinSpacing: true, // Adds padding to maintain layout flow
      },
    });

    // Expands the masked image container to fullscreen
    clipAnimation.to(".mask-clip-path", {
      width: "100vw", // Full viewport width
      height: "100vh", // Full viewport height
      borderRadius: "0%", // Removes border radius
      duration: 1, // Duration of the expansion animation
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      {/* Text content block */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* Section subtitle */}
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>

        {/* Main section headline */}
        <div className="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
          Disc<b>o</b>ver the world's <br /> <b>l</b>argest shared adventure
        </div>

        {/* Supporting tagline and mission description */}
        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p>
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      {/* Scroll-triggered animated image section */}
      <div className="h-dvh w-screen" id="clip">
        {/* Masked background image for scroll animation */}
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
