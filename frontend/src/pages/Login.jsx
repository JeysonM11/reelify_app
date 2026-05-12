import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle, Sparkles } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#fcfcfc]">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] overflow-hidden rounded-xl border border-[#eaeaea] bg-white shadow-sm"
      >
        <div className="relative p-8">

          <div className="relative space-y-6">
            <div className="space-y-1 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#fafafa] border border-[#eaeaea] text-[#111] mb-4">
                <Sparkles size={24} />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#111]">Iniciar Sesión</h1>
              <p className="text-[#666] text-sm">Ingresa tus datos a continuación</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#111]">Correo Electrónico</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@ejemplo.com"
                      required
                      className="w-full rounded-md border border-[#eaeaea] bg-[#fcfcfc] py-2 px-3 text-sm text-[#111] placeholder:text-[#888] outline-none transition-colors focus:border-[#ccc]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#111]">Contraseña</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full rounded-md border border-[#eaeaea] bg-[#fcfcfc] py-2 px-3 text-sm text-[#111] placeholder:text-[#888] outline-none transition-colors focus:border-[#ccc]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-[#111] py-2 text-sm font-medium text-white transition-colors hover:bg-[#333] disabled:opacity-50 mt-2 shadow-sm"
              >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-[#666]">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="font-medium text-[#111] hover:text-[#333] transition-colors">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
