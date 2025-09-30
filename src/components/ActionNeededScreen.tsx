// src/components/ActionNeededScreen.tsx -- FINAL ISOLATION TEST

"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionNeededScreen() {
  const testDownloadClick = () => {
    console.log("SUCCESS: 'Download PDF' button was clicked!");
    alert("Download PDF button was clicked!");
  };

  const testFindBankClick = () => {
    console.log("SUCCESS: 'Find My Bank' button was clicked!");
    alert("Find My Bank button was clicked!");
  };

  return (
    <main className="min-h-svh px-4 py-8 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
        <AlertTriangle className="h-14 w-14 text-destructive" aria-hidden="true" />
        <h1 className="text-balance text-2xl font-semibold text-destructive mt-4">Action Needed: Account Not Seeded</h1>
        <p className="mt-3 text-pretty text-sm text-muted-foreground">{"Follow these steps to fix this:"}</p>

        <ol className="mt-6 w-full space-y-3">
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">1</span>
            <span className="flex-1 text-left text-sm">Download the Bank Consent Form</span>
            <Button size="sm" onClick={testDownloadClick}>
              Download PDF
            </Button>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">2</span>
            <span className="flex-1 text-left text-sm">Visit your nearest bank branch</span>
            <Button size="sm" onClick={testFindBankClick}>
              Find My Bank
            </Button>
          </li>
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">3</span>
            <span className="flex-1 text-left text-sm">Submit the form to the bank official</span>
          </li>
        </ol>
      </div>
    </main>
  );
}