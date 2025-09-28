// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist } from "next/font/google"; // Your Geist font import
import "./globals.css";
import { Footer } from "@/components/Footer"; // 1. Import your Footer component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// 2. Updated the metadata to be specific to your project
export const metadata: Metadata = {
  title: "DBT Ready App",
  description: "Check your Aadhaar Seeding Status for Scholarships",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Kept your Geist font variable */}
      <body className={`${geistSans.variable} antialiased`}>
        {/* 3. Added a flex container to create a "sticky footer" layout */}
        <div className="flex flex-col min-h-screen">
          {/* 4. Added the <main> tag for semantic HTML and to hold the page content */}
          <main className="flex-grow">{children}</main>
          {/* 5. Rendered the Footer component after the main content */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
