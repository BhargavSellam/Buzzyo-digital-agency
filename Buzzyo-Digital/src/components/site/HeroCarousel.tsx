import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { HERO_HOLD_MS, HERO_TRANSITION_MS, heroSlides } from "@/lib/site-content";

export function HeroCarousel() {
  const n = heroSlides.length;
  // index may equal n (a clone of slide 0) to loop seamlessly without a visible reset
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    const vis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => {
      mq.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  const active = playing && !hovered && !focused && !hidden && !reduced;

  useEffect(() => {
    if (!active || index >= n) return;
    const t = setTimeout(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, HERO_HOLD_MS);
    return () => clearTimeout(t);
  }, [active, index, n]);

  // After sliding onto the clone, snap back to slide 0 without animation.
  const onTransitionEnd = () => {
    if (index >= n) {
      setAnimate(false);
      setIndex(0);
    }
  };
  useEffect(() => {
    if (!animate) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      return () => cancelAnimationFrame(r);
    }
  }, [animate]);

  const go = useCallback(
    (to: number) => {
      setPlaying(false);
      setAnimate(!reduced);
      setIndex(((to % n) + n) % n);
    },
    [n, reduced],
  );
  const current = index % n;

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="Buzzyo Digital highlights"
      className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition:
            animate && !reduced
              ? `transform ${HERO_TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
              : "none",
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {[...heroSlides, heroSlides[0]].map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={i < n ? s.alt : ""}
            aria-hidden={i >= n || i !== index}
            width={1920}
            height={1088}
            loading={i === 0 ? "eager" : "lazy"}
            className="h-full w-full shrink-0 object-cover"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pb-24 sm:px-8">
        <div className="max-w-2xl animate-fade-up text-on-dark">
          <p className="eyebrow text-brand-cyan">Strategy. Creative. Growth.</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            Make your brand
            <br />
            <span className="text-gradient-brand brightness-125">impossible to ignore.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-on-dark/85 sm:text-lg">
            Connect with your audience through Meta Ads, Google Ads, social media management, and
            reels that tell your story.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn-brand">Let’s Grow Your Brand</a>
            <a href="#work" className="btn-outline-light">Explore Our Work</a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 text-on-dark sm:px-8">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-10 bg-gradient-brand" : "w-4 bg-on-dark/40 hover:bg-on-dark/70"
              }`}
            />
          ))}
          <span className="ml-3 font-display text-sm tabular-nums text-on-dark/80" aria-live="polite">
            {String(current + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {[
            { label: "Previous slide", icon: ChevronLeft, onClick: () => go(current - 1) },
            {
              label: playing ? "Pause slideshow" : "Play slideshow",
              icon: playing ? Pause : Play,
              onClick: () => setPlaying((p) => !p),
            },
            { label: "Next slide", icon: ChevronRight, onClick: () => go(current + 1) },
          ].map(({ label, icon: Icon, onClick }) => (
            <button
              key={label}
              aria-label={label}
              onClick={onClick}
              className="grid h-11 w-11 place-items-center rounded-full border border-on-dark/30 bg-ink/30 backdrop-blur transition hover:bg-on-dark/15 focus-visible:outline-2 focus-visible:outline-brand-cyan"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
