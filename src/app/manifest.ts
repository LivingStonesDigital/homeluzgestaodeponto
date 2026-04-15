import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HomeLuz",
    short_name: "HomeLuz",
    description: "Sistema de controle de ponto eletrônico",
    
    start_url: "/login",
    scope: "/",
    
    display: "standalone",
    orientation: "any",
    
    background_color: "#ffffff",
    theme_color: "#000000",
    
    icons: [
      {
        src: "/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    
    lang: "pt-BR",
    dir: "ltr",
    
    categories: ["business", "productivity"],
    
    prefer_related_applications: false,
  };
}