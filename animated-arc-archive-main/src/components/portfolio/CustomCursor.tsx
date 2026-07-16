import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "button" | "project" | "video" | "link";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      if (!el?.closest) return;
      const interactive = el.closest<HTMLElement>("[data-cursor]");
      if (interactive) {
        const v = (interactive.dataset.cursor as Variant) || "button";
        setVariant(v);
        setLabel(interactive.dataset.cursorLabel ?? "");
      } else {
        setVariant("default");
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const sizes: Record<Variant, { w: number; h: number; r: number }> = {
    default: { w: 14, h: 14, r: 999 },
    button: { w: 56, h: 56, r: 999 },
    project: { w: 120, h: 120, r: 999 },
    video: { w: 80, h: 80, r: 999 },
    link: { w: 70, h: 28, r: 999 },
  };
  const s = sizes[variant];

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden mix-blend-difference md:block"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="flex items-center justify-center text-[10px] font-semibold uppercase tracking-widest text-black"
          animate={{ width: s.w, height: s.h, borderRadius: s.r, x: -s.w / 2, y: -s.h / 2 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          style={{ background: "white" }}
        >
          {variant === "project" && "View"}
          {variant === "video" && "▶"}
          {variant === "link" && label}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:block"
        style={{ x, y }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 6, height: 6, background: "oklch(0.55 0.24 285)", boxShadow: "0 0 20px oklch(0.55 0.24 285 / 0.6)" }}
        />
      </motion.div>
    </>
  );
}