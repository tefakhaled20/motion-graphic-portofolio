import { motion } from "framer-motion";

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-mesh)" }} />
      <motion.div
        className="absolute -left-32 top-20 h-[520px] w-[520px] animate-blob opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.63 0.18 255 / 0.35), transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[40%] h-[600px] w-[600px] animate-blob opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.24 285 / 0.3), transparent 70%)", animationDelay: "-6s" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] h-[480px] w-[480px] animate-blob opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.2 300 / 0.25), transparent 70%)", animationDelay: "-12s" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
