import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, X, Film, Link2 } from "lucide-react";
import type { MouseEvent, SyntheticEvent } from "react";
import { useEffect, useRef, useState } from "react";
import p1 from "@/assets/IMG-20251010-WA0020.jpg.jpeg";
import p2 from "@/assets/IMG-20251010-WA0005.jpg.jpeg";
import p3 from "@/assets/IMG-20250912-WA0051.jpg.jpeg";
import p4 from "@/assets/maxresdefault.jpg.jpeg";
import p5 from "@/assets/default.jpg";
import p6 from "@/assets/mqdefault.jpg";
import gameyaVideo1Thumb from "@/assets/gameya-video-1-thumb.jpg";
import SportEyeThumbnail from "@/assets/022.png";
import FightLegendsThumbnail from "@/assets/channels4_profile.jpg.jpeg";
import CastingThumbnail from "@/assets/casting.jpg.jpeg";

const projects = [
  {
    title: "Gam'eya we Daira",
    category: "YouTube Game Show",
    year: "2026",
    img: p1,
    accent: "oklch(0.55 0.24 285)",
    role: "Director & Editor",
    description:
      "I ran the entire post production for Gam'eya we Daira, a cinema-themed YouTube game show hosted by Mahmoud Mahdy with Casino Al3ab. Handed hours of raw multi-guest footage, I turned it into fast, high-energy episodes engineered to keep viewers watching. Every post stage was mine: punchy comedic editing, custom motion graphics for the game's cards and scoreboards, clean color grading, crisp sound, and captions — all matched to the show's cinematic brand. The result: a consistent, binge-worthy series that looks premium and keeps its audience hooked, episode after episode.",
    skills: ["Cinema 4D", "After Effects", "Color Grading"],
    published: "Mar 12, 2026",
  },
  {
    title: "3li Boltx",
    category: "YouTube Video",
    year: "2026",
    img: p4,
    accent: "oklch(0.63 0.18 255)",
    role: "Full post-production",
    description:
      "For 3li Boltx, I edited a high-energy car-and-food challenge video: two cars race between 5 random restaurants, where the car ahead decides what the car behind must order — first to finish wins. I cut the raw footage into a tight, fast-paced edit that keeps the competition and reactions front and center, with punchy pacing, sound design, and custom motion graphics (restaurant tags, live scoring, countdowns) guiding viewers through each round. The result: a scroll-stopping challenge video built to hold attention from the first restaurant to the last bite.",
    skills: ["After Effects", "Premiere Pro", "Color Grading"],
    published: "Jan 28, 2026",
  },
  {
    title: "Horror Storytelling — حكاوي التلات",
    category: "YouTube Video",
    year: "2025",
    img: p5,
    accent: "oklch(0.58 0.22 270)",
    role: "Video Editor",
    description:
      "Edited a horror storytelling video for حكاوي التلات — a true scary story from the host's high school days. I built the pacing to pull viewers in from the first line and keep the tension rising, layered in eerie sound design and music to sell the fear, and used dark, moody color grading to turn a simple narration into an immersive, edge-of-your-seat watch — the kind of video that makes people watch till the very last second, lights off.",
    skills: ["Premiere Pro", "Color Grading", "Sound Design"],
    published: "Nov 4, 2025",
  },
  {
    title: "Guess the Sound",
    category: "YouTube Video",
    year: "2025",
    img: p6,
    accent: "oklch(0.52 0.24 290)",
    role: "Video Editor",
    description:
      "Edited \"Guess the Sound\" for Abdullah Khaleel × Egi Squad, where three players battle it out identifying random sounds — get it right, score a point; get it wrong, lose one — until a winner emerges. I cut every reaction at the exact moment it hits, so the suspense of \"did they get it?\" never drops, synced each sound cue frame-perfect with on-screen cues, and built a live scoreboard with motion graphics that makes the competition impossible to look away from. 26 minutes of guessing, tension, and trash talk, edited to feel like a real game show.",
    skills: ["Premiere Pro", "Color Grading", "Sound Design"],
    published: "Aug 19, 2025",
  },
  {
    title: "SportEye",
    category: "YouTube Video",
    year: "2025",
    img: SportEyeThumbnail,
    accent: "oklch(0.6 0.2 275)",
    role: "Video Editor",
    description:
      "Editor for SportEye, a faceless combat-sports YouTube channel (154K+ subscribers) covering MMA, UFC, karate, and other fighting disciplines. I've edited multiple videos for the channel, cutting fight footage and narration into tight, high-energy videos built to hook viewers from the first clip — pacing key moments, knockouts, and reactions for maximum impact while keeping the story of each fight clear and easy to follow.",
    skills: ["Premiere Pro", "VFX", "Sound Design"],
    published: "Jun 2, 2025",
  },
  {
    title: "Fight Legends Unleashed",
    category: "YouTube Video",
    year: "2024",
    img: FightLegendsThumbnail,
    accent: "oklch(0.65 0.18 250)",
    role: "Video Editor",
    description:
      "Editor for Fight Legends Unleashed, a faceless MMA and combat-sports YouTube channel (18K+ subscribers). I edited faceless videos — no on-camera host, just footage and narration — covering fighters, techniques, and match breakdowns, cutting action clips and voiceover into fast-paced videos built to hold attention from the first strike to the last.",
    skills: ["Premiere Pro", "Sound Design"],
    published: "Oct 30, 2024",
  },
  {
    title: "كاستنج",
    category: "social media content",
    year: "2024",
    img: CastingThumbnail,
    accent: "oklch(0.65 0.18 250)",
    role: "Social Media Content Editor",
    description: "Managed the social media reels content for \"Season 2\" of \"كاستنج\", a television talent show directed by Marwan Emam and produced by United Studios, broadcast on CBC. I handled the reels output for the full season — pulling standout on-air moments from each TV episode and turning them into short-form content built to grow reach and keep the show's audience engaged between broadcasts, across a high-volume, fast-turnaround schedule.",
    skills: ["Premiere Pro", "Sound Design"],
    published: "Oct 30, 2024",
  },
];

