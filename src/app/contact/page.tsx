// src/app/contact/page.tsx

import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-svh flex items-center justify-center px-4 py-8">
      <ContactForm />
    </main>
  );
}