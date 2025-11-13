import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-expo';

export interface User {
  clerk_id: string;
  name: string;
  email: string;
  phone?: string;
  liked?: {
    tourism?: any[];
    restaurants?: any[];
    hotels?: any[];
  };
  [key: string]: any;
}

interface UserContextValue {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  logout: () => void;
  likes: any;
  fetchUserLikes: (clerkId: string) => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<any>({});

  const { isSignedIn, userId } = useAuth();
  // const clerkUser = useClerkUser(); // Not used

  // Automatically fetch user from backend when Clerk session is active
  useEffect(() => {
    const fetchOrRegisterUser = async () => {
      if (isSignedIn && userId) {
        setIsLoggedIn(true);
        setLoading(true);
        setError(null);
        try {
          // Try to fetch user from backend
          const res = await fetch(`http://192.168.100.2:8000/api/users/${userId}`);
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            // User not found, register user in backend
            // Try to get Clerk user info from window.Clerk or fallback to minimal info
            let name = '';
            let email = '';
            try {
              // @ts-ignore
              const clerkUser = window.Clerk?.user;
              if (clerkUser) {
                name = clerkUser.fullName || clerkUser.username || '';
                email = clerkUser.primaryEmailAddress?.emailAddress || '';
              }
            } catch {}
            // Fallback: try to get from localStorage or leave blank
            await fetch('http://192.168.100.2:8000/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                clerk_id: userId,
                name,
                email
              })
            });
            // Re-fetch user after registration
            const res2 = await fetch(`http://192.168.100.2:8000/api/users/${userId}`);
            const data2 = await res2.json();
            if (data2.success && data2.user) {
              setUser(data2.user);
            } else {
              setUser(null);
            }
          }
        } catch (err: any) {
          setError(err.message || 'Unknown error');
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    fetchOrRegisterUser();
  }, [isSignedIn, userId]);

  const fetchUserLikes = useCallback(async (clerkId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://192.168.100.2:8000/api/users/${clerkId}/likes`);
      const data = await res.json();
      if (data.success && data.liked) {
        setLikes(data.liked);
      } else {
        setLikes({});
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setLikes({});
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setLikes({});
    // Clerk logout should be handled by ClerkProvider or auth screen
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, loading, error, logout, likes, fetchUserLikes }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
};
