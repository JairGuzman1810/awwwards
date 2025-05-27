import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger); // Registers the ScrollTrigger plugin

// About - Renders the About section with scroll-triggered clip-path animation and mouse tilt
const About = () => {
  const aboutContainerRef = useRef(null); // Ref for the entire about container
  const imageContainerRef = useRef(null); // Ref for the image container that will be tilted
  const isTiltDisabled = useRef(false); // Flag to track if tilt should be disabled

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
        onUpdate: (self) => {
          // Disable tilt when animation is in progress (progress > 0)
          // Enable tilt when scrolled back to start (progress === 0)
          isTiltDisabled.current = self.progress > 0;

          // Reset tilt when disabled
          if (isTiltDisabled.current && imageContainerRef.current) {
            gsap.to(imageContainerRef.current, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.3,
              ease: "power1.out",
            });
          }
        },
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

  // Mouse tilt interaction for the image, applied to the about container
  useGSAP(
    () => {
      const aboutContainer = aboutContainerRef.current;
      const imageContainer = imageContainerRef.current;

      if (!aboutContainer || !imageContainer) return;

      // handleMouseMove - Applies 3D tilt transform based on cursor position
      const handleMouseMove = (e) => {
        // Skip tilt if disabled during scroll animation
        if (isTiltDisabled.current) return;

        const { left, top, width, height } =
          aboutContainer.getBoundingClientRect(); // Use aboutContainer here
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const percentX = (mouseX - centerX) / (width / 2);
        const percentY = (mouseY - centerY) / (height / 2);

        const maxTilt = 15; // Maximum tilt angle (adjust as needed)

        const tiltX = -percentY * maxTilt; // Vertical tilt
        const tiltY = percentX * maxTilt; // Horizontal tilt

        // Apply tilt transformation to the imageContainer
        gsap.to(imageContainer, {
          rotateX: tiltX,
          rotateY: tiltY,
          duration: 0.3,
          ease: "power1.out",
        });
      };

      // handleMouseLeave - Reset tilt when cursor leaves the container
      const handleMouseLeave = () => {
        // Skip reset if tilt is disabled
        if (isTiltDisabled.current) return;

        gsap.to(imageContainer, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      // Attach event listeners to the aboutContainer
      aboutContainer.addEventListener("mousemove", handleMouseMove);
      aboutContainer.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup event listeners
      return () => {
        aboutContainer.removeEventListener("mousemove", handleMouseMove);
        aboutContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { dependencies: [] }
  );

  return (
    <div ref={aboutContainerRef} id="about" className="min-h-screen w-screen">
      {/* Text content block */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* Section subtitle */}
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>

        {/* Animated main section headline */}
        <AnimatedTitle
          title={
            "Disc<b>o</b>ver the world's <br /> <b>l</b>argest shared adventure"
          }
          containerClassName="mt-5 !text-black text-center"
        />

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
        {/* Masked background image for scroll animation with tilt effect */}
        <div
          ref={imageContainerRef} // This is still the element that gets tilted
          className="mask-clip-path about-image"
          style={{
            transformStyle: "preserve-3d", // Enable 3D transforms
            perspective: "1000px", // Add perspective for better 3D effect
          }}
        >
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
