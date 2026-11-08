import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/buzzyo_logo.png";

const links = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Our Work", "#work"],
  ["Our Process", "#process"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-2 sm:px-8">
        <a href="#home" className="flex shrink-0 items-center gap-3" aria-label="Buzzyo Digital home">
          <img src={logo} alt="Buzzyo Digital logo" width={56} height={56} className="h-14 w-14" />
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-semibold text-foreground/80 transition hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-brand hidden !px-5 !py-2.5 sm:inline-flex">
            Let’s Talk
          </a>
          <button
            className="grid h-11 w-11 place-items-center rounded-lg text-foreground hover:bg-muted lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-t border-border bg-background transition-all duration-300 lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] border-transparent opacity-0"
        }`}
        inert={!open}
      >
        <nav className="min-h-0" aria-label="Mobile">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-semibold hover:bg-muted hover:text-primary"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#contact" onClick={() => setOpen(false)} className="btn-brand w-full">
                Let’s Talk
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
