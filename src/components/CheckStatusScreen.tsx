"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUser } from "@/context/UserContext";

// Define the steps in our interactive flow
type Step = 'instructions' | 'prompting';

export function CheckStatusScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState<Step>('instructions');
  const [isLoading, setIsLoading] = useState(true);

  // Handle iframe load completion
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleSuccess = () => {
    router.push('/success');
  };

  const handleFailure = () => {
    router.push('/action');
  };

  return (
    <>
      {/* The main screen with the WebView */}
      <main className="min-h-svh flex flex-col items-center px-2 sm:px-4 py-4 sm:py-8 text-center">
        <div className="w-full max-w-2xl flex-1 flex flex-col">
          <header>
            <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
              {user ? `${user.name}, check` : "Check"} Your Status on the Official Portal
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Use the secure government portal below to check if your bank account is seeded with Aadhaar for DBT (Direct Benefit Transfer).
            </p>
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs sm:text-sm">
              <p className="font-medium text-blue-900">💡 Quick Tip:</p>
              <p className="text-blue-800 leading-relaxed">
                Enter your Aadhaar number in the portal below. Look for &ldquo;Account Status&rdquo; - it should show &ldquo;Seeded&rdquo; for DBT eligibility.
              </p>
            </div>
          </header>

          {/* Loading indicator */}
          {isLoading && (
            <div className="mt-4 sm:mt-6 flex-1 flex items-center justify-center bg-gray-50 rounded-lg border border-border min-h-[400px] sm:min-h-[500px]">
              <div className="text-center px-4">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground text-sm">Loading official portal...</p>
                <p className="text-xs text-muted-foreground mt-2">This may take a moment on mobile networks</p>
              </div>
            </div>
          )}

          {/* This is the WebView that loads the official site */}
          <iframe
            src="https://resident.uidai.gov.in/bank-mapper"
            title="Aadhaar Bank Mapper - Official Government Portal"
            className={`mt-4 sm:mt-6 w-full flex-1 min-h-[400px] sm:min-h-[500px] rounded-lg border border-border ${isLoading ? 'hidden' : 'block'}`}
            onLoad={handleIframeLoad}
            sandbox="allow-same-origin allow-scripts allow-forms"
            style={{
              minHeight: 'calc(100vh - 400px)',
              maxHeight: 'calc(100vh - 300px)'
            }}
          />
          
          <div className="mt-4 sm:mt-6 space-y-2 px-2 sm:px-0">
            <Button 
              size="lg" 
              className="w-full h-12 text-base font-medium" 
              onClick={() => setStep('prompting')}
              disabled={isLoading}
            >
              {isLoading ? "Please wait for portal to load..." : "✅ I Have Finished Checking"}
            </Button>
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Having trouble? The portal may take a moment to load on slower connections.
            </p>
          </div>
        </div>
      </main>

      {/* This is the Dialog that will pop up to ask for the result */}
      <AlertDialog open={step === 'prompting'} onOpenChange={() => setStep('instructions')}>
        <AlertDialogContent className="w-[95vw] max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">What did you find on the portal?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 text-sm">
              <p>Please let us know what status you saw so we can guide you to the next step.</p>
              <div className="text-xs sm:text-sm bg-yellow-50 p-3 rounded border border-yellow-200">
                <p className="font-medium text-yellow-900">Look for:</p>
                <p className="text-yellow-800 mt-1">• &ldquo;Account Status: Seeded&rdquo; means you&rsquo;re all set!</p>
                <p className="text-yellow-800">• &ldquo;Not Seeded&rdquo; or &ldquo;No records found&rdquo; means action is needed</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel 
              onClick={() => setStep('instructions')}
              className="w-full sm:w-auto order-last sm:order-first"
            >
              Let me check again
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleFailure} 
              className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto text-sm"
            >
              ❌ Not Seeded / Need Help
            </AlertDialogAction>
            <AlertDialogAction 
              onClick={handleSuccess}
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-sm font-medium"
            >
              ✅ Account is Seeded!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
