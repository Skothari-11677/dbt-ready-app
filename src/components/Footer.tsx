// src/components/Footer.tsx

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
        <p>A prototype for the Smart India Hackathon. &copy; {new Date().getFullYear()}</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/faq" className="hover:text-primary underline underline-offset-4">
            FAQs
          </Link>
          {/* Add a separator */}
          <span>|</span> 
          {/* Add the new contact link */}
          <Link href="/contact" className="hover:text-primary underline underline-offset-4">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
}