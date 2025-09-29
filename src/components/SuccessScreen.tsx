// src/components/SuccessScreen.tsx

"use client"; // We need this for the interactive "Back to Home" button

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SuccessScreen() {
  const router = useRouter();

  return (
    <main className="min-h-svh flex flex-col items-center justify-center text-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-semibold">Account Already Seeded!</h1>
        <p className="mt-2 text-muted-foreground">
          Congratulations! Your bank account is ready to receive DBT payments. No further action is required.
        </p>
        <Button onClick={() => router.push('/')} size="lg" className="mt-8 w-full">
          Back to Home
        </Button>
      </div>
    </main>
  );
}