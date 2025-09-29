// src/context/UserContext.tsx

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our user data and context
type User = {
  name: string;
};

type UserContextType = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // On initial load, try to get the user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('dbt-app-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to save user to state and localStorage
  const login = (name: string) => {
    const newUser = { name };
    localStorage.setItem('dbt-app-user', JSON.stringify(newUser));
    setUser(newUser);
  };

  // Function to clear user from state and localStorage
  const logout = () => {
    localStorage.removeItem('dbt-app-user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook for easy access to the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}