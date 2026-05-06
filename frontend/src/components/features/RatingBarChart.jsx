export default function RatingBarChart({ data = [] }) {
  const max = Math.max(5, ...data.map((item) => item.avgRating || 0));

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Genre averages</p>
          <h3 className="mt-3 font-serif text-3xl text-stone-50">Average rating by genre</h3>
        </div>
        <p className="text-sm text-stone-400">Client-side aggregate chart</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" role="img" aria-label="Average rating per genre chart">
        {data.map((item) => {
          const height = `${Math.max(14, (item.avgRating / max) * 100)}%`;

          return (
            <div key={item.genre} className="flex flex-col items-center gap-3">
              <div className="text-sm font-semibold text-stone-100">{item.avgRating.toFixed(1)}</div>
              <div className="flex h-52 w-full items-end rounded-[1.5rem] border border-white/10 bg-black/30 p-2">
                <div className="w-full rounded-[1rem] bg-gradient-to-t from-amber-500 via-amber-400 to-amber-200 shadow-[0_0_30px_rgba(232,160,32,0.28)]" style={{ height }} />
              </div>
              <div className="text-center text-sm text-stone-300">{item.genre}</div>
              <div className="text-xs text-stone-500">{item.totalReviews} reviews</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
