import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

// VideoPreview - Adds 3D tilt and parallax hover animation to its children
const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false); // Tracks hover state
  const sectionRef = useRef(null); // Ref to the outer section (main tilt container)
  const contentRef = useRef(null); // Ref to the inner content (for parallax effect)
  const wobbleTimeline = useRef(null); // Ref to the GSAP wobble animation timeline

  // resetAnimations - Resets all animations and states to initial
  const resetAnimations = () => {
    setIsHovering(false); // Stop hover state tracking

    // Kill any running wobble animation to prevent overlap
    if (wobbleTimeline.current) wobbleTimeline.current.kill();

    // Ensure both references are valid before applying reset transforms
    if (sectionRef.current && contentRef.current) {
      // Animate outer container back to neutral position and scale
      gsap.to(sectionRef.current, {
        x: 0, // Reset horizontal position
        y: 0, // Reset vertical position
        rotationY: 0, // Remove Y-axis tilt
        rotationX: 0, // Remove X-axis tilt
        scale: 1, // Reset scale to original
        duration: 0.8, // Animation duration
        ease: "elastic.out(1, 0.4)", // Elastic easing for spring effect
      });

      // Animate inner content back to center (undo parallax)
      gsap.to(contentRef.current, {
        x: 0, // Reset horizontal offset
        y: 0, // Reset vertical offset
        duration: 0.8, // Animation duration
        ease: "elastic.out(1, 0.4)", // Elastic easing
      });
    }
  };

  // handleMouseMove - Applies 3D tilt and parallax based on cursor position
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect(); // Get dimensions and position of the hovered element

    // Calculate offset of mouse position from center of element
    const xOffset = clientX - (rect.left + rect.width / 2); // Horizontal offset
    const yOffset = clientY - (rect.top + rect.height / 2); // Vertical offset

    if (isHovering) {
      // Animate outer container tilt and position
      gsap.to(sectionRef.current, {
        x: xOffset, // Move with cursor on x-axis
        y: yOffset, // Move with cursor on y-axis
        rotationY: xOffset / 2, // Tilt on Y axis relative to horizontal offset
        rotationX: -yOffset / 2, // Tilt on X axis (inverse of vertical offset)
        transformPerspective: 500, // Simulate 3D depth
        duration: 1, // Smooth transition duration
        ease: "power1.out", // Ease-out for smooth motion
      });

      // Animate content in opposite direction for parallax effect
      gsap.to(contentRef.current, {
        x: -xOffset, // Inverse of section offset
        y: -yOffset, // Inverse of section offset
        duration: 1, // Match section duration
        ease: "power1.out", // Same easing
      });
    }
  };

  // handleMouseEnter - Starts wobble animation on hover
  const handleMouseEnter = () => {
    setIsHovering(true); // Enable hover state tracking

    // Stop any existing wobble animation to avoid conflicts
    if (wobbleTimeline.current) wobbleTimeline.current.kill();

    // Create infinite repeating wobble timeline animation
    wobbleTimeline.current = gsap.timeline({ repeat: -1 });

    // Step 1: Scale up
    wobbleTimeline.current
      .to(sectionRef.current, {
        scale: 1.15, // Slight enlargement
        duration: 0.8, // Smooth rise
        ease: "power2.inOut", // Balanced ease
      })

      // Step 2: Scale down
      .to(sectionRef.current, {
        scale: 0.95, // Slight shrink
        duration: 0.8, // Smooth shrink
        ease: "power2.inOut", // Same easing
      })

      // Step 3: Scale up again
      .to(sectionRef.current, {
        scale: 1.1, // Slight bump
        duration: 0.6, // Slightly faster
        ease: "power2.inOut", // Smooth
      })

      // Step 4: Return to normal scale
      .to(sectionRef.current, {
        scale: 1, // Neutral
        duration: 0.6, // Match previous
        ease: "power2.inOut", // Consistent easing
      });
  };

  // handleMouseLeave - Ends hover and resets animation
  const handleMouseLeave = () => {
    resetAnimations(); // Call reset logic when hover ends
  };

  // Watch for hover state and reset animations when hover ends
  useEffect(() => {
    if (!isHovering) {
      // Reset section container
      gsap.to(sectionRef.current, {
        x: 0, // Reset X position
        y: 0, // Reset Y position
        rotationY: 0, // Reset Y rotation
        rotationX: 0, // Reset X rotation
        scale: 1, // Reset scale
        duration: 0.8, // Animation duration
        ease: "elastic.out(1, 0.4)", // Springy easing
      });

      // Reset inner content position
      gsap.to(contentRef.current, {
        x: 0, // Reset X offset
        y: 0, // Reset Y offset
        duration: 0.8, // Match duration
        ease: "elastic.out(1, 0.4)", // Match easing
      });
    }
  }, [isHovering]); // Run effect only when hover state changes

  // handleVisibilityEvents - Resets animation when window/tab loses focus
  useEffect(() => {
    // Reset animations if tab becomes hidden
    const handleVisibilityChange = () => {
      if (document.hidden) resetAnimations(); // Reset on tab switch
    };

    // Reset on window blur (e.g., alt-tab or switch app)
    const handleWindowBlur = () => {
      resetAnimations();
    };

    // Reset on window focus (ensure consistency)
    const handleWindowFocus = () => {
      resetAnimations();
    };

    // Register event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange); // Remove tab visibility listener
      window.removeEventListener("blur", handleWindowBlur); // Remove blur listener
      window.removeEventListener("focus", handleWindowFocus); // Remove focus listener

      // Kill wobble animation to prevent memory leaks
      if (wobbleTimeline.current) wobbleTimeline.current.kill();
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <section
      ref={sectionRef} // Outer 3D container
      onMouseMove={handleMouseMove} // Trigger tilt and parallax
      onMouseEnter={handleMouseEnter} // Start wobble
      onMouseLeave={handleMouseLeave} // Reset everything
      className="mask-clip-path absolute-center absolute z-50 size-40 md:size-64 cursor-pointer overflow-hidden rounded-lg"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={contentRef} // Inner content with inverse parallax
        className="origin-center rounded-lg"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
