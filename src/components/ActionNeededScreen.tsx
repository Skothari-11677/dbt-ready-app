// src/components/ActionNeededScreen.tsx

"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionNeededScreen() {
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const handleDownloadPdf = () => {
    window.location.href = '/Aadhaar_Seeding_Consent_Form.pdf';
  };

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
          console.error("Geolocation denied or failed: ", error.message);
          // === THIS IS THE KEY CHANGE ===
          // The new fallback is a generic search, not tied to any city.
          const query = encodeURIComponent("Nationalised bank branches near me");
          window.open(`https://maps.google.com/?q=${query}`, '_blank');
          setIsFindingLocation(false);
        }
      );
    } else {
      console.log("Geolocation is not supported.");
      const query = encodeURIComponent("Nationalised bank branches near me");
      window.open(`https://maps.google.com/?q=${query}`, '_blank');
      setIsFindingLocation(false);
    }
  };

  return (
    <main className="min-h-svh px-4 py-8">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <AlertTriangle className="h-14 w-14 text-destructive" aria-hidden="true" />
        <h1 className="text-balance text-2xl font-semibold text-destructive mt-4">Action Needed: Account Not Seeded</h1>
        <p className="mt-3 text-pretty text-sm text-muted-foreground">{"Follow these steps to fix this:"}</p>

        <ol className="mt-6 w-full space-y-3">
          {/* Step 1 */}
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">1</span>
            <span className="flex-1 text-left text-sm">Download the Bank Consent Form</span>
            <Button size="sm" onClick={handleDownloadPdf}>
              {"Download PDF"}
            </Button>
          </li>
          {/* Step 2 */}
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">2</span>
            <span className="flex-1 text-left text-sm">Visit your nearest bank branch</span>
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