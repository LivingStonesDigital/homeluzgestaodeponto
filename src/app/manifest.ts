import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HomeLuz - Controle de Ponto",
    short_name: "HomeLuz",
    description: "Sistema de controle de ponto eletrônico",
    
    start_url: "/",
    scope: "/",
    
    display: "standalone",
    orientation: "portrait",
    
    background_color: "#ffffff",
    theme_color: "#000000",
    
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
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