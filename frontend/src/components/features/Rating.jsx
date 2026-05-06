import { useState } from "react";

export default function Rating({ onRate, disabled }) {
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleClick = (value, event) => {
    event.stopPropagation();
    if (disabled) {
      return;
    }
    setSelected(value);
    if (onRate) {
      onRate(value);
    }
  };

  return (
    <div className="flex items-center gap-1" onClick={(event) => event.stopPropagation()}>
      {[1, 2, 3, 4, 5].map((value) => {
        const active = hover ? value <= hover : value <= selected;
        return (
          <button
            key={value}
            type="button"
            className={`text-xl transition ${active ? "text-yellow-400" : "text-gray-500"} ${
              disabled ? "cursor-not-allowed opacity-60" : "hover:text-yellow-300"
            }`}
            onMouseEnter={() => !disabled && setHover(value)}
            onMouseLeave={() => setHover(0)}
            onClick={(event) => handleClick(value, event)}
            aria-label={`Calificar con ${value} estrellas`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
