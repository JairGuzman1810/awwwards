import { useEffect, useState } from "react";
import { FaDiscord, FaMedium, FaTwitter, FaYoutube } from "react-icons/fa";

// socialLinks - Array of social media links with corresponding icons for the footer
const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

// Footer - Renders the page footer with a dynamic skewed title and social media links
const Footer = () => {
  // State to store the current transform value for the title
  const [transformValue, setTransformValue] = useState(
    "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"
  );

  // Sets up a mousemove event listener to update the skew transform based on cursor position
  useEffect(() => {
    // handleMouseMove - Calculates and updates the 3D transform matrix based on horizontal mouse position
    const handleMouseMove = (e) => {
      const windowWidth = window.innerWidth;
      const mouseX = e.clientX;
      const centerX = windowWidth / 2;

      // normalizedX - Normalizes mouse X position relative to center (-1 left, 0 center, 1 right)
      const normalizedX = (mouseX - centerX) / centerX;

      // interpolate - Eases and interpolates between center, right, and left matrix values
      const interpolate = (centerValue, rightValue, leftValue, factor) => {
        const clampedFactor = Math.max(-1, Math.min(1, factor));
        const eased = clampedFactor * Math.sqrt(Math.abs(clampedFactor));
        if (eased > 0) {
          return centerValue + (rightValue - centerValue) * eased;
        } else {
          return centerValue + (leftValue - centerValue) * Math.abs(eased);
        }
      };

      // Compute interpolated matrix components for the skew transform
      const m11 = interpolate(1.03893, 0.912403, 0.956238, normalizedX);
      const m12 = interpolate(-0.0085704, -0.220966, 0.232973, normalizedX);
      const m14 = interpolate(3.76e-5, 0.0025806, -0.0027208, normalizedX);

      const m21 = interpolate(0.0018047, 0.265743, -0.132768, normalizedX);
      const m22 = interpolate(0.994978, 0.329641, 0.293217, normalizedX);
      const m24 = interpolate(-1.35e-5, -0.001023, -0.0005111, normalizedX);

      const m41 = interpolate(5.85698, 80, -80, normalizedX);
      const m42 = interpolate(-1.8426, -30, -30, normalizedX);

      // Constant matrix components that remain static
      const m13 = 0,
        m23 = 0,
        m31 = 0,
        m32 = 0,
        m33 = 1,
        m34 = 0,
        m43 = 0,
        m44 = 1;

      // Construct CSS matrix3d transform string with fixed decimals for smooth transitions
      const matrix = `matrix3d(${m11.toFixed(6)}, ${m12.toFixed(
        6
      )}, ${m13}, ${m14.toFixed(7)}, ${m21.toFixed(6)}, ${m22.toFixed(
        6
      )}, ${m23}, ${m24.toFixed(
        7
      )}, ${m31}, ${m32}, ${m33}, ${m34}, ${m41.toFixed(4)}, ${m42.toFixed(
        4
      )}, ${m43}, ${m44})`;

      // Update state with the new transform matrix to trigger re-render
      setTransformValue(matrix);
    };

    // Attach mousemove listener on mount
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup listener on unmount
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black overflow-hidden">
      {/* Skew effect container with a large responsive title */}
      <div
        className="w-full flex justify-center py-8"
        style={{ height: "300px", overflow: "hidden" }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <h1
            className="special-font font-black text-black uppercase tracking-wider select-none cursor-pointer transition-transform duration-75 ease-out"
            style={{
              // Responsive font size: min 80px, preferred 20vw, max 210px
              fontSize: "clamp(80px, 20vw, 210px)",
              transform: transformValue,
              whiteSpace: "nowrap",
              lineHeight: 1,
              width: "max-content",
              margin: "0 auto",
            }}
          >
            zentr<b>y</b>
          </h1>
        </div>
      </div>

      {/* Original footer content with copyright and social links */}
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©Nova 2024. All rights reserved
        </p>

        {/* Social media icons with hover color transition */}
        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Privacy policy link */}
        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
