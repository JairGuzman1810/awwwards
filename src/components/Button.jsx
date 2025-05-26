// Button - Renders a styled button with optional left icon, right icon, ID, and custom layout classes
const Button = ({
  id,
  title,
  leftIcon,
  rightIcon,
  containerClassName,
  onClick,
}) => {
  return (
    // Button element with dynamic styling and click handler
    <button
      id={id} // Optional HTML ID for DOM access
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClassName}`} // Styling with optional container class
      onClick={onClick} // Triggered when the button is clicked
    >
      {/* Optional icon displayed to the left of the text */}
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {/* Button label text */}
        <div>{title}</div>
      </span>

      {/* Optional icon displayed to the right of the text */}
      {rightIcon}
    </button>
  );
};

export default Button;
