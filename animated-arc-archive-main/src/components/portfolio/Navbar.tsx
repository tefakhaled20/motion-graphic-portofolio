import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("work");
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
  });

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 180 }}
        className="fixed left-1/2 top-6 z-50 w-[min(94%,920px)] -translate-x-1/2"
      >
        <div className="glass-strong flex items-center justify-between rounded-full px-5 py-3 shadow-[var(--shadow-elegant)]">
          <a href="#top" data-cursor="link" data-cursor-label="Home" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-vibrant)" }}>
              A
            </span>
            <span className="hidden font-display text-base font-semibold sm:block">Amr Hisham</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-cursor="link"
                data-cursor-label={l.label}
                className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "oklch(0 0 0 / 0.06)" }}
                    transition={{ type: "spring", damping: 22, stiffness: 240 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            data-cursor="button"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-primary-foreground md:inline-flex"
            style={{ background: "var(--gradient-vibrant)" }}
          >
            Let's talk
          </a>
          <button
            data-cursor="button"
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
            style={{ background: "oklch(1 0 0 / 0.95)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex items-center justify-end p-6">
              <button aria-label="Close" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-6 px-8 pt-12">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                  className="font-display text-5xl font-semibold"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
