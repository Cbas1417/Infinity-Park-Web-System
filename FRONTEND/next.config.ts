import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El repo tiene BACKEND/ junto a esta app; sin esto Next.js infiere mal
  // la raíz del "workspace" para el tracing de archivos (warning al buildear).
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Permite optimizar imágenes locales servidas desde /public
  },
};

export default nextConfig;
