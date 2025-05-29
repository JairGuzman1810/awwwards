// BentoCard - Displays a video background card with title and optional description
const BentoCard = ({ src, title, description }) => {
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
      <div className="relative z-10 size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>

          {/* Optional description below the title */}
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Features - Section highlighting immersive product experience using a Bento-style card layout
const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        {/* Intro paragraph */}
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

        {/* Featured Bento card (currently a single feature) */}
        <div className="border-hsla relative mb-7 h-96 w*full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                radia<b>n</b>t
              </>
            }
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          />
        </div>

        {/* TODO: Add more BentoCard components for additional features */}
      </div>
    </section>
  );
};

export default Features;
