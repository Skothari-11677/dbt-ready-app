// src/components/ContactForm.tsx

"use client";

import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle } from 'lucide-react';

export function ContactForm() {
  // IMPORTANT: Replace 'your_unique_id' with the actual ID from your Formspree dashboard
  const [state, handleSubmit] = useForm("https://formspree.io/f/mdkwewkq");

  // If the form was submitted successfully, show a thank you message
  if (state.succeeded) {
    return (
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-2xl font-semibold">Thank you for your message!</h2>
        <p className="text-muted-foreground mt-2">We'll get back to you as soon as possible.</p>
      </div>
    );
  }

  // Otherwise, show the form
  return (
    <div className="mx-auto max-w-xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Contact Support</h1>
        <p className="text-muted-foreground mt-2">
          Have a question or need help? Fill out the form below.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Your Email Address</Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-sm text-destructive mt-1"
          />
        </div>
        <div>
          <Label htmlFor="message">Your Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-sm text-destructive mt-1"
          />
        </div>
        <Button type="submit" disabled={state.submitting} className="w-full">
          {state.submitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}