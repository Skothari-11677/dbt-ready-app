// src/components/ActionNeededScreen.tsx

"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionNeededScreen() {

  // Triggers a download of the consent form located in the /public folder
  const handleDownloadPdf = () => {
    console.log('Downloading Aadhaar seeding consent form PDF...');
    window.location.href = '/Aadhaar_Seeding_Consent_Form.pdf';
  };

  // Opens a new tab with a Google Maps search for banks in Bhopal
  const handleFindBank = () => {
    console.log('Opening bank locator...');
    const query = encodeURIComponent("Nationalised bank branches near me Bhopal");
    window.open(`https://maps.google.com/?q=${query}`, '_blank');
  };

  return (
    <main className="min-h-svh px-4 py-8">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <div className="mb-4">
          <AlertTriangle className="h-14 w-14 text-destructive" aria-hidden="true" />
          <span className="sr-only">Warning</span>
        </div>

        <h1 className="text-balance text-2xl font-semibold text-destructive">Action Needed: Account Not Seeded</h1>
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
            <Button size="sm" onClick={handleFindBank}>
              {"Find My Bank"}
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