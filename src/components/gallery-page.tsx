import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import morningLight from "@/assets/morning-light.jpg";
import sideLight from "@/assets/side-light.jpg";
import coastalFog from "@/assets/coastal-fog.jpg";
import stairwell from "@/assets/stairwell.jpg";
import bowlLinen from "@/assets/bowl-linen.jpg";
import readingChair from "@/assets/reading-chair.jpg";
import duneRidge from "@/assets/dune-ridge.jpg";
import warmMug from "@/assets/warm-mug.jpg";

const frames = [
  { src: morningLight, title: "Morning Light", category: "Interiors", year: "2025" },
  { src: sideLight, title: "Side Light", category: "Portraits", year: "2024" },
  { src: coastalFog, title: "Coastal Fog", category: "Landscape", year: "2025" },
  { src: stairwell, title: "Stairwell", category: "Architecture", year: "2023" },
  { src: bowlLinen, title: "Bowl & Linen", category: "Still life", year: "2024" },
  { src: readingChair, title: "Reading Chair", category: "Interiors", year: "2022" },
  { src: duneRidge, title: "Dune Ridge", category: "Landscape", year: "2023" },
  { src: warmMug, title: "Warm Mug", category: "Still life", year: "2025" },
];

const categories = ["All", "Interiors", "Portraits", "Landscape", "Still life", "Architecture"];

