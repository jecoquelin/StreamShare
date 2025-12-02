// src/app/layout.tsx
"use client";
import type { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/models/store/AuthStore";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <Toaster richColors position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}