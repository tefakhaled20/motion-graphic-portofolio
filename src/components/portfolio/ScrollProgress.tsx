import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x, transformOrigin: "0%", background: "var(--gradient-vibrant)" }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px]"
    />
  );
}