import React, { useRef, useState } from "react";

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

  // getVideoSrc - Constructs the video source path based on index
  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Fullscreen container with hidden overflow to frame the hero section */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Video frame with blue background and rounded corners */}
        <div>
          {/* Circular masked area that acts as an interactive hotspot */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/* Hidden by default; scales and fades in on hover */}
            <div
              onClick={handleMiniVideoPlayerClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* Upcoming video shown on hover interaction */}
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

          {/* Invisible preload video element to prepare the next clip in advance */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* Main background video player that plays the current video fullscreen */}
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Foreground "Gaming" headline at bottom right */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        {/* Foreground "redefine" headline at top left */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
