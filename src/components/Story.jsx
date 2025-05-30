import gsap from "gsap";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import RoundedCorners from "./RoundedCorners";

// Story - Renders the story section with an animated title and themed image
const Story = () => {
  const frameRef = useRef(null); // Ref for the image frame

  // handleMouseLeave - Resets image rotation when mouse leaves or interaction ends
  const handleMouseLeave = () => {
    const element = frameRef.current;

    // Guard clause: exit if the element is not mounted
    if (!element) return;

    // Animate back to default rotation (flat)
    gsap.to(element, {
      duration: 0.3, // Short duration for snappy reset
      rotateX: 0, // Reset X axis rotation
      rotateY: 0, // Reset Y axis rotation
      ease: "power1.inOut", // Smooth ease for natural feel
    });
  };

  // handleMouseMove - Applies a dynamic tilt effect based on cursor position
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    // Guard clause: exit if the element is not mounted
    if (!element) return;

    // Get bounding rectangle of the image
    const rect = element.getBoundingClientRect();

    // Calculate cursor position relative to element
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    // Calculate the center of the element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Determine rotation offsets based on cursor distance from center
    const rotateX = ((yPos - centerY) / centerY) * -10; // Invert Y for natural perspective
    const rotateY = ((xPos - centerX) / centerX) * 10;

    // Animate the tilt using GSAP
    gsap.to(element, {
      duration: 0.3, // Short delay for responsive interaction
      rotateX, // Apply vertical tilt
      rotateY, // Apply horizontal tilt
      transformPerspective: 500, // Add 3D perspective to improve depth perception
      ease: "power1.inOut", // Smooth in/out easing for interactive motion
    });
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10">
        {/* Section label / subtitle */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>

        <div className="relative size-full">
          {/* Animated title with mixed typography and HTML tags for styling emphasis */}
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClassName="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          {/* Themed image container with custom mask and effects */}
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef} // Ref for the image frame
                  onMouseMove={handleMouseMove} // Handle mouse movement
                  onMouseLeave={handleMouseLeave} // Handle mouse leave
                  onMouseUp={handleMouseLeave} // Handle mouse up
                  onMouseEnter={handleMouseLeave} // Handle mouse enter
                  src="/img/entrance.webp" // Image source
                  alt="entrance.webp" // Image alt text
                  className="object-contain"
                />
              </div>
            </div>

            {/* Rounded corners filter */}
            <RoundedCorners />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
