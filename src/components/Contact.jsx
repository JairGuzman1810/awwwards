import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

// ImageClipBox - Renders an image inside a container with a custom clip path
const ImageClipBox = ({ src, clipClassName }) => {
  return (
    <div className={clipClassName}>
      <img src={src} className="w-full h-auto object-cover" />
    </div>
  );
};

// Contact - Renders the contact section with call-to-action and decorative visuals
const Contact = () => {
  return (
    <div id="contact" className="relative my-20 w-full px-4 sm:px-10">
      {/* Mobile swordman - visible only on small screens */}
      <div className="absolute -top-20 left-1/2 z-10 w-48 -translate-x-1/2 sm:hidden">
        <ImageClipBox
          src="img/swordman.webp"
          clipClassName="sword-man-clip-path"
        />
      </div>

      {/* Main contact container with background, padding, and overflow hidden */}
      <div className="relative rounded-lg bg-black text-blue-50 overflow-hidden pt-40 pb-20 sm:py-24">
        {/* Side images (visible only on sm and larger screens) */}
        <div className="absolute inset-y-0 left-0 hidden sm:flex w-full max-w-[96rem] mx-auto pointer-events-none">
          <div className="relative w-72 lg:w-96 -translate-x-10 lg:translate-x-0">
            {/* First side image with custom clip path */}
            <ImageClipBox
              src="img/contact-1.webp"
              clipClassName="contact-clip-path-1"
            />

            {/* Second side image with vertical offset */}
            <ImageClipBox
              src="img/contact-2.webp"
              clipClassName="contact-clip-path-2 translate-y-60 lg:translate-y-40"
            />
          </div>
        </div>

        {/* Desktop swordman (visible on sm and up) */}
        <div className="absolute top-10 right-4 hidden sm:block sm:w-48 md:w-72 lg:top-20">
          {/* Decorative background swordman image (partial) */}
          <ImageClipBox
            src="img/swordman-partial.webp"
            clipClassName="absolute md:scale-110"
          />

          {/* Foreground swordman image with clip path */}
          <ImageClipBox
            src="img/swordman.webp"
            clipClassName="sword-man-clip-path md:scale-110"
          />
        </div>

        {/* Central content block */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-0">
          {/* Section label */}
          <p className="mb-6 text-xs uppercase tracking-widest sm:mb-10">
            Join Zentry
          </p>

          {/* Animated title with emphasized letters and line breaks */}
          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            className="special-font !text-4xl sm:!text-5xl md:!text-6xl lg:!text-[6.2rem] font-black leading-tight"
          />

          {/* CTA button */}
          <Button
            title="contact us"
            containerClassName="mt-8 sm:mt-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
