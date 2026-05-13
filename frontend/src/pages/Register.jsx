import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus, AlertCircle, Sparkles, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { genres } from "../data/mockData";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    confirmPassword: "",
    generos_favoritos: []
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleGenre = (genre) => {
    const current = formData.generos_favoritos;
    const next = current.includes(genre)
      ? current.filter(g => g !== genre)
      : [...current, genre];
    setFormData({ ...formData, generos_favoritos: next });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#fcfcfc]">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[600px] overflow-hidden rounded-xl border border-[#eaeaea] bg-white shadow-sm my-8"
      >
        <div className="p-8">
          <div className="space-y-1 text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#fafafa] border border-[#eaeaea] text-[#111] mb-4">
              <Sparkles size={24} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#111]">Crea tu cuenta</h1>
            <p className="text-[#666] text-sm">Únete a Reelify y empieza a explorar</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500 mb-6"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#111]">Nombre</label>
                <input
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan"
                  required
                  className="w-full rounded-md border border-[#eaeaea] bg-[#fcfcfc] py-2 px-3 text-sm text-[#111] placeholder:text-[#888] outline-none focus:border-[#ccc]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#111]">Apellido</label>
                <input
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Pérez"
                  required
                  className="w-full rounded-md border border-[#eaeaea] bg-[#fcfcfc] py-2 px-3 text-sm text-[#111] placeholder:text-[#888] outline-none focus:border-[#ccc]"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-medium text-[#111]">Correo Electrónico</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@ejemplo.com"
                  required
                  className="w-full rounded-md border border-[#eaeaea] bg-[#fcfcfc] py-2 px-3 text-sm text-[#111] placeholder:text-[#888] outline-none focus:border-[#ccc]"
                />
              </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-[#111]">Nombre de usuario</label>
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="usuario123"
                    required
                    className="w-full rounded-md border border-[#eaeaea] bg-[#fcfcfc] py-2 px-3 text-sm text-[#111] placeholder:text-[#888] outline-none focus:border-[#ccc]"
                  />
                </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#111]">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-md border border-[#eaeaea] bg-[#fcfcfc] py-2 px-3 text-sm text-[#111] placeholder:text-[#888] outline-none focus:border-[#ccc]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#111]">Confirmar Contraseña</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-md border border-[#eaeaea] bg-[#fcfcfc] py-2 px-3 text-sm text-[#111] placeholder:text-[#888] outline-none focus:border-[#ccc]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium text-[#111] flex items-center justify-between">
                <span>Géneros Favoritos</span>
                <span className="text-[#666] text-[10px] bg-[#fafafa] px-2 py-0.5 rounded border border-[#eaeaea]">
                  {formData.generos_favoritos.length} seleccionados
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => {
                  const isSelected = formData.generos_favoritos.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                        isSelected 
                          ? "bg-[#111] border-[#111] text-white" 
                          : "bg-[#fcfcfc] border-[#eaeaea] text-[#666] hover:bg-[#fafafa]"
                      }`}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#111] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333] disabled:opacity-50 mt-4 shadow-sm"
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>

          <div className="text-center pt-6 mt-6 border-t border-[#eaeaea]">
            <p className="text-xs text-[#666]">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="font-medium text-[#111] hover:text-[#333] transition-colors">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
