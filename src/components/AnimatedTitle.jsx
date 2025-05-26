import gsap from "gsap";
import { useEffect, useRef } from "react";

// AnimatedTitle - Renders and animates a split headline with scroll-triggered word transitions
const AnimatedTitle = ({ title, containerClassName }) => {
  const containerRef = useRef(null); // Ref to the title container

  useEffect(() => {
    // Set up GSAP animation context bound to this component
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, // Element that triggers the animation
          start: "100 bottom", // Start animation when 100px into viewport
          end: "center bottom", // End when container center hits bottom
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
        },
      });

      // Animate each word into view with stagger and 3D transforms
      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    // Cleanup GSAP context on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClassName}`}>
      {/* Render title split by line breaks, then by word */}
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
