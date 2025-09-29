// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { UserProvider } from '@/context/UserContext';
import { Analytics } from '@vercel/analytics/react'; // 1. ADD THIS LINE: Import the Analytics component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} antialiased`}>
        {/* 2. ADD THIS WRAPPER: UserProvider needs to wrap your main content */}
        <UserProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </UserProvider>
        
        {/* The Analytics component is now correctly imported and placed */}
        <Analytics />
      </body>
    </html>
  );
}