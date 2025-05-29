import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

// BentoTilt - Adds interactive 3D tilt effect to its children on mouse movement
const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState(""); // Holds the current 3D transform style
  const itemRef = useRef(null); // Ref to the DOM element for calculating mouse position

  // handleMouseMove - Handles mouse movement over the element to apply a tilt transform
  const handleMouseMove = (e) => {
    if (!itemRef.current) return; // If the element is not found, return

    // Get dimensions and position of the element
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    // Calculate mouse position relative to element bounds
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    // Calculate tilt based on mouse position (subtle tilt effect)
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    // Construct CSS transform string with perspective and scale
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;

    // Update the transform style
    setTransformStyle(newTransform);
  };

  // handleMouseLeave - Resets transform when the mouse leaves the element
  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef} // Reference to this DOM node
      className={className}
      style={{ transform: transformStyle }} // Apply dynamic transform
      onMouseMove={handleMouseMove} // Track mouse movement for tilt
      onMouseLeave={handleMouseLeave} // Reset transform on mouse leave
    >
      {children}
    </div>
  );
};

// BentoCard - Displays a video background card with title and optional description
const BentoCard = ({ src, title, description }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Tracks mouse position relative to hover button
  const [hoverOpacity, setHoverOpacity] = useState(0); // Controls opacity of the radial hover effect
  const hoverButtonRef = useRef(null); // Ref to the hover button element

  // handleMouseMove - Updates cursor position relative to the button for radial gradient
  const handleMouseMove = (e) => {
    if (!hoverButtonRef.current) return; // If the button is not found, return

    // Get the bounding rectangle of the button
    const rect = hoverButtonRef.current.getBoundingClientRect();

    // Update the cursor position relative to the button
    setCursorPosition({
      x: e.clientX - rect.left, // Calculate x-coordinate relative to button
      y: e.clientY - rect.top, // Calculate y-coordinate relative to button
    });
  };

  // handleMouseEnter - Makes the radial gradient visible on hover
  const handleMouseEnter = () => setHoverOpacity(1);

  // handleMouseLeave - Hides the radial gradient when mouse leaves the button
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      {/* Background video that fills the entire card */}
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      {/* Foreground content (title and description) over the video */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>

          {/* Optional description below the title */}
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {/* Hoverable button with radial light effect */}
        <div
          ref={hoverButtonRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
        >
          {/* Radial gradient follows cursor on hover */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
            }}
          />

          {/* Icon and label above the gradient */}
          <TiLocationArrow className="relative z-20" />
          <p className="relative z-20">coming soon</p>
        </div>
      </div>
    </div>
  );
};

// Features - Main section showcasing Bento-style cards for featured metagame products
const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-4 md:px-10">
        {/* Section header and intro paragraph */}
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer
          </p>

          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products converge into an interconnected overlay
            experience on your world.
          </p>
        </div>

        {/* Primary feature card with larger layout */}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                radia<b>n</b>t
              </>
            }
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          />
        </BentoTilt>

        {/* Grid layout containing smaller feature cards */}
        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          {/* Card that spans two rows vertically on larger screens */}
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>

          {/* Horizontally shifted card on small screens */}
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  n<b>e</b>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            />
          </BentoTilt>

          {/* Horizontally shifted in opposite direction on small screens */}
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            />
          </BentoTilt>

          {/* Placeholder card with coming soon message */}
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
              </h1>

              {/* Large arrow icon in bottom-right */}
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          {/* Looping teaser video with no overlay */}
          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              autoPlay
              muted
              loop
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
