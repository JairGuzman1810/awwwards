import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

// Hero - Renders the main hero section with a masked video interface
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current video index
  const [hasClicked, setHasClicked] = useState(false); // Flags whether the video area was clicked
  const [isLoading, setIsLoading] = useState(true); // NOTE: Currently unused - potentially for future loading UI
  const [loadedVideos, setLoadedVideos] = useState(0); // Counts the number of videos that have loaded

  const totalVideos = 4; // Total number of videos available

  const nextVideoRef = useRef(null); // Ref for the next video element
  const miniVideoPlayerContainerRef = useRef(null); // Ref for the circular masked hotspot container

  // handleVideoLoad - Increments the loaded video count when a video finishes loading
  const handleVideoLoad = () => {
    setLoadedVideos((prevLoadedVideos) => prevLoadedVideos + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1; // Calculates the index of the next video to be shown

  // handleMiniVideoPlayerClick - Advances to the next video on user interaction
  const handleMiniVideoPlayerClick = () => {
    setHasClicked(true); // Updates the hasClicked state to true
    setCurrentIndex(upcomingVideoIndex); // Updates the current video index to the next video
  };

  // Animates the hero section when the user clicks on the mini video player
  useGSAP(
    () => {
      if (hasClicked) {
        // Set the next video element's visibility to visible before animation starts
        gsap.set("#next-video", { visibility: "visible" });

        // Animate the next video element to fullscreen scale and size
        gsap.to("#next-video", {
          transformOrigin: "center center", // Set transform origin to center for smooth scaling
          scale: 1, // Scale video to full size
          width: "100%", // Set width to fill container
          height: "100%", // Set height to fill container
          duration: 1, // Animation duration of 1 second
          ease: "power1.inOut", // Ease-in-out timing function for smooth animation
          onStart: () => nextVideoRef.current.play(), // Play the next video when animation starts
        });

        // Animate the current preview video shrinking out of view
        gsap.from("#current-video", {
          transformOrigin: "center center", // Set transform origin to center for smooth scaling
          scale: 0, // Animate scale from 0 (shrinking effect)
          duration: 1.5, // Animation duration of 1.5 seconds
          ease: "power1.inOut", // Ease-in-out timing function for smooth animation
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true } // Re-run effect on currentIndex changes, revert animations if needed
  );

  // Add 3D tilt interaction to mini video player container based on cursor position
  useGSAP(
    () => {
      const miniPlayerContainer = miniVideoPlayerContainerRef.current; // Get the DOM element for the mini video player

      if (!miniPlayerContainer) return; // Exit if the container is not yet mounted

      // handleMouseMove - Applies 3D tilt transform based on cursor position
      const handleMouseMove = (e) => {
        const { left, top, width, height } =
          miniPlayerContainer.getBoundingClientRect(); // Get position and size of the container

        const centerX = left + width / 2; // X coordinate of container center
        const centerY = top + height / 2; // Y coordinate of container center

        const mouseX = e.clientX; // X coordinate of mouse
        const mouseY = e.clientY; // Y coordinate of mouse

        const percentX = (mouseX - centerX) / (width / 2); // Horizontal deviation from center, normalized (-1 to 1)
        const percentY = (mouseY - centerY) / (height / 2); // Vertical deviation from center, normalized (-1 to 1)

        const maxTilt = 10; // Maximum tilt angle in degrees for both axes

        const tiltX = -percentY * maxTilt; // Calculate tilt around X-axis (vertical tilt)
        const tiltY = percentX * maxTilt; // Calculate tilt around Y-axis (horizontal tilt)

        // Animate container rotation with calculated tilt values
        gsap.to(miniPlayerContainer, {
          rotateX: tiltX, // Apply vertical tilt
          rotateY: tiltY, // Apply horizontal tilt
          duration: 0.3, // Short animation duration for responsive effect
          ease: "power1.out", // Easing for smooth movement
        });
      };

      // handleMouseLeave - Resets tilt when cursor leaves the container
      const handleMouseLeave = () => {
        gsap.to(miniPlayerContainer, {
          rotateX: 0, // Reset vertical rotation
          rotateY: 0, // Reset horizontal rotation
          duration: 0.5, // Slightly longer duration for natural rebound
          ease: "elastic.out(1, 0.3)", // Elastic easing for bouncy effect
        });
      };

      // Attach event listeners for interactive tilt effect
      miniPlayerContainer.addEventListener("mousemove", handleMouseMove);
      miniPlayerContainer.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup - Remove event listeners on unmount to avoid memory leaks
      return () => {
        miniPlayerContainer.removeEventListener("mousemove", handleMouseMove);
        miniPlayerContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { dependencies: [] } // Only run once on component mount
  );

  // getVideoSrc - Constructs the video source path based on index
  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Hero container with fullscreen height and horizontal overflow hidden */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Video layering and interactive hotspot container */}
        <div>
          {/* Circular masked hotspot that reveals the next video on hover */}
          <div
            ref={miniVideoPlayerContainerRef}
            className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"
          >
            {/* Scales in and fades on hover to preview upcoming video */}
            <div
              onClick={handleMiniVideoPlayerClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* Hover-preview video for the next sequence */}
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* Invisible preloaded video to smooth transitions */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* Main background video playing fullscreen */}
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex + 1
            )}
            // autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Bottom-right hero title */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        {/* Top-left subheading and tagline */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer
              <br />
              Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClassName="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Duplicate bottom-right hero title for animation layering */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
