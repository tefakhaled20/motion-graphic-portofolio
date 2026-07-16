import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Background } from "@/components/portfolio/Background";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { Projects } from "@/components/portfolio/Projects";
import { About } from "@/components/portfolio/About";
import { Timeline } from "@/components/portfolio/Timeline";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amr Nasser — Motion Designer & Video Editor" },
      { name: "description", content: "Award-winning motion graphics and cinematic video editing for brands, artists and studios." },
      { property: "og:title", content: "Amr Nasser — Motion Designer & Video Editor" },
      { property: "og:description", content: "Award-winning motion graphics and cinematic video editing for brands, artists and studios." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <Background />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Timeline />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
