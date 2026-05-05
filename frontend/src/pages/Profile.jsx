import { useUser } from "../contexts/UserContext";

export default function Profile() {
  const { usuarioId } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="px-8 py-16 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-purple-900/40 to-gray-900/40 p-8 rounded-xl border border-purple-500/30 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Mi Perfil</h1>
              <p className="text-gray-400">Usuario Reelify</p>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-6 rounded-xl border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-4">Información</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">ID de Usuario</p>
                <p className="text-white font-mono text-xs break-all">{usuarioId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Estado</p>
                <p className="text-green-400 font-semibold">✓ Activo</p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-purple-900/40 to-gray-900/40 p-6 rounded-xl border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-4">Estadísticas</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Películas Calificadas</p>
                <p className="text-3xl font-bold text-purple-400">0</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Promedio de Calificaciones</p>
                <p className="text-3xl font-bold text-yellow-400">-</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Acciones</h2>
          <div className="flex gap-4">
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition">
              🔄 Actualizar Recomendaciones
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              ⚙️ Preferencias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
