// src/components/LoginScreen.tsx

"use client";

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// You may need to add 'input' and 'label' from shadcn
// Run: npx shadcn@latest add input
// Run: npx shadcn@latest add label

export function LoginScreen() {
  const [name, setName] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <main className="min-h-svh flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <p className="text-muted-foreground mt-2">Please enter your name to continue.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="text-left">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Priya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </main>
  );
}