// src/app/page.tsx

"use client"; // This page now needs to be a client component to check the user state

import { useUser } from '@/context/UserContext';
import { WelcomeHero } from '@/components/welcome-hero';
import { LoginScreen } from '@/components/LoginScreen';

export default function HomePage() {
  const { user } = useUser();

  // If there is no user, show the Login screen.
  // Otherwise, show the main Welcome Hero.
  return user ? <WelcomeHero /> : <LoginScreen />;
}