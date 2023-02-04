import { useRef } from "react";

const FLOATING_LABELS_COLORS_MAP = {
  "#8D65FF": "text-purple",
  "#2FBDEA": "text-blue-200",
  "#45E3BE": "text-green",
  "#FFBB56": "text-yellow",
};

const FloatingLabel = (props) => {
  const {
    position = "top",
    color = FLOATING_LABELS_COLORS_MAP["#45E3BE"],
    text,
  } = props;
  const colorClass = FLOATING_LABELS_COLORS_MAP[color];
  return (
    <span
      data-floating-label={color.toLowerCase()}
      className={`text-xs md:text-lg font-normal font-secondary whitespace-nowrap transition-opacity duration-500 opacity-0 py-5 absolute left-0 w-full ${
        position == "top" ? "bottom-full" : "top-full"
      } ${colorClass}`}
    >
      {text}
    </span>
  );
};

export const BarItem = ({ image, label, revealLabel, offset }) => {
  const elRef = useRef();

  if (!image && !label) return null;

  return (
    <div
      data-animated-bar
      className={`w-16 md:w-20 lg:w-full cursor-pointer relative  pointer-events-auto`}
      style={{ "--offset": offset }}
      ref={elRef}
    >
      {image && (
        <picture className="block mb-5 relative z-2 bg-blue">
          {revealLabel &&
            [...revealLabel].map((label, index) => (
              <FloatingLabel key={index} {...label} />
            ))}
          {image}
        </picture>
      )}
      {label && (
        <p className="text-xs lg:text-lg font-normal text-blue-100 mb-0 whitespace-nowrap font-secondary group-hover:opacity-0 transition-opacity duration-300">
          {label}
        </p>
      )}
    </div>
  );
};
