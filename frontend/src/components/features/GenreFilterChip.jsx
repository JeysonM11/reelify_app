export default function GenreFilterChip({ active, children, onClick }) {
  return (
    <button
      type="button"
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${active ? "border-amber-300/50 bg-amber-300/12 text-amber-100 shadow-[0_0_0_1px_rgba(232,160,32,0.2)]" : "border-white/10 bg-white/5 text-stone-300 hover:border-white/20 hover:bg-white/10 hover:text-stone-100"}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
