import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '../types';
import {
  initializeStorage,
  getCurrentUserId,
  setCurrentUserId,
  saveUser,
  getUserByEmail,
  getUserById,
} from '../utils/storage';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (userData: Partial<User>) => { success: boolean; error?: string };
  logout: () => void;
  getCurrentUser: () => User | null;
  updateUser: (updatedData: Partial<User>) => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial load
  useEffect(() => {
    initializeStorage();

    const hasInitializedSession = localStorage.getItem('fitshop_session_initialized');
    let activeId = getCurrentUserId();

    if (!hasInitializedSession && !activeId) {
      // Default to Mohamed for initial interactive demo
      activeId = 'user-mohamed';
      setCurrentUserId('user-mohamed');
      localStorage.setItem('fitshop_session_initialized', 'true');
    }

    if (activeId) {
      const user = getUserById(activeId);
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }

    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const user = getUserByEmail(email);
    if (!user) {
      return { success: false, error: 'No account found with this email address.' };
    }
    if (user.password && user.password !== password) {
      return { success: false, error: 'Incorrect password. (Try 123456 for demo accounts)' };
    }

    setCurrentUserId(user.id);
    setCurrentUser(user);
    return { success: true };
  }, []);

  const signup = useCallback((data: Partial<User>) => {
    if (!data.email || !data.name) {
      return { success: false, error: 'Name and Email are required.' };
    }

    const existing = getUserByEmail(data.email);
    if (existing) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUserId = 'user-' + Date.now().toString(36);
    const newUser: User = {
      id: newUserId,
      name: data.name,
      email: data.email,
      password: data.password || '123456',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
      profile: {
        bio: 'FitShop enthusiastic shopper.',
        location: 'India',
        joinedDate: 'Mar 2026',
      },
      fitnessGoals: data.fitnessGoals || 'Improve general fitness & save on gear',
      activityPreferences: data.activityPreferences || ['Running', 'Walking'],
      cart: [],
      wishlist: [],
      orders: [],
      challenges: {
        'challenge-stepz-5k': {
          challengeId: 'challenge-stepz-5k',
          current: 0,
          target: 5,
          isCompleted: false,
          isUnlocked: false,
        },
        'challenge-10k-steps': {
          challengeId: 'challenge-10k-steps',
          current: 0,
          target: 10000,
          isCompleted: false,
          isUnlocked: false,
        },
      },
      streaks: 1,
      rewards: 100,
      totalSteps: 1200,
      totalDistanceKm: 1.0,
      unlockedOffers: [],
      totalSavings: 0,
    };

    saveUser(newUser);
    setCurrentUserId(newUserId);
    setCurrentUser(newUser);

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    // CRITICAL: Clear only current user ID, do NOT delete cart, wishlist, fitness data
    setCurrentUserId(null);
    setCurrentUser(null);
  }, []);

  const updateUser = useCallback((updatedData: Partial<User>) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const updated: User = {
        ...prev,
        ...updatedData,
        profile: {
          ...prev.profile,
          ...(updatedData.profile || {}),
        },
      };
      saveUser(updated);
      return updated;
    });
  }, []);

  const switchUser = useCallback((userId: string) => {
    const user = getUserById(userId);
    if (user) {
      setCurrentUserId(userId);
      setCurrentUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        getCurrentUser: () => currentUser,
        updateUser,
        switchUser,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
