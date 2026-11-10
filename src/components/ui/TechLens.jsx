/**
 * A technology logo seated in a softly lit lens, tinted with the brand's own color.
 * `size` is a number (px) or any CSS length such as clamp().
 */
export default function TechLens({ tech, size = 64, showName = true, nameClassName = "", className = "" }) {
  const dimension = typeof size === "number" ? `${size}px` : size;
  return (
    <span className={`lens-wrap inline-flex flex-col items-center gap-2 ${className}`}>
      <span className="lens" style={{ width: dimension, height: dimension, "--glow": tech.color }}>
        <img
          src={tech.src}
          alt={showName ? "" : tech.name}
          loading="lazy"
          decoding="async"
          draggable="false"
          className="h-[46%] w-[46%] object-contain"
        />
      </span>
      {showName && (
        <span className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-mist sm:text-[11px] ${nameClassName}`}>{tech.short}</span>
      )}
    </span>
  );
}
