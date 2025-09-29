// src/components/CheckStatusScreen.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// A type for our possible statuses
type Status = "success" | "pending" | "error" | "checking";

export function CheckStatusScreen() {
  // 1. Hooks are grouped at the top
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");

  // 2. Event handlers are grouped together
  const handleContinue = () => {
    // Navigates to the action page when the check 'fails'
    router.push('/action');
  };

  const handleRetryCheck = () => {
    // A simple way to restart the simulation
    window.location.reload();
  };

  // 3. Effects are grouped together
  useEffect(() => {
    // This effect runs once to simulate the API call
    const timer1 = setTimeout(() => setStatus("pending"), 1500);
    const timer2 = setTimeout(() => setStatus("error"), 3500);

    // Cleanup function to prevent errors
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []); // The empty array [] means this effect runs only once

  // 4. Data transformation / display logic
  const getStatusDisplay = () => {
    switch (status) {
      case "success":
        return {
          icon: <CheckCircle className="h-14 w-14 text-green-600" />,
          title: "Account Successfully Seeded!",
          description: "Your Aadhaar has been linked to your bank account.",
          color: "text-green-600",
          bgColor: "bg-green-50",
        };
      case "pending":
        return {
          icon: <Clock className="h-14 w-14 text-yellow-600" />,
          title: "Status Check in Progress",
          description: "We're verifying your account seeding status. This may take a few minutes.",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
        };
      case "error":
        return {
          icon: <AlertCircle className="h-14 w-14 text-red-600" />,
          title: "Unable to Verify Status",
          description: "We couldn't verify your account seeding status. Let's fix this.",
          color: "text-red-600",
          bgColor: "bg-red-50",
        };
      default: // checking
        return {
          icon: <Clock className="h-14 w-14 text-blue-600 animate-spin" />,
          title: "Checking Account Status",
          description: "Please wait while we verify your Aadhaar seeding status with the bank.",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  // 5. The final JSX to render
  return (
    <main className="min-h-svh px-4 py-8">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <div className={`mb-4 rounded-full p-4 ${statusDisplay.bgColor}`}>
          {statusDisplay.icon}
          <span className="sr-only">Status indicator</span>
        </div>

        <h1 className={`text-balance text-2xl font-semibold ${statusDisplay.color}`}>
          {statusDisplay.title}
        </h1>

        <p className="mt-3 text-pretty text-sm text-muted-foreground">
          {statusDisplay.description}
        </p>

        {status === "checking" && (
          <div className="mt-6 w-full">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Checking with bank systems...</p>
          </div>
        )}

        <div className="mt-8 w-full space-y-3">
          {status === "success" && (
            <Button onClick={() => router.push('/')} className="w-full" size="lg">
              Back to Home
            </Button>
          )}

          {status === "error" && (
            <>
              <Button onClick={handleContinue} className="w-full">
                Show Me How to Fix This
              </Button>
              <Button onClick={handleRetryCheck} variant="outline" className="w-full">
                Try Again
              </Button>
            </>
          )}

          {status === "checking" && (
            <Button variant="outline" className="w-full" disabled>
              Please Wait...
            </Button>
          )}
        </div>
        
        <div className="mt-6 text-xs text-muted-foreground">
          <p>This process is secure and follows RBI guidelines.</p>
        </div>
      </div>
    </main>
  );
}