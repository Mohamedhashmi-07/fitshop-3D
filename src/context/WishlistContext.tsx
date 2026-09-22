import React, { createContext, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { products } from '../data/products';
import { Product } from '../types';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateUser } = useAuth();
  const { addToast } = useToast();

  const wishlistIds = currentUser?.wishlist || [];

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistIds.includes(productId);
    },
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (!currentUser) {
        addToast({
          type: 'info',
          title: 'Login Required',
          message: 'Please log in to manage your wishlist.',
        });
        return;
      }

      const product = products.find((p) => p.id === productId);
      const isAlreadyIn = wishlistIds.includes(productId);
      const updatedWishlist = isAlreadyIn
        ? wishlistIds.filter((id) => id !== productId)
        : [...wishlistIds, productId];

      updateUser({ wishlist: updatedWishlist });

      addToast({
        type: isAlreadyIn ? 'info' : 'success',
        title: isAlreadyIn ? 'Removed from Wishlist' : 'Saved to Wishlist',
        message: product ? `${product.name} ${isAlreadyIn ? 'removed from' : 'added to'} wishlist.` : undefined,
      });
    },
    [currentUser, wishlistIds, updateUser, addToast]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
