// Editable site content. Update service scope, slides and portfolio items here.
import heroPlanning from "@/assets/hero_campaign_planning.jpg";
import heroAnalysis from "@/assets/hero_campaign_analysis.jpg";
import heroContent from "@/assets/hero_content_planning.jpg";
import heroReel from "@/assets/hero_reel_filming.jpg";
import workSkincare from "@/assets/work_skincare_square.jpg";
import workCafe from "@/assets/work_cafe_square.jpg";
import workFitness from "@/assets/work_fitness_reel.jpg";
import workFood from "@/assets/work_food_reel.jpg";

/** Carousel timing (ms): hold still, then slide right-to-left. */
export const HERO_HOLD_MS = 2000;
export const HERO_TRANSITION_MS = 3000;

export const heroSlides = [
  { src: heroPlanning, alt: "Creative team planning an advertising campaign around a table" },
  { src: heroAnalysis, alt: "Marketer reviewing digital advertising campaigns on a monitor" },
  { src: heroContent, alt: "Hands arranging a social media content plan on a desk" },
  { src: heroReel, alt: "Creator filming a vertical reel with a smartphone and ring light" },
];

export const services = [
  {
    id: "Meta Ads",
    image: heroPlanning,
    description:
      "Campaign strategy, audience research, creative testing, and campaign optimisation for Facebook and Instagram.",
  },
  {
    id: "Google Ads",
    image: heroAnalysis,
    description:
      "Search campaign planning, keyword research, ad copy, and campaign performance monitoring.",
  },
  {
    id: "Social Media Management",
    image: heroContent,
    description: "Content planning, branded posts, publishing schedules, and community engagement.",
  },
  {
    id: "Reels Creation",
    image: heroReel,
    description:
      "Concept development, scripting, filming, editing, captions, and vertical-video content.",
  },
] as const;

export type ServiceName = (typeof services)[number]["id"];

export type WorkCategory = "Ad Creatives" | "Social Media" | "Reels";

export const workItems: {
  title: string;
  category: WorkCategory;
  image: string;
  vertical?: boolean;
  /** Optional video URL for reels; when missing, the card shows the poster only. */
  video?: string;
}[] = [
  { title: "Skincare product ad", category: "Ad Creatives", image: workSkincare },
  { title: "Fitness studio reel", category: "Reels", image: workFitness, vertical: true },
  { title: "Café feed post", category: "Social Media", image: workCafe },
  { title: "Restaurant kitchen reel", category: "Reels", image: workFood, vertical: true },
  { title: "Content planning board", category: "Social Media", image: heroContent },
  { title: "Campaign launch visual", category: "Ad Creatives", image: heroPlanning },
];

export const process = [
  { title: "Discover", text: "Understand the business, its audience, and what makes it different." },
  { title: "Plan", text: "Define goals, messaging, channels, and a content calendar." },
  { title: "Launch", text: "Publish campaigns and creative assets across the right platforms." },
  { title: "Optimise", text: "Review performance and refine the approach over time." },
];
