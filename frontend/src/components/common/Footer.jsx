export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-purple-500/20 bg-black/50 py-8">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-3">Producto</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-purple-400 cursor-pointer transition">Películas</li>
              <li className="hover:text-purple-400 cursor-pointer transition">Series</li>
              <li className="hover:text-purple-400 cursor-pointer transition">Recomendaciones</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-3">Compañía</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-purple-400 cursor-pointer transition">Sobre nosotros</li>
              <li className="hover:text-purple-400 cursor-pointer transition">Blog</li>
              <li className="hover:text-purple-400 cursor-pointer transition">Contáctanos</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-3">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-purple-400 cursor-pointer transition">Privacidad</li>
              <li className="hover:text-purple-400 cursor-pointer transition">Términos</li>
              <li className="hover:text-purple-400 cursor-pointer transition">Cookies</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-3">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" className="text-purple-400 hover:text-purple-300 transition">𝕏</a>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition">Facebook</a>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition">Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700/50 pt-6 text-center text-gray-500 text-sm">
          <p>© {year} Reelify. Sistema de recomendación de películas inteligente.</p>
        </div>
      </div>
    </footer>
  );
}
