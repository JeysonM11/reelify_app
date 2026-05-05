import TopPeliculas from "../components/features/TopPeliculas";

export default function Top() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="px-8 py-16 max-w-7xl mx-auto">
        <TopPeliculas />
      </div>
    </div>
  );
}
