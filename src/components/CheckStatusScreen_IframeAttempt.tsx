// src/components/CheckStatusScreen_IframeAttempt.tsx

"use client";

import { Button } from "@/components/ui/button";

export function CheckStatusScreen_IframeAttempt() {
  return (
    <main className="min-h-svh flex flex-col items-center px-4 py-8 text-center">
      <div className="w-full max-w-4xl flex-1 flex flex-col">
        <header>
          <h1 className="text-3xl font-semibold">Testing the MyAadhaar Portal</h1>
          <p className="mt-2 text-muted-foreground">
            Below is an attempt to load the official portal in a WebView.
          </p>
        </header>

        {/* This is the iframe. The browser will attempt to load the URL.
          Because the myaadhaar.uidai.gov.in server has security settings
          to prevent this, the browser will block it, and this frame
          will likely show an error or remain blank.
        */}
        <iframe
          src="https://tathya.uidai.gov.in/access/login?role=resident"
          title="MyAadhaar Portal"
          className="mt-6 w-full flex-1 rounded-lg border border-border bg-muted"
        />
        
        <div className="mt-6">
          <Button size="lg" className="w-full" variant="secondary" disabled>
            This is for demonstration only
          </Button>
        </div>
      </div>
    </main>
  );
}