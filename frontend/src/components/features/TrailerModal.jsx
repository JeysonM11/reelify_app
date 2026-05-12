import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function TrailerModal({ isOpen, onClose, movieTitle }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl"
        >
          <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10">
             <h2 className="text-white font-bold tracking-tight">Trailer: {movieTitle}</h2>
             <button 
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
             >
               <X size={20} />
             </button>
          </div>

          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`} // Mocked URL, should be from movie data
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
