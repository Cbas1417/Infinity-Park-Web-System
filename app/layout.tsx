// app/layout.tsx
import type { ReactNode } from "react";
import { i18n } from "@/lib/i18n-config";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={i18n.defaultLocale}>
      <body className="bg-paper text-carbon antialiased">{children}</body>
    </html>
  );
}