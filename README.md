

import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HomeLuz - Controle de Ponto",
    short_name: "HomeLuz",
    description: "Sistema de controle de ponto eletrônico",
    
    id: "/",
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
        purpose: "any maskable",
      },
      {
        src: "/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
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
    
    shortcuts: [
      {
        name: "Bater Ponto",
        short_name: "Ponto",
        description: "Registrar ponto",
        url: "/dashboard/ponto",
      },
      {
        name: "Aprovações",
        short_name: "Aprovações",
        description: "Ver aprovações",
        url: "/dashboard/aprovacoes",
      },
    ],
    
    categories: ["business", "productivity"],
    
    prefer_related_applications: false,
    
    related_applications: [],
  };
}