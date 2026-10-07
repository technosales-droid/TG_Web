import type { MetadataRoute } from "next";

// Lets a visitor "Add to Home Screen" / "Install" the site with a real name and icon instead of a generic one.
// No service worker here, so this does not make the site work offline -- it only improves the install/home-screen
// identity. Icons are generated from the brand's tree logo mark (see public/brand/Favicon.png); regenerate them
// with sharp the same way if the logo ever changes.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Techno Gurukul",
    short_name: "Techno Gurukul",
    description: "A Nashik-based learning institute offering practical Digital Marketing and Game Development training.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ec",
    theme_color: "#0c709a",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
