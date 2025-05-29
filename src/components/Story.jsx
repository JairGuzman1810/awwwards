import AnimatedTitle from "./AnimatedTitle";

// Story - Renders the story section with an animated title and themed image
const Story = () => {
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
                  src="/img/entrance.webp"
                  alt="Entrance"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
