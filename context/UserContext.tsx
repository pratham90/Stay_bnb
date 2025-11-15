import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../utils/api';
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
          const { data } = await api.get(`/api/users/${userId}`);
            console.log('UserProvider: fetched user from backend', data);
          if (data.success && data.user) {
            setUser(data.user);
            console.log('UserProvider: user set from backend', data.user);
          } else {
            // User not found, register user in backend with entered name/email
            let name = '';
            let email = '';
            try {
              name = localStorage.getItem('signup_name') || '';
              email = localStorage.getItem('signup_email') || '';
            } catch {}
            if (userId && name && email) {
              await api.post('/api/users', {
                clerk_id: userId,
                name,
                email
              });
              console.log('UserProvider: registered user in backend', { clerk_id: userId, name, email });
              // Clear localStorage after registration
              try {
                localStorage.removeItem('signup_name');
                localStorage.removeItem('signup_email');
              } catch {}
              // Re-fetch user after registration
              const { data: data2 } = await api.get(`/api/users/${userId}`);
              console.log('UserProvider: re-fetched user after registration', data2);
              if (data.success && data.user) {
                setUser(data.user);
                console.log('UserProvider: user set from backend', data.user);
              } else {
                setUser(null);
                console.log('UserProvider: user not found in backend');
              }
              setUser(null);
              console.log('UserProvider: missing name/email for registration');
            }
          }
        } catch (err: any) {
          setError(err.message || 'Unknown error');
          setUser(null);
            console.log('UserProvider: error fetching/registering user', err);
        } finally {
          setLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
          console.log('UserProvider: not signed in, user set to null');
      }
    };
    fetchOrRegisterUser();
  }, [isSignedIn, userId]);

  const fetchUserLikes = useCallback(async (clerkId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/users/${clerkId}/likes`);
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
