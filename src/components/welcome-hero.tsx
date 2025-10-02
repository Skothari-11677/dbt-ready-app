// src/components/welcome-hero.tsx

"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useUser } from '@/context/UserContext';
import { BookOpen, CheckSquare, GraduationCap } from 'lucide-react';

export function WelcomeHero() {
  const router = useRouter();
  const { user } = useUser();

  const handleCheckStatusClick = () => router.push('/check');
  const handleViewFAQs = () => router.push('/faq');
  const handleViewTutorials = () => router.push('/tutorials');

  return (
    <section className="min-h-svh flex items-center justify-center px-6 py-10">
      <div className="mx-auto w-full max-w-lg text-center">
        <header>
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
            {user ? `Welcome, ${user.name}!` : "Welcome to DBT-Ready"}
          </h1>
          <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
            Check your Aadhaar-DBT status, test your knowledge, or watch tutorials to prevent scholarship delays.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={handleCheckStatusClick}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-primary cursor-pointer text-left"
          >
            <CheckSquare className="w-12 h-12 text-primary mb-3" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Check My Status</h2>
            <p className="text-gray-600 text-sm">The main tool to verify your account and get a solution.</p>
          </div>
          <div
            onClick={() => router.push('/quiz')}
            className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer text-left"
          >
            <BookOpen className="w-12 h-12 mb-3" />
            <h2 className="text-xl font-bold mb-2">Test Your Knowledge</h2>
            <p className="text-blue-100 text-sm">Take our interactive quiz to become a DBT expert.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
            <Button onClick={handleViewTutorials} variant="link">
                <GraduationCap className="mr-2 h-4 w-4" /> Watch Video Tutorials
            </Button>
            <Button onClick={handleViewFAQs} variant="link">
                Read our FAQs
            </Button>
        </div>
      </div>
    </section>
  );
}