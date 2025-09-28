"use client"

export default function SuccessScreen() {
  return (
    <main className="min-h-screen w-full px-4 py-10 flex flex-col items-center justify-center text-center gap-4">
      <div className="flex items-center justify-center text-success" aria-hidden="true">
        <svg
          className="h-20 w-20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Success"
        >
          <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
          <path
            d="M8.5 12.5l2.1 2.1 4.9-4.9"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-semibold text-balance text-success">
        {"Congratulations! You are DBT-Ready."}
      </h1>

      {/* Body */}
      <p className="max-w-sm leading-relaxed text-pretty text-muted-foreground">
        {"No further action is needed. Your scholarship will be directly deposited to your seeded bank account"}
      </p>
    </main>
  )
}
