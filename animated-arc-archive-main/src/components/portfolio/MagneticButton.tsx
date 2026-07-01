import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  style?: CSSProperties;
  as?: "button" | "a";
  href?: string;
  cursorVariant?: string;
};

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  style,
  as = "button",
  href,
  cursorVariant = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 200 });
  const sy = useSpring(y, { damping: 18, stiffness: 200 });

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="inline-flex items-center justify-center gap-2"
    >
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor={cursorVariant}
      className={className}
      style={style}
      whileTap={{ scale: 0.96 }}
    >
      {as === "a" && href ? <a href={href}>{inner}</a> : inner}
    </motion.div>
  );
}