import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const headline = ["Motion", "that", "moves", "people."];

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 30, stiffness: 120 });
  const sy = useSpring(my, { damping: 30, stiffness: 120 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX - w / 2) / w);
      my.set((e.clientY - h / 2) / h);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const tx1 = useTransform(sx, (v) => v * -30);
  const ty1 = useTransform(sy, (v) => v * -30);
  const tx2 = useTransform(sx, (v) => v * 60);
  const ty2 = useTransform(sy, (v) => v * 60);
  const tx3 = useTransform(sx, (v) => v * -80);
  const ty3 = useTransform(sy, (v) => v * -80);

  return (
    <section id="top" className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pb-24 pt-40 md:px-12">
      {/* floating decor */}
      <motion.div
        style={{ x: tx2, y: ty2 }}
        className="animate-float absolute right-[8%] top-32 hidden h-24 w-24 rounded-3xl md:block"
      >
        <div className="h-full w-full rounded-3xl animate-gradient" style={{ background: "linear-gradient(135deg, oklch(0.55 0.24 285), oklch(0.63 0.18 255))" }} />
      </motion.div>
      <motion.div
        style={{ x: tx3, y: ty3 }}
        className="animate-float absolute bottom-32 left-[6%] hidden h-16 w-16 rounded-full md:block"
      >
        <div className="h-full w-full rounded-full" style={{ background: "oklch(0.63 0.18 255)", boxShadow: "0 0 60px oklch(0.63 0.18 255 / 0.5)" }} />
      </motion.div>

      <div className="mx-auto w-full max-w-5xl">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "oklch(0.63 0.18 255)" }} />
            Available · Fall 2026
          </motion.div>

          <motion.h1
            style={{ x: tx1, y: ty1 }}
            className="font-display text-[clamp(3rem,11vw,11rem)] font-semibold leading-[0.92] tracking-tight"
          >
            {headline.map((word, i) => (
              <span key={word} className="mr-[0.18em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 2 ? (
                    <span className="font-serif italic text-gradient">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            I'm <span className="text-foreground">Amr Hisham</span> — a motion designer and editor crafting cinematic stories for brands, artists and studios across the globe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              cursorVariant="button"
              className="cursor-none rounded-full px-7 py-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] animate-gradient"
              style={{ background: "linear-gradient(120deg, oklch(0.55 0.24 285), oklch(0.5 0.22 270), oklch(0.63 0.18 255), oklch(0.55 0.24 285))" }}
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            >
              See selected work
              <ArrowDown className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full"
            style={{ background: "var(--gradient-vibrant)" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
