import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useFitness } from './FitnessContext';
import { useToast } from './ToastContext';
import { CartItem, Product } from '../types';
import { calculateDiscountedPrice, calculateSavings } from '../utils/pricing';

interface CartTotals {
  totalOriginalPrice: number;
  totalFitnessDiscount: number;
  finalTotal: number;
  totalSavings: number;
  itemCount: number;
}

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateUser } = useAuth();
  const { isOfferUnlocked } = useFitness();
  const { addToast } = useToast();

  const userCart = currentUser?.cart || [];

  // Recalculate dynamic prices dynamically according to real-time unlock status
  const items: CartItem[] = useMemo(() => {
    return userCart.map((item) => {
      const unlocked = isOfferUnlocked(item.productId);
      const discountPct = unlocked ? item.product.fitnessOffer.discountPercentage : 0;
      const finalPrice = calculateDiscountedPrice(item.product.originalPrice, discountPct);
      const savings = calculateSavings(item.product.originalPrice, finalPrice);

      return {
        ...item,
        appliedDiscountPercentage: discountPct,
        finalPrice,
        savings,
      };
    });
  }, [userCart, isOfferUnlocked]);

  // Compute live totals
  const totals: CartTotals = useMemo(() => {
    let totalOriginalPrice = 0;
    let finalTotal = 0;
    let totalSavings = 0;
    let itemCount = 0;

    items.forEach((item) => {
      const qty = item.quantity;
      totalOriginalPrice += item.originalPrice * qty;
      finalTotal += item.finalPrice * qty;
      totalSavings += item.savings * qty;
      itemCount += qty;
    });

    return {
      totalOriginalPrice: Math.round(totalOriginalPrice * 100) / 100,
      totalFitnessDiscount: Math.round(totalSavings * 100) / 100,
      finalTotal: Math.round(finalTotal * 100) / 100,
      totalSavings: Math.round(totalSavings * 100) / 100,
      itemCount,
    };
  }, [items]);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      if (!currentUser) {
        addToast({
          type: 'info',
          title: 'Login Required',
          message: 'Please log in to add items to your cart.',
        });
        return;
      }

      const unlocked = isOfferUnlocked(product.id);
      const discountPct = unlocked ? product.fitnessOffer.discountPercentage : 0;
      const finalPrice = calculateDiscountedPrice(product.originalPrice, discountPct);
      const savings = calculateSavings(product.originalPrice, finalPrice);

      const existingIndex = userCart.findIndex((i) => i.productId === product.id);
      let updatedCart: CartItem[];

      if (existingIndex > -1) {
        updatedCart = userCart.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: item.quantity + quantity,
                appliedDiscountPercentage: discountPct,
                finalPrice,
                savings,
              }
            : item
        );
      } else {
        const newItem: CartItem = {
          productId: product.id,
          product,
          quantity,
          appliedDiscountPercentage: discountPct,
          originalPrice: product.originalPrice,
          finalPrice,
          savings,
        };
        updatedCart = [...userCart, newItem];
      }

      updateUser({ cart: updatedCart });

      addToast({
        type: 'success',
        title: 'Added to Cart',
        message: `${product.name} (${quantity}) added to your cart.`,
      });
    },
    [currentUser, userCart, isOfferUnlocked, updateUser, addToast]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      if (!currentUser) return;
      const updatedCart = userCart.filter((i) => i.productId !== productId);
      updateUser({ cart: updatedCart });
      addToast({
        type: 'info',
        title: 'Removed from Cart',
        message: 'Item removed from your shopping cart.',
      });
    },
    [currentUser, userCart, updateUser, addToast]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (!currentUser) return;
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      const updatedCart = userCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      updateUser({ cart: updatedCart });
    },
    [currentUser, userCart, updateUser, removeFromCart]
  );

  const clearCart = useCallback(() => {
    if (!currentUser) return;
    updateUser({ cart: [] });
  }, [currentUser, updateUser]);

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
