import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/gallery-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Contact Sheet — Lumen Studio" },
      { name: "description", content: "Explore Lumen Studio's winter contact sheet: eight studies of light, space, and stillness." },
      { property: "og:title", content: "Contact Sheet — Lumen Studio" },
      { property: "og:description", content: "Eight quiet frames exploring interiors, portraits, landscape, and form." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});