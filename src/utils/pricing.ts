/**
 * FitShop Pricing Engine
 *
 * CRITICAL RULE:
 * `originalPrice` is NEVER overwritten.
 * Discounted price and customer savings are calculated dynamically.
 */

export interface PricingBreakdown {
  originalPrice: number;
  discountPercentage: number;
  isUnlocked: boolean;
  effectivePrice: number;
  savings: number;
}

/**
 * Calculates the discounted price given original price and percentage.
 * Formula: originalPrice - (originalPrice * discountPercentage / 100)
 */
export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
): number => {
  if (!originalPrice || originalPrice <= 0) return 0;
  if (!discountPercentage || discountPercentage <= 0) return originalPrice;
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const result = originalPrice - discountAmount;
  // Round to 2 decimal places to avoid floating point anomalies (e.g. 6599.40)
  return Math.round(result * 100) / 100;
};

/**
 * Calculates the exact customer savings.
 * Formula: originalPrice - discountedPrice
 */
export const calculateSavings = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (!originalPrice || !discountedPrice || discountedPrice >= originalPrice) return 0;
  return Math.round((originalPrice - discountedPrice) * 100) / 100;
};

/**
 * Calculates full price breakdown for a product based on whether its offer is unlocked.
 */
export const getProductPricing = (
  originalPrice: number,
  discountPercentage: number,
  isUnlocked: boolean
): PricingBreakdown => {
  const safeOriginal = typeof originalPrice === 'number' ? originalPrice : 0;
  const safeDiscount = typeof discountPercentage === 'number' ? discountPercentage : 0;

  if (!isUnlocked || safeDiscount <= 0) {
    return {
      originalPrice: safeOriginal,
      discountPercentage: safeDiscount,
      isUnlocked: false,
      effectivePrice: safeOriginal,
      savings: 0,
    };
  }

  const effectivePrice = calculateDiscountedPrice(safeOriginal, safeDiscount);
  const savings = calculateSavings(safeOriginal, effectivePrice);

  return {
    originalPrice: safeOriginal,
    discountPercentage: safeDiscount,
    isUnlocked: true,
    effectivePrice,
    savings,
  };
};

/**
 * Formats a number to Indian Rupee (INR) representation.
 * E.g., 10999 -> "₹10,999" or 6599.4 -> "₹6,599.40"
 */
export const formatINR = (amount: number, showDecimalsIfAny: boolean = true): string => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }
  const hasDecimals = amount % 1 !== 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimalsIfAny && hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
