// src/components/CheckStatusScreen.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// A type for our possible statuses
type Status = "success" | "pending" | "error" | "checking";

export function CheckStatusScreen() {
  const router = useRouter();
  
  // We now use React state to manage the status
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    // This effect runs once when the component loads
    
    // After 1.5 seconds, change status to 'pending'
    const timer1 = setTimeout(() => {
      setStatus("pending");
    }, 1500);

    // After 3.5 seconds, change status to 'error' to guide the demo flow
    const timer2 = setTimeout(() => {
      setStatus("error");
    }, 3500);

    // Cleanup function to prevent errors if the user navigates away
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []); // The empty array [] means this effect runs only once

  // This function handles navigation when the user needs to proceed
  const handleContinue = () => {
    router.push('/action');
  };

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
              <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
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