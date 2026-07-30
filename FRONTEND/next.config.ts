import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El repo tiene BACKEND/ junto a esta app, lo que hace que Vercel infiera
  // mal la raíz del "workspace" para el tracing de archivos y rompa el
  // bundle del Edge Middleware (ReferenceError: __dirname is not defined).
  // Fijar esta carpeta como raíz explícita elimina esa ambigüedad.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Permite optimizar imágenes locales servidas desde /public
  },
};

export default nextConfig;
