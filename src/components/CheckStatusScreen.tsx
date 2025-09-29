// src/components/CheckStatusScreen.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink, Hand } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Step = 'instruct' | 'waiting' | 'prompting';

export function CheckStatusScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('instruct');

  const handleOpenPortal = () => {
    // === THIS IS THE CORRECT, WORKING LINK ===
    window.open("https://tathya.uidai.gov.in/access/login?role=resident", "_blank");
    // =======================================
    setStep('waiting');
  };

  const handleSuccess = () => router.push('/success');
  const handleFailure = () => router.push('/action');

  return (
    <>
      <main className="min-h-svh flex flex-col items-center justify-center text-center px-4 py-8">
        <div className="w-full max-w-lg">
          <header>
            <h1 className="text-3xl font-semibold">Check Your Account Status</h1>
            <p className="mt-2 text-muted-foreground">
              Follow this simple guide to securely verify your account on the official MyAadhaar portal.
            </p>
          </header>

          <div className="mt-8 text-left border rounded-lg p-6 space-y-6">
            {/* STEP 1: INSTRUCTIONS */}
            <div className={`transition-opacity duration-300 ${step !== 'instruct' ? 'opacity-50' : ''}`}>
              <h2 className="font-semibold text-lg flex items-center">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 transition-colors ${step === 'instruct' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>1</span>
                Login to the MyAadhaar Portal
              </h2>
              <p className="mt-2 text-muted-foreground ml-9">
                Click the button below to open the secure MyAadhaar website in a new tab. You will need to log in with your Aadhaar and OTP.
              </p>
              <Button onClick={handleOpenPortal} disabled={step !== 'instruct'} className="mt-3 ml-9">
                Open MyAadhaar Portal <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* STEP 2: WAITING FOR USER */}
            <div className={`transition-opacity duration-300 ${step !== 'waiting' ? 'opacity-50' : ''}`}>
              <h2 className="font-semibold text-lg flex items-center">
                <span className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 transition-colors ${step === 'waiting' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>2</span>
                Find "Bank Seeding Status"
              </h2>
              <p className="mt-2 text-muted-foreground ml-9">
                Once logged in, find and click on the "Bank Seeding Status" service. After you see the result, come back to this tab and click the button below.
              </p>
              <Button onClick={() => setStep('prompting')} disabled={step !== 'waiting'} className="mt-3 ml-9" variant="secondary">
                <Hand className="mr-2 h-4 w-4" /> I Have Finished Checking
              </Button>
            </div>
          </div>
          
          {step === 'waiting' && (
            <p className="mt-4 text-sm text-primary animate-pulse text-center">
              Waiting for you to finish on the MyAadhaar portal...
            </p>
          )}

        </div>
      </main>

      {/* The Dialog for getting the final result */}
      <AlertDialog open={step === 'prompting'} onOpenChange={() => setStep('instruct')}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>What was your status?</AlertDialogTitle>
            <AlertDialogDescription>
              Please tell us the result you saw on the portal. This will help us guide you to the next step.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleFailure} className="bg-destructive hover:bg-destructive/90">
              It was NOT Seeded
            </AlertDialogAction>
            <AlertDialogAction onClick={handleSuccess}>
              It was Seeded Successfully
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}