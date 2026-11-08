import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { About, Contact, Footer, Process, Services, Work } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buzzyo Digital — Meta Ads, Google Ads, Social Media & Reels" },
      { name: "description", content: "Buzzyo Digital helps brands grow with Meta Ads, Google Ads, social media management and reels creation." },
      { property: "og:title", content: "Buzzyo Digital — Make your brand impossible to ignore" },
      { property: "og:description", content: "Meta Ads, Google Ads, social media management and reels creation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [service, setService] = useState("");
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <Services
          onPick={(s) => {
            setService(s);
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <Work />
        <Process />
        <About />
        <Contact service={service} setService={setService} />
      </main>
      <Footer />
    </>
  );
}
