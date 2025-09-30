// src/app/action/page.tsx

"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. We removed the props. The component now manages its own logic.
export default function ActionPage() {
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  // 2. The PDF download logic is now defined directly inside the component.
  const handleDownloadPdf = () => {
    console.log("Download PDF button clicked!");
    const link = document.createElement('a');
    link.href = '/Aadhaar_Seeding_Consent_Form.pdf';
    link.setAttribute('download', 'Aadhaar_Seeding_Consent_Form.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. The bank locator logic is also defined directly inside.
  const handleFindBank = () => {
    setIsFindingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const query = encodeURIComponent("Nationalised bank branches near me");
          window.open(`https://www.google.com/maps/search/?api=1&query=${query}&ll=${latitude},${longitude}`, '_blank');
          setIsFindingLocation(false);
        },
        (error) => {
          console.error("Geolocation failed:", error.message);
          const query = encodeURIComponent("Nationalised bank branches near me");
          window.open(`https://maps.google.com/?q=${query}`, '_blank');
          setIsFindingLocation(false);
        }
      );
    } else {
      const query = encodeURIComponent("Nationalised bank branches near me");
      window.open(`https://maps.google.com/?q=${query}`, '_blank');
      setIsFindingLocation(false);
    }
  };

  return (
    <main className="min-h-svh px-4 py-8 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
        <AlertTriangle className="h-14 w-14 text-destructive" aria-hidden="true" />
        <h1 className="text-balance text-2xl font-semibold text-destructive mt-4">Action Needed: Account Not Seeded</h1>
        <p className="mt-3 text-pretty text-sm text-muted-foreground">{"Follow these steps to fix this:"}</p>

        <ol className="mt-6 w-full space-y-3">
          {/* Step 1 */}
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">1</span>
            <span className="flex-1 text-left text-sm">Download the Bank Consent Form</span>
            {/* 4. The button now calls the function defined inside this file. */}
            <Button size="sm" onClick={handleDownloadPdf}>
              Download PDF
            </Button>
          </li>
          {/* Step 2 */}
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">2</span>
            <span className="flex-1 text-left text-sm">Visit your nearest bank branch</span>
            {/* 5. This button also calls its own internal function. */}
            <Button size="sm" onClick={handleFindBank} disabled={isFindingLocation}>
              {isFindingLocation ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isFindingLocation ? "Finding..." : "Find My Bank"}
            </Button>
          </li>
          {/* Step 3 */}
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">3</span>
            <span className="flex-1 text-left text-sm">Submit the form to the bank official</span>
          </li>
        </ol>
      </div>
    </main>
  );
}