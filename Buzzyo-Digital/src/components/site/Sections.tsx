import { useState } from "react";
import { Megaphone, Search, CalendarHeart, Clapperboard, Play, X, ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/buzzyo_logo.png";
import { process, services, workItems, type ServiceName, type WorkCategory } from "@/lib/site-content";

const icons = [Megaphone, Search, CalendarHeart, Clapperboard];

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow text-brand-purple">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

export function Services({ onPick }: { onPick: (s: ServiceName) => void }) {
  return (
    <section id="services" className="px-5 py-24 sm:px-8">
      <SectionHead
        eyebrow="What we do"
        title="Services built to grow your brand"
        text="Four focused services, planned together so your ads and content work as one."
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = icons[i] ?? Megaphone;
          return (
            <article
              key={s.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={s.image} alt="" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-lg bg-gradient-brand text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold">{s.id}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <button onClick={() => onPick(s.id)} className="btn-outline-brand mt-6 self-start">
                  Discuss This Service <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

const filters: ("All" | WorkCategory)[] = ["All", "Ad Creatives", "Social Media", "Reels"];

export function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<(typeof workItems)[number] | null>(null);
  const items = workItems.filter((w) => filter === "All" || w.category === filter);

  return (
    <section id="work" className="bg-muted px-5 py-24 sm:px-8">
      <SectionHead
        eyebrow="Our work"
        title="Creative that stops the scroll"
        text="A look at the style of work we create. Pieces shown are sample concepts."
      />
      <div className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter work">
        {filters.map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              filter === f ? "bg-gradient-brand text-primary-foreground shadow-glow" : "bg-background text-foreground hover:text-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl grid-flow-dense grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {items.map((w) => (
          <button
            key={w.title}
            onClick={() => setOpen(w)}
            className={`group relative overflow-hidden rounded-xl bg-card text-left shadow-soft ${w.vertical ? "row-span-2" : ""}`}
            aria-label={`Open ${w.title}`}
          >
            <img src={w.image} alt={w.title} loading="lazy" className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${w.vertical ? "aspect-[9/16]" : "aspect-square"}`} />
            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground">Sample Concept</span>
            {w.vertical && (
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow">
                  <Play className="ml-0.5 h-6 w-6" />
                </span>
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-on-dark">
              <span className="block text-xs font-semibold uppercase tracking-wider text-brand-cyan">{w.category}</span>
              <span className="block font-display font-semibold">{w.title}</span>
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/85 p-4"
          onClick={() => setOpen(null)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
        >
          <div className="relative max-h-full" onClick={(e) => e.stopPropagation()}>
            <button autoFocus aria-label="Close" onClick={() => setOpen(null)} className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-background text-foreground">
              <X className="h-5 w-5" />
            </button>
            {open.video ? (
              <video src={open.video} poster={open.image} controls className="max-h-[80vh] rounded-xl" />
            ) : (
              <img src={open.image} alt={open.title} className={`max-h-[80vh] rounded-xl object-contain ${open.vertical ? "aspect-[9/16]" : ""}`} />
            )}
            <p className="mt-3 text-center text-sm text-on-dark/80">
              {open.title} — Sample Concept{open.vertical && !open.video ? " (video coming soon)" : ""}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="px-5 py-24 sm:px-8">
      <SectionHead eyebrow="Our process" title="Simple, clear, and built around you" />
      <ol className="relative mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-4">
        <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-brand opacity-30 md:block" />
        {process.map((p, i) => (
          <li key={p.title} className="relative text-center">
            <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-brand font-display text-lg font-bold text-primary-foreground shadow-glow">
              {i + 1}
            </span>
            <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-muted px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_1.3fr]">
        <img src={logo} alt="Buzzyo Digital logo" className="mx-auto w-full max-w-xs" loading="lazy" />
        <div>
          <p className="eyebrow text-brand-purple">About Buzzyo Digital</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Strategy, creative, and growth — under one roof.</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Buzzyo Digital is a digital marketing and content agency. We plan and run Meta and Google
            ad campaigns, manage social media, and produce reels — so your brand shows up
            consistently wherever your audience spends time.
          </p>
          <a href="#contact" className="btn-brand mt-8">Book a Consultation</a>
        </div>
      </div>
    </section>
  );
}

export function Contact({ service, setService }: { service: string; setService: (s: string) => void }) {
  const field = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";
  return (
    <section id="contact" className="px-5 py-24 sm:px-8">
      <SectionHead eyebrow="Contact" title="Let’s make some buzz" text="Tell us about your brand and we’ll get back to you to arrange a consultation." />
      <form
        className="mx-auto mt-12 grid max-w-2xl gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2 sm:p-10"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Thanks! Your enquiry is ready — we’ll be in touch soon.");
          e.currentTarget.reset();
          setService("");
        }}
      >
        <label className="grid gap-1.5 text-sm font-semibold">Name<input required name="name" className={field} /></label>
        <label className="grid gap-1.5 text-sm font-semibold">Email<input required type="email" name="email" className={field} /></label>
        <label className="grid gap-1.5 text-sm font-semibold">Phone<input name="phone" type="tel" className={field} /></label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Service
          <select required name="service" value={service} onChange={(e) => setService(e.target.value)} className={field}>
            <option value="" disabled>Choose a service</option>
            {services.map((s) => <option key={s.id}>{s.id}</option>)}
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-semibold sm:col-span-2">Message<textarea required name="message" rows={4} className={field} /></label>
        <button type="submit" className="btn-brand sm:col-span-2"><Mail className="h-4 w-4" /> Send Enquiry</button>
      </form>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-12 text-on-dark sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <img src={logo} alt="Buzzyo Digital logo" className="h-20 w-20" loading="lazy" />
        <p className="eyebrow text-on-dark/70">Strategy | Creative | Growth</p>
        <p className="text-sm text-on-dark/60">© {new Date().getFullYear()} Buzzyo Digital</p>
      </div>
    </footer>
  );
}
