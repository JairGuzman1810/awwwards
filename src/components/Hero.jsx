import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger); // Registers the ScrollTrigger plugin

// Hero - Renders the main hero section with a masked video interface
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current video index
  const [hasClicked, setHasClicked] = useState(false); // Flags whether the video area was clicked
  const [isLoading, setIsLoading] = useState(true); // NOTE: Currently unused - potentially for future loading UI
  const [loadedVideos, setLoadedVideos] = useState(0); // Counts the number of videos that have loaded

  const totalVideos = 3; // Total number of videos available

  const nextVideoRef = useRef(null); // Ref for the next video element

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

  // Handles the loading state of the hero section
  useEffect(() => {
    // Checks if all videos have loaded
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false); // Sets the loading state to false
    }
  }, [loadedVideos]);

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

  // Animates the hero section when the user scrolls
  useGSAP(() => {
    // Set the initial clip path and border radius for the video frame
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)", // Initial clip path
      borderRadius: "0% 0% 40% 10%", // Initial border radius
    });

    // Animate the video frame to a full-screen clip path and no border radius
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Full-screen clip path
      borderRadius: "0% 0% 0% 0%", // No border radius
      ease: "power1.inOut", // Smooth easing
      scrollTrigger: {
        trigger: "#video-frame", // Trigger element
        start: "center center", // Start position
        end: "bottom center", // End position
        scrub: true, // Enable scrubbing
      },
    });
  });

  // getVideoSrc - Constructs the video source path based on index
  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading screen */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Hero container with fullscreen height and horizontal overflow hidden */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Video layering and interactive hotspot container */}
        <div>
          {/* Circular masked hotspot that reveals the next video on hover */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
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