// Helper to extract YouTube video ID from standard/short YouTube links
function getYouTubeId(urlOrId: string) {
  if (!urlOrId) return "";
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlOrId.match(regExp);
  return (match && match[2].length === 11) ? match[2] : urlOrId;
}

function getYouTubeEmbedUrl(urlOrId: string) {
  const videoId = getYouTubeId(urlOrId);
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
}

// Manual thumbnail overrides, keyed by the exact video URL/ID as used in
// projectVideos below. Use this for videos whose YouTube CDN thumbnail
// won't load (e.g. maxresdefault/hqdefault/etc. all 404 or fail to fetch) —
// drop the image in the assets folder, import it above, and map it here.
const videoThumbnailOverrides: Record<string, string> = {
  "https://youtu.be/79y1mcD9C9A?si=5AeSBgbhFxygfo-T": gameyaVideo1Thumb,
};

// YouTube thumbnail quality tiers, best to worst. Not every video has the
// higher-res ones (maxresdefault/sddefault often 404 on older or
// low-res uploads), but "default" always exists — it's the guaranteed floor.
const YOUTUBE_THUMBNAIL_QUALITIES = ["maxresdefault", "sddefault", "hqdefault", "mqdefault", "default"];

function getYouTubeThumbnailAtQuality(urlOrId: string, quality: string) {
  const videoId = getYouTubeId(urlOrId);
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

function getYouTubeThumbnail(urlOrId: string) {
  return getYouTubeThumbnailAtQuality(urlOrId, YOUTUBE_THUMBNAIL_QUALITIES[0]);
}

// Steps the <img> down to the next quality tier on load failure. Reads/writes
// the current tier off a data attribute on the element itself so it works as
// a plain onError handler with no extra React state per thumbnail.
function handleYouTubeThumbnailError(e: SyntheticEvent<HTMLImageElement>, urlOrId: string) {
  const img = e.currentTarget;
  const currentIndex = Number(img.dataset.qualityIndex ?? "0");
  const nextIndex = currentIndex + 1;
  if (nextIndex < YOUTUBE_THUMBNAIL_QUALITIES.length) {
    img.dataset.qualityIndex = String(nextIndex);
    img.src = getYouTubeThumbnailAtQuality(urlOrId, YOUTUBE_THUMBNAIL_QUALITIES[nextIndex]);
  }
}

// User-modifiable array of video URLs/IDs for each project
export const projectVideos: Record<string, string[]> = {
  "Gam'eya we Daira": [
    "https://youtu.be/79y1mcD9C9A?si=5AeSBgbhFxygfo-T",
    "https://youtu.be/CcQzV_ub8rY?si=mBYPQP0x-XbAaguu",
    "https://youtu.be/ES2cMpw6W0A?si=9y4-IuEpaGqE3aD1",
    "https://youtu.be/E-su6EuPl0g?si=UKjhrNbbc_ZZsfN8",
    "https://youtu.be/fDUobO5cSxc?si=SvXBPlnVzSZb5u4U",
    "https://youtu.be/KLohj3x_WXA?si=CBqeYy8JaDE6E1pM",
    "https://youtu.be/_ImflcnjskQ?si=BRDHdbrmmoT2R9yR",
    "https://youtu.be/KhZ8AL6CUtA?si=_EMyp018NSzTUk9a"

  ],
  "3li Boltx": [
    "https://youtu.be/mk4VhDM3ogA?si=4lJSMwhckXjDDqEd"
  ],
  "Horror Storytelling — حكاوي التلات": [
    "https://youtu.be/fHCwNWGS5-I?si=apZkWIXlgJFnK8xi"
  ],
  "Guess the Sound": [
    "https://youtu.be/88riCKO5Nu4?si=OOdpaaPSd0xmMsP3"
  ],
  "SportEye": [
    "https://youtu.be/4oCXaPMbs4k?si=Ajo6WUVLIGBvjm6J",
    "https://youtu.be/mPAQFGUntnc?si=MIDoCXbuu6NAevJg"
  ],
  "Fight Legends Unleashed": [
    "https://youtu.be/uFh2-07icEY?si=cIqmwutGUWkVZd-s",
    "https://youtu.be/COE9FzEpdKA?si=wUieShsWZ9WtMhUC",
    "https://youtu.be/rICafoPd7Hs?si=h0ILxCy_wlbqqJJY",
    "https://youtu.be/rICafoPd7Hs?si=h0ILxCy_wlbqqJJY"
  ],

};

// User-modifiable array of photo assets for each project
export const projectPhotos: Record<string, string[]> = {
  "Gam'eya we Daira": [p1, p2, p3],

};

// User-modifiable array of external links for each project (shown as a plain
// link card instead of a photo/video thumbnail — e.g. a profile or page)
export const projectLinks: Record<string, { label: string; url: string }[]> = {
  "كاستنج": [{ label: "Instagram", url: "https://www.instagram.com/castingums" }],
};


function Card({ p, i, onSelect }: { p: (typeof projects)[number]; i: number; onSelect: (title: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { damping: 18, stiffness: 200 });
  const sry = useSpring(ry, { damping: 18, stiffness: 200 });
  const rotateX = useTransform(srx, (v) => v);
  const rotateY = useTransform(sry, (v) => v);

  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onSelect(p.title)}
      data-cursor="project"
      initial={{ opacity: 0, y: 60 }}
      whileHover={{ scale: 1.02 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`group relative cursor-pointer ${i % 2 === 1 ? "lg:translate-y-16" : ""}`}
    >
      <div
        className="relative overflow-hidden rounded-[28px] glass-strong p-3 transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-20px_var(--accent-glow)]"
        style={{ ["--accent-glow" as string]: p.accent }}
      >
        {/* gradient border */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            padding: 1,
            background: `linear-gradient(135deg, ${p.accent}, oklch(0.63 0.18 255), oklch(0.55 0.24 285))`,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative overflow-hidden rounded-[20px]">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <motion.img
              src={p.img}
              alt={p.title}
              width={1280}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
          </div>
          {/* glow */}
          <div
            className="pointer-events-none absolute inset-x-0 -bottom-20 h-40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
            style={{ background: p.accent }}
          />
        </div>

        <div className="flex items-end justify-between p-5 pt-6">
          <div>
            <motion.span
              className="glass mb-3 inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              {p.category} · {p.year}
            </motion.span>
            <h3 className="font-display text-3xl font-semibold md:text-4xl">{p.title}</h3>
          </div>
          <motion.span
            className="grid h-12 w-12 place-items-center rounded-full glass"
            whileHover={{ rotate: 45 }}
            transition={{ type: "spring", damping: 14, stiffness: 200 }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [videoTitles, setVideoTitles] = useState<Record<string, string>>({});

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedVideo(null);
    setSelectedPhoto(null);
  };

  // Fetch the real YouTube titles for the selected project's videos.
  // Uses YouTube's public oEmbed endpoint, which needs no API key.
  const fetchedVideoTitles = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!selectedProject) return;
    const videoList = projectVideos[selectedProject] ?? [];
    let cancelled = false;

    videoList.forEach((urlOrId) => {
      if (fetchedVideoTitles.current.has(urlOrId)) return;
      fetchedVideoTitles.current.add(urlOrId);

      const videoId = getYouTubeId(urlOrId);
      const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
      fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!cancelled && data?.title) {
            setVideoTitles((current) => ({ ...current, [urlOrId]: data.title }));
          }
        })
        .catch(() => {
          // Silently keep the fallback "Video N" label if the fetch fails
          fetchedVideoTitles.current.delete(urlOrId);
        });
    });

    return () => {
      cancelled = true;
    };
  }, [selectedProject]);

  useEffect(() => {
    const isModalOpen = Boolean(selectedProject || selectedVideo || selectedPhoto);
    if (isModalOpen) {
      const scrollY = window.scrollY;
      const previousBodyOverflow = document.body.style.overflow;
      const previousHtmlOverflow = document.documentElement.style.overflow;
      const previousBodyPosition = document.body.style.position;
      const previousBodyTop = document.body.style.top;
      const previousBodyWidth = document.body.style.width;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      // Pin the body in place too, in case the page uses a custom/virtual
      // scroll library (e.g. Lenis, GSAP ScrollSmoother) that hijacks the
      // wheel event and ignores plain overflow:hidden.
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.documentElement.style.overflow = previousHtmlOverflow;
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.position = previousBodyPosition;
        document.body.style.top = previousBodyTop;
        document.body.style.width = previousBodyWidth;
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedProject, selectedVideo, selectedPhoto]);

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-32 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Selected Work · 2024 — 2026</p>
          <h2 className="font-display text-5xl font-semibold leading-[0.95] md:text-7xl">
            Stories rendered <span className="font-serif italic text-gradient">frame by frame</span>.
          </h2>
        </div>
        <a href="#contact" data-cursor="link" data-cursor-label="All work" className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          View all projects →
        </a>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <Card key={p.title} p={p} i={i} onSelect={setSelectedProject} />
        ))}
      </div>

      {/* Modals Container */}
      <AnimatePresence>
        {/* 1. Video List Modal */}
        {selectedProject && (() => {
          const activeProject = projects.find((p) => p.title === selectedProject);
          if (!activeProject) return null;
          const videos = projectVideos[selectedProject] ?? [];
          const photos = projectPhotos[selectedProject] ?? [];
          const links = projectLinks[selectedProject] ?? [];

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
              onWheel={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-2xl md:grid-cols-[380px_1fr] md:h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-5 top-5 z-10 rounded-full border border-black/10 bg-black/5 p-2 text-zinc-500 transition-all duration-300 hover:border-black/20 hover:bg-black/10 hover:text-zinc-900"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Left: Project details panel */}
                <div
                  className="flex flex-col gap-7 border-b border-black/10 bg-zinc-50 p-6 md:min-h-0 md:overscroll-contain md:border-b-0 md:border-r md:overflow-y-auto md:p-10"
                  style={{ ["--accent-glow" as string]: activeProject.accent }}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      {activeProject.category} · {activeProject.year}
                    </span>
                    <h3 className="font-display mt-2 text-3xl font-semibold leading-tight pr-8 text-zinc-900">
                      {activeProject.title}
                    </h3>
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-zinc-500">My role</p>
                    <p className="text-sm text-zinc-900">{activeProject.role}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Project description</p>
                    <p className="text-sm leading-relaxed text-zinc-700">{activeProject.description}</p>
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] text-zinc-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-auto text-xs text-zinc-500">Published on {activeProject.published}</p>
                </div>

                {/* Right: Photos + Videos, one scrolling column */}
                <div className="flex flex-col p-6 md:min-h-0 md:overflow-y-auto md:overscroll-contain md:p-10">
                  <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Photos &amp; Videos
                  </p>
                  <div className="space-y-4">
                    {photos.map((photo, index) => (
                      <motion.div
                        key={`photo-${index}`}
                        whileHover={{ x: 4 }}
                        onClick={() => setSelectedPhoto(photo)}
                        className="group flex cursor-pointer items-center gap-5 rounded-2xl border border-black/10 bg-zinc-50 p-4 transition-colors hover:border-black/20 hover:bg-zinc-100"
                      >
                        <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={photo}
                            alt={`${activeProject.title} photo ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0 flex-1" />
                        <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100" />
                      </motion.div>
                    ))}

                    {videos.map((urlOrId, index) => (
                      <motion.div
                        key={`video-${index}`}
                        whileHover={{ x: 4 }}
                        onClick={() => setSelectedVideo(urlOrId)}
                        className="group flex cursor-pointer items-center gap-5 rounded-2xl border border-black/10 bg-zinc-50 p-4 transition-colors hover:border-black/20 hover:bg-zinc-100"
                      >
                        <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={videoThumbnailOverrides[urlOrId] ?? getYouTubeThumbnail(urlOrId)}
                            alt={`${activeProject.title} video ${index + 1}`}
                            className="h-full w-full object-cover"
                            onError={(e) => handleYouTubeThumbnailError(e, urlOrId)}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/10">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black transition-transform group-hover:scale-110">
                              <Play className="ml-0.5 h-4 w-4 fill-current" />
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-medium text-zinc-900">
                            {videoTitles[urlOrId] ?? `Video ${index + 1}`}
                          </p>
                          <p className="text-sm text-zinc-500">Click to watch in embedded player</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100" />
                      </motion.div>
                    ))}

                    {links.map((link, index) => (
                      <motion.a
                        key={`link-${index}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        className="group flex cursor-pointer items-center gap-5 rounded-2xl border border-black/10 bg-zinc-50 p-4 transition-colors hover:border-black/20 hover:bg-zinc-100"
                      >
                        <div className="relative flex h-24 w-40 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-900">
                          <Link2 className="h-8 w-8 text-white/80" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-medium text-zinc-900">{link.label}</p>
                          <p className="truncate text-sm text-zinc-500">{link.url}</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100" />
                      </motion.a>
                    ))}

                    {photos.length === 0 && videos.length === 0 && links.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-500">
                        <Film className="mb-3 h-10 w-10 opacity-40" />
                        <p className="text-sm">No photos or videos added yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}

        {/* 2. Photo Lightbox Overlay */}
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg"
            onClick={() => setSelectedPhoto(null)}
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/10 p-2 text-white transition-all duration-300 hover:border-white/20 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={selectedPhoto}
                alt={selectedProject ?? "Project photo"}
                className="max-h-[90vh] w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}

        {/* 3. YouTube Embed Modal Overlay */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg"
            onClick={() => setSelectedVideo(null)}
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside video overlay */}
              <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
                <span className="text-sm font-medium text-foreground">
                  Now Playing: {(selectedVideo && videoTitles[selectedVideo]) ?? selectedProject}
                </span>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="rounded-full border border-white/10 bg-white/5 p-1.5 text-muted-foreground transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Aspect Ratio Video container */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo)}
                  title="YouTube Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}