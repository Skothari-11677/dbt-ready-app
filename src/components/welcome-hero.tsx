"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"

export function WelcomeHero() {
  
  const router = useRouter(); 

  const handleCheckStatusClick = () => { 
    router.push('/check');
  };

  return (
    <section className="min-h-svh flex items-center justify-center px-6 py-10">
      <div className="mx-auto w-full max-w-md text-center">
        <header>
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
            <span className="block">{"स्कॉलरशिप अवेयरनेस में आपका स्वागत है"}</span>
            <span className="mt-1 block text-foreground/80">{"Welcome to Scholarship Awareness"}</span>
          </h1>
        </header>

        <p className="mt-4 text-pretty text-muted-foreground leading-relaxed">
          {"मिनटों में अवसर खोजें और अपनी पात्रता जाँचें। "}
          {"Discover opportunities and check your eligibility in minutes."}
        </p>

        <div className="mt-6">
          <Button onClick={handleCheckStatusClick} size="lg" className="w-full" aria-label="Check my scholarship status">
            Check My Status
          </Button>
        </div>
      </div>
    </section>
  )
}
