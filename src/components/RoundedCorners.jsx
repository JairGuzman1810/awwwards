// RoundedCorners - SVG filter definition for glowing rounded corner effect
const RoundedCorners = () => {
  return (
    <svg
      className="invisible absolute size-0" // Hide SVG from view and layout; used only for filter definition
      xmlns="http://www.w3.org/2000/svg" // SVG namespace declaration
    >
      <defs>
        {/* Define a reusable SVG filter with id "flt_tag" */}
        <filter id="flt_tag">
          {/* Apply a blur to the source graphic */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />

          {/* Increases intensity of the blurred area using matrix math */}
          <feColorMatrix
            in="blur" // Use output from Gaussian blur
            mode="matrix" // Apply color transformation
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" // Amplify alpha channel for glow
            result="flt_tag" // Store result as flt_tag
          />

          {/* Overlay the original graphic atop the filtered result */}
          <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

export default RoundedCorners;
