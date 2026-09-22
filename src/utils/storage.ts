import type { User, Order, CartItem, UserChallengeProgress } from '../types';
import { initialUsers } from '../data/demoUsers';

export const STORAGE_USERS_KEY = 'fitshop_users';
export const STORAGE_CURRENT_USER_ID_KEY = 'fitshop_current_user_id';
export const STORAGE_USER_DATA_KEY = 'fitshop_user_data';

/**
 * Checks if browser localStorage is available in the current runtime.
 */
const isStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
};

/**
 * Initializes localStorage with default demo accounts if not already present.
 */
export const initializeStorage = (): void => {
  if (!isStorageAvailable()) return;

  try {
    const existingUsers = localStorage.getItem(STORAGE_USERS_KEY);
    if (!existingUsers || existingUsers === 'null' || existingUsers === 'undefined' || existingUsers === '{}') {
      const usersMap: Record<string, User> = {};
      initialUsers.forEach((demoUser) => {
        usersMap[demoUser.id] = { ...demoUser };
      });
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(usersMap));
    }
  } catch (err) {
    console.error('Error initializing FitShop storage:', err);
  }
};

/**
 * Fetches all registered users as a dictionary indexed by user ID.
 */
export const getAllUsers = (): Record<string, User> => {
  if (!isStorageAvailable()) return {};

  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw || raw === 'null' || raw === 'undefined') {
      initializeStorage();
      const fresh = localStorage.getItem(STORAGE_USERS_KEY);
      if (fresh && fresh !== 'null' && fresh !== 'undefined') {
        const parsed = JSON.parse(fresh);
        return parsed && typeof parsed === 'object' ? parsed : {};
      }
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (err) {
    console.error('Error reading users from storage:', err);
    return {};
  }
};

/**
 * Retrieves the currently active user ID.
 */
export const getCurrentUserId = (): string | null => {
  if (!isStorageAvailable()) return null;

  try {
    const val = localStorage.getItem(STORAGE_CURRENT_USER_ID_KEY);
    if (!val || val === 'null' || val === 'undefined') return null;
    return val;
  } catch {
    return null;
  }
};

/**
 * Sets active user ID session and keeps fitshop_user_data in sync.
 */
export const setCurrentUserId = (userId: string | null): void => {
  if (!isStorageAvailable()) return;

  try {
    if (userId) {
      localStorage.setItem(STORAGE_CURRENT_USER_ID_KEY, userId);
      const user = getUserById(userId);
      if (user) {
        localStorage.setItem(STORAGE_USER_DATA_KEY, JSON.stringify(user));
      }
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER_ID_KEY);
      localStorage.removeItem(STORAGE_USER_DATA_KEY);
    }
  } catch (err) {
    console.error('Error setting current user ID:', err);
  }
};

/**
 * Saves or updates a single user record without affecting any other customer.
 * Keeps fitshop_user_data in sync if this is the active user.
 */
export const saveUser = (user: User): void => {
  if (!isStorageAvailable() || !user || !user.id) return;

  try {
    const users = getAllUsers();
    users[user.id] = user;
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    const currentId = getCurrentUserId();
    if (currentId === user.id) {
      localStorage.setItem(STORAGE_USER_DATA_KEY, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Error saving user to storage:', err);
  }
};

/**
 * Retrieves a user by their unique ID.
 */
export const getUserById = (userId: string): User | null => {
  if (!userId) return null;
  const users = getAllUsers();
  return users[userId] || null;
};

/**
 * Retrieves a user by their email address (case-insensitive).
 */
export const getUserByEmail = (email: string): User | null => {
  if (!email) return null;
  const users = getAllUsers();
  const normalizedEmail = email.toLowerCase().trim();
  const matchedUser = Object.values(users).find(
    (existingUser) =>
      existingUser &&
      existingUser.email &&
      existingUser.email.toLowerCase().trim() === normalizedEmail
  );
  return matchedUser || null;
};

/**
 * Retrieves currently active user directly.
 */
export const getCurrentUser = (): User | null => {
  const activeId = getCurrentUserId();
  if (!activeId) return null;
  return getUserById(activeId);
};

/**
 * Retrieves the user's cart from storage.
 */
export const getUserCart = (userId: string): CartItem[] => {
  const targetUser = getUserById(userId);
  return Array.isArray(targetUser?.cart) ? targetUser.cart : [];
};

/**
 * Saves the user's cart in storage.
 */
export const saveUserCart = (userId: string, cart: CartItem[]): void => {
  const targetUser = getUserById(userId);
  if (!targetUser) return;
  targetUser.cart = Array.isArray(cart) ? cart : [];
  saveUser(targetUser);
};

/**
 * Retrieves the user's wishlist from storage.
 */
export const getUserWishlist = (userId: string): string[] => {
  const targetUser = getUserById(userId);
  return Array.isArray(targetUser?.wishlist) ? targetUser.wishlist : [];
};

/**
 * Saves the user's wishlist in storage.
 */
export const saveUserWishlist = (userId: string, wishlist: string[]): void => {
  const targetUser = getUserById(userId);
  if (!targetUser) return;
  targetUser.wishlist = Array.isArray(wishlist) ? wishlist : [];
  saveUser(targetUser);
};

/**
 * Retrieves all orders for a specific user from storage.
 */
export const getUserOrders = (userId: string): Order[] => {
  const targetUser = getUserById(userId);
  return Array.isArray(targetUser?.orders) ? targetUser.orders : [];
};

/**
 * Appends a new confirmed order to user's history, updates total savings, and clears cart.
 */
export const addUserOrder = (userId: string, newOrder: Order): void => {
  const targetUser = getUserById(userId);
  if (!targetUser || !newOrder) return;
  const currentOrders = Array.isArray(targetUser.orders) ? targetUser.orders : [];
  targetUser.orders = [newOrder, ...currentOrders];
  const orderSavings = typeof newOrder.totalSavings === 'number' ? newOrder.totalSavings : 0;
  targetUser.totalSavings = Math.round(((targetUser.totalSavings || 0) + orderSavings) * 100) / 100;
  targetUser.cart = [];
  saveUser(targetUser);
};

/**
 * Updates a challenge progress record for a user in storage.
 */
export const saveUserChallenge = (
  userId: string,
  challengeId: string,
  progress: UserChallengeProgress
): void => {
  const targetUser = getUserById(userId);
  if (!targetUser || !challengeId) return;
  if (!targetUser.challenges || typeof targetUser.challenges !== 'object') {
    targetUser.challenges = {};
  }
  targetUser.challenges[challengeId] = progress;
  saveUser(targetUser);
};

/**
 * Retrieves the total savings generated by a user.
 */
export const getUserSavings = (userId: string): number => {
  const targetUser = getUserById(userId);
  return targetUser?.totalSavings || 0;
};
