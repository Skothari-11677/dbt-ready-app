// src/components/Footer.tsx

import Link from 'next/link'; // Use the special Link component for fast navigation

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
        <p>
          A prototype for the Smart India Hackathon. &copy; {new Date().getFullYear()}
        </p>
        <Link href="/faq" className="mt-2 inline-block hover:text-primary underline underline-offset-4">
          Frequently Asked Questions
        </Link>
      </div>
    </footer>
  );
}