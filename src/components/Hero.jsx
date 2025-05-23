import React, { useRef, useState } from "react";

// Hero - Renders the main hero section with a masked video interface
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current video index
  const [hasClicked, setHasClicked] = useState(false); // Flags whether the video area was clicked
  const [isLoading, setIsLoading] = useState(true); // NOTE: Currently unused - potentially for future loading UI
  const [loadedVideos, setLoadedVideos] = useState(0); // Counts the number of videos that have loaded

  const totalVideos = 4; // Total number of videos available

  const nextVideoRef = useRef(null); // Ref for the next video element

  // handleVideoLoad - Increments the loaded video count when a video finishes loading
  const handleVideoLoad = () => {
    setLoadedVideos((prevLoadedVideos) => prevLoadedVideos + 1);
  };

  // handleMiniVideoPlayerClick - Advances to the next video on user interaction
  const handleMiniVideoPlayerClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // getVideoSrc - Constructs the video source path based on index
  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-hidden">
      {/* Fullscreen container with hidden overflow to frame the hero section */}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Video frame with blue background and rounded corners */}

        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/* Circular masked area that acts as an interactive hotspot */}

            <div
              onClick={handleMiniVideoPlayerClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* Hidden by default; scales and fades in on hover */}
              <video
                ref={nextVideoRef}
                src={getVideoSrc(currentIndex + 1)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