export function GalleryPage() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const visibleFrames = category === "All" ? frames : frames.filter((frame) => frame.category === category);

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((selected + 1) % visibleFrames.length);
      if (event.key === "ArrowLeft") setSelected((selected - 1 + visibleFrames.length) % visibleFrames.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, visibleFrames.length]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground antialiased selection:bg-primary/20">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-52 size-[46rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-[-15rem] top-1/3 size-[34rem] rounded-full bg-chart-2/15 blur-[120px]" />
        <div className="absolute bottom-[-12rem] left-1/4 size-[30rem] rounded-full bg-chart-4/10 blur-[120px]" />
      </div>

      <header className="animate-gallery-glass sticky top-0 z-40 border-b border-gallery-line/10 bg-glass backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3 sm:px-6">
          <a href="#gallery" className="flex items-baseline gap-3" aria-label="Lumen home">
            <span className="font-display text-[22px] italic">Lumen</span>
            <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">Contact Sheet</span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm md:flex">
            <a className="font-medium text-primary" href="#gallery">Works</a>
            <a className="text-muted-foreground transition hover:text-foreground" href="#archive">Archive</a>
            <a className="text-muted-foreground transition hover:text-foreground" href="#studio">Studio</a>
          </nav>
          <Button className="rounded-full px-4 py-2 text-sm" onClick={() => window.location.href = "mailto:studio@lumen.gallery"}>
            <Mail className="mr-2 size-4" /> Inquire
          </Button>
        </div>
      </header>

      <section id="studio" className="relative mx-auto max-w-[1240px] px-5 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="animate-gallery-rise text-balance font-display text-[clamp(3.4rem,7vw,5.2rem)] leading-[0.92]">
              Contact Sheet<span className="italic text-primary">.</span>
            </h1>
            <p className="animate-gallery-rise mt-4 max-w-[52ch] text-pretty text-[15px] leading-relaxed text-muted-foreground [animation-delay:120ms]">
              Eight frames pulled from the archive — quiet interiors, weathered light, the slow architecture of a room. Open any frame to see it whole.
            </p>
          </div>
          <div className="animate-gallery-rise md:col-span-4 md:text-right [animation-delay:200ms]">
            <div className="font-display text-[52px] leading-none">08</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Frames · Winter 2025</div>
          </div>
        </div>

        <div id="archive" className="animate-gallery-rise mt-8 flex gap-2 overflow-x-auto rounded-2xl border border-gallery-line/10 bg-glass p-1.5 shadow-sm backdrop-blur-xl [animation-delay:260ms]">
          {categories.map((item) => {
            const count = item === "All" ? frames.length : frames.filter((frame) => frame.category === item).length;
            const active = category === item;
            return (
              <Button key={item} variant={active ? "primary" : "filter"} className="shrink-0 rounded-xl px-4 py-2 text-sm" onClick={() => { setCategory(item); setSelected(null); }} aria-pressed={active}>
                {item} · {count}
              </Button>
            );
          })}
          <span className="ml-auto hidden shrink-0 items-center pl-3 pr-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground lg:flex">Sorted by date</span>
        </div>
      </section>

      <main id="gallery" className="relative mx-auto max-w-[1240px] px-5 pb-24 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {visibleFrames.map((frame, index) => (
            <button
              key={frame.title}
              className="group animate-gallery-rise relative aspect-[4/5] overflow-hidden rounded-[min(2vw,14px)] text-left outline outline-1 -outline-offset-1 outline-gallery-line/5 focus-visible:ring-2 focus-visible:ring-primary"
              style={{ animationDelay: `${60 + index * 45}ms` }}
              onClick={() => setSelected(index)}
              aria-label={`Open ${frame.title}`}
            >
              <img src={frame.src} alt={frame.title} width={768} height={960} loading={index === 0 ? "eager" : "lazy"} className="size-full object-cover transition-transform duration-700 ease-gallery group-hover:scale-[1.025]" />
              <span className="absolute inset-x-0 bottom-0 translate-y-full p-2 opacity-0 transition-all duration-500 ease-gallery group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="block rounded-xl border border-glass-strong bg-glass px-3 py-2 shadow-sm backdrop-blur-xl">
                  <span className="block font-display text-[15px] italic leading-tight">{frame.title}</span>
                  <span className="block text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:text-[11px]">{frame.category} · {frame.year}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
        {visibleFrames.length === 0 && <p className="py-20 text-center text-muted-foreground">No frames in this collection yet.</p>}
      </main>

      <footer className="relative border-t border-gallery-line/10 bg-glass backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-6 text-muted-foreground">
          <span className="font-display text-[18px] italic text-foreground">Lumen</span>
          <span className="text-[11px] uppercase tracking-[0.2em]">Winter 2025 · Contact Sheet</span>
          <span className="text-[11px] uppercase tracking-[0.15em]">© Lumen Studio</span>
        </div>
      </footer>

      {selected !== null && visibleFrames[selected] ? (
        <div role="dialog" aria-modal="true" aria-label={visibleFrames[selected].title} className="fixed inset-0 z-50 grid place-items-center bg-foreground/80 p-4 backdrop-blur-xl" onClick={() => setSelected(null)}>
          <div className="relative flex max-h-[94vh] w-full max-w-5xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <img src={visibleFrames[selected].src} alt={visibleFrames[selected].title} width={768} height={960} className="max-h-[88vh] w-auto rounded-lg object-contain shadow-2xl" />
            <div className="absolute inset-x-3 bottom-3 flex items-end justify-between rounded-lg bg-glass-strong p-3 backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
              <div><p className="font-display text-lg italic">{visibleFrames[selected].title}</p><p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{visibleFrames[selected].category} · {visibleFrames[selected].year}</p></div>
              <div className="flex gap-2">
                <Button variant="icon" className="size-9 rounded-full" aria-label="Previous frame" onClick={() => setSelected((selected - 1 + visibleFrames.length) % visibleFrames.length)}><ArrowLeft className="size-4" /></Button>
                <Button variant="icon" className="size-9 rounded-full" aria-label="Next frame" onClick={() => setSelected((selected + 1) % visibleFrames.length)}><ArrowRight className="size-4" /></Button>
              </div>
            </div>
            <Button variant="icon" className="absolute right-3 top-3 size-10 rounded-full" aria-label="Close image" onClick={() => setSelected(null)}><X className="size-4" /></Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
