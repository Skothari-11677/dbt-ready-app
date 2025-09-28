"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

type ActionNeededScreenProps = {
  onDownloadPdf?: () => void
  onFindBank?: () => void
}

export default function ActionNeededScreen({ onDownloadPdf, onFindBank }: ActionNeededScreenProps) {
  return (
    <main className="min-h-svh px-4 py-8">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        {/* Warning icon */}
        <div className="mb-4">
          <AlertTriangle className="h-14 w-14 text-destructive" aria-hidden="true" />
          <span className="sr-only">Warning</span>
        </div>

        {/* Heading */}
        <h1 className="text-balance text-2xl font-semibold text-destructive">Action Needed: Account Not Seeded</h1>

        {/* Body text */}
        <p className="mt-3 text-pretty text-sm text-muted-foreground">{"Follow these steps to fix this:"}</p>

        {/* Numbered steps */}
        <ol className="mt-6 w-full space-y-3">
          {/* Step 1 */}
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">
              1
            </span>
            <span className="flex-1 text-left text-sm">Download the Bank Consent Form</span>
            <Button size="sm" onClick={onDownloadPdf}>
              {"Download PDF"}
            </Button>
          </li>

          {/* Step 2 */}
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">
              2
            </span>
            <span className="flex-1 text-left text-sm">Visit your nearest bank branch</span>
            <Button size="sm" onClick={onFindBank}>
              {"Find My Bank"}
            </Button>
          </li>

          {/* Step 3 */}
          <li className="flex items-center gap-3 rounded-md border border-border p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">
              3
            </span>
            <span className="flex-1 text-left text-sm">Submit the form to the bank official</span>
            {/* no button for step 3 */}
          </li>
        </ol>
      </div>
    </main>
  )
}
