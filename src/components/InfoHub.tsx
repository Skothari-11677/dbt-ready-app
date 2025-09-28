// src/components/InfoHub.tsx

import { getFaqs } from '@/lib/data'; // Import our data-fetching function
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// You may need to add the 'accordion' component from shadcn
// If you see an error, run: npx shadcn@latest add accordion

// This is an async Server Component - it can fetch data directly
export async function InfoHub() {
  const faqs = await getFaqs(); // 1. Fetch the data

  return (
    <main className="min-h-svh px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-2">
            Find answers to common questions about Aadhaar Seeding for scholarships.
          </p>
        </header>

        {/* 2. Check if there are any FAQs */}
        {faqs.length === 0 ? (
          <p className="text-center">No FAQs found. Please check back later.</p>
        ) : (
          // 3. If FAQs exist, display them in an accordion
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem value={`item-${faq.id}`} key={faq.id}>
                <AccordionTrigger>{faq.title_en}</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">{faq.body_en}</p>
                  <hr/>
                  <h4 className="font-semibold mt-4 mb-1">{faq.title_hi}</h4>
                  <p>{faq.body_hi}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </main>
  );
}