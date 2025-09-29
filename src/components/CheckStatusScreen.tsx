"use client";

import { useState, useEffect } from "react";
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
  const [iframeError, setIframeError] = useState(false);

  // Handle iframe load completion
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle iframe load error
  const handleIframeError = () => {
    setIsLoading(false);
    setIframeError(true);
  };

  // Add a timeout fallback in case the iframe never loads
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        console.warn('Iframe loading timeout - enabling button anyway');
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading]);

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
              <a 
                href="https://resident.uidai.gov.in/bank-mapper" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-700 hover:text-blue-800 underline text-xs"
              >
                Can't see the portal? Click here to open in new tab
              </a>
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

          {/* Error state for iframe */}
          {iframeError && (
            <div className="mt-4 sm:mt-6 flex-1 flex items-center justify-center bg-red-50 rounded-lg border border-red-200 min-h-[400px] sm:min-h-[500px]">
              <div className="text-center px-4">
                <div className="text-red-500 mb-4">
                  <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-800 font-medium">Unable to load portal</p>
                <p className="text-red-600 text-sm mt-2">Please visit the official website directly:</p>
                <a 
                  href="https://resident.uidai.gov.in/bank-mapper" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Open in New Tab
                </a>
              </div>
            </div>
          )}

          {/* Portal Access Section - Government sites often block iframes */}
          <div className="mt-4 sm:mt-6 flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 min-h-[400px] sm:min-h-[500px]">
            <div className="text-center px-4 max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                🏛️ Official Government Portal Access
              </h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                For security reasons, the official UIDAI portal must be accessed directly. Click below to open the secure government website.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const url = "https://resident.uidai.gov.in/bank-mapper";
                    console.log("Opening official portal:", url);
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  🔗 Open Official UIDAI Portal
                </button>
                
                <div className="text-xs text-gray-500 bg-white/60 p-3 rounded border">
                  <p className="font-medium text-gray-700 mb-1">What you'll do there:</p>
                  <p>1. Enter your 12-digit Aadhaar number</p>
                  <p>2. Complete the captcha verification</p>
                  <p>3. Check if your account shows "Seeded" status</p>
                </div>
                
                <p className="text-xs text-gray-500 mt-3">
                  🔒 This opens the secure government website in a new tab
                </p>
              </div>
            </div>
          </div>

          {/* Backup iframe attempt - hidden by default, shows if somehow it works */}
          <iframe
            src="https://resident.uidai.gov.in/bank-mapper"
            title="Aadhaar Bank Mapper - Official Government Portal"
            className="hidden mt-4 sm:mt-6 w-full flex-1 min-h-[400px] sm:min-h-[500px] rounded-lg border border-border"
            onLoad={() => {
              console.log("Iframe loaded successfully");
              // If iframe loads, hide the manual access section and show iframe
              const iframe = document.querySelector('iframe[src*="bank-mapper"]') as HTMLElement;
              const manualSection = iframe?.previousElementSibling as HTMLElement;
              if (iframe && manualSection) {
                iframe.classList.remove('hidden');
                manualSection.style.display = 'none';
              }
              handleIframeLoad();
            }}
            onError={handleIframeError}
            sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation"
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
              disabled={false}
            >
              ✅ I Have Checked My Status
            </Button>
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Click after you've checked your Aadhaar seeding status on the official government portal
            </p>
          </div>
        </div>
      </main>

      {/* This is the Dialog that will pop up to ask for the result */}
      <AlertDialog open={step === 'prompting'} onOpenChange={() => setStep('instructions')}>
        <AlertDialogContent className="w-[95vw] max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">What was your Aadhaar seeding status?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 text-sm">
              <p>Based on what you saw on the official UIDAI portal, please select the appropriate option:</p>
              <div className="text-xs sm:text-sm bg-blue-50 p-3 rounded border border-blue-200">
                <p className="font-medium text-blue-900">✅ If you saw:</p>
                <p className="text-blue-800 mt-1">• "Account Status: Seeded" - You're eligible for DBT!</p>
                <p className="text-blue-800">• Your bank account linked with Aadhaar</p>
              </div>
              <div className="text-xs sm:text-sm bg-orange-50 p-3 rounded border border-orange-200">
                <p className="font-medium text-orange-900">❌ If you saw:</p>
                <p className="text-orange-800 mt-1">• "Not Seeded" or "No records found"</p>
                <p className="text-orange-800">• Error messages or no bank account shown</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel 
              onClick={() => setStep('instructions')}
              className="w-full sm:w-auto order-last sm:order-first"
            >
              🔄 Check Portal Again
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleFailure} 
              className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto text-sm"
            >
              ❌ Not Seeded - Need Help
            </AlertDialogAction>
            <AlertDialogAction 
              onClick={handleSuccess}
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-sm font-medium"
            >
              ✅ Seeded - I'm Ready!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
