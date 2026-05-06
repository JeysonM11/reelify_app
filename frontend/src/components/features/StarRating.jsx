import { useMemo, useState } from "react";

const normalizeValue = (value) => Math.max(0, Math.min(5, Number(value) || 0));

export default function StarRating({ value = 0, onChange, interactive = false, size = "md", label, className = "", readOnly = false }) {
  const [hovered, setHovered] = useState(0);
  const displayValue = normalizeValue(value);

  const starSizeClass = useMemo(() => {
    if (size === "lg") return "star-rating--lg";
    if (size === "sm") return "star-rating--sm";
    return "star-rating--md";
  }, [size]);

  const currentValue = hovered || displayValue;

  return (
    <div className={`star-rating ${starSizeClass} ${className}`} role={interactive ? "radiogroup" : "img"} aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= currentValue;

        return (
          <button
            key={star}
            type="button"
            className={`transition ${interactive && !readOnly ? "cursor-pointer" : "cursor-default"} text-amber-400 ${active ? "drop-shadow-[0_0_10px_rgba(232,160,32,0.8)]" : "opacity-35"}`}
            onMouseEnter={() => interactive && !readOnly && setHovered(star)}
            onMouseLeave={() => interactive && !readOnly && setHovered(0)}
            onClick={() => interactive && !readOnly && onChange?.(star)}
            onKeyDown={(event) => {
              if (!interactive || readOnly) return;
              if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                event.preventDefault();
                onChange?.(Math.min(5, star + 1));
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                event.preventDefault();
                onChange?.(Math.max(1, star - 1));
              }
            }}
            aria-label={`Calificar con ${star} estrellas`}
            aria-checked={interactive ? star === currentValue : undefined}
            role={interactive ? "radio" : undefined}
            disabled={!interactive || readOnly}
          >
            ★
          </button>
        );
      })}
      {!interactive || readOnly ? <span className="ml-2 text-sm text-stone-300">{displayValue.toFixed(1)}</span> : null}
    </div>
  );
}
