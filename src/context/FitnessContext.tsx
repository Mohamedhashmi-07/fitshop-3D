import React, { createContext, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import {
  OfferStatus,
  UserChallengeProgress,
  ProductStreakChallenge,
  StreakChallengeStatus,
} from '../types';
import { challenges } from '../data/challenges';
import { products } from '../data/products';

interface FitnessContextType {
  // Legacy methods maintained for full backward compatibility
  getChallengeProgress: (challengeId: string) => UserChallengeProgress;
  simulateActivity: (challengeId: string, increment?: number) => void;
  unlockOffer: (productId: string, challengeId?: string) => void;
  getOfferStatus: (productId: string) => OfferStatus;
  isOfferUnlocked: (productId: string) => boolean;

  // New Comprehensive Streak System Methods
  getStreakChallenge: (productId: string) => ProductStreakChallenge;
  startStreakChallenge: (productId: string) => void;
  simulateTodayActivity: (productId: string, increment?: number) => void;
  simulateNextDay: (productId: string) => void;
  simulateMissedDay: (productId: string) => void;
  restartStreakChallenge: (productId: string) => void;
  unlockStreakOffer: (productId: string) => void;
  resetStreakChallenge: (productId: string) => void;
  getAllActiveChallenges: () => ProductStreakChallenge[];
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateUser } = useAuth();
  const { addToast } = useToast();

  // Helper to build a default ProductStreakChallenge definition from product data
  const createDefaultStreakChallenge = useCallback((productId: string): ProductStreakChallenge => {
    const prod = products.find((p) => p.id === productId);
    const req = prod?.fitnessOffer.requirement;
    const challengeDef = challenges.find((c) => c.id === req?.challengeId);

    const discountPercentage = prod?.fitnessOffer.discountPercentage || 20;
    const originalPrice = prod?.originalPrice || 12450;
    const activityType = req?.type || challengeDef?.activityType || 'walking';
    const dailyTarget =
      prod?.fitnessOffer.dailyTarget ||
      req?.dailyTarget ||
      challengeDef?.dailyTarget ||
      req?.target ||
      challengeDef?.target ||
      5000;
    const targetUnit =
      prod?.fitnessOffer.targetUnit ||
      req?.unit ||
      challengeDef?.unit ||
      'Steps';
    const streakRequiredDays =
      prod?.fitnessOffer.streakRequiredDays ||
      req?.streakRequiredDays ||
      challengeDef?.streakRequiredDays ||
      7;

    const isAlreadyUnlocked = currentUser?.unlockedOffers?.includes(productId) || false;

    return {
      productId,
      originalPrice,
      discountPercentage,
      activityType,
      dailyTarget,
      targetUnit,
      streakRequiredDays,
      currentStreak: 0,
      completedDays: 0,
      challengeStatus: isAlreadyUnlocked ? 'offer_unlocked' : 'not_started',
      todayCompleted: false,
      todayProgress: 0,
      offerUnlocked: isAlreadyUnlocked,
    };
  }, [currentUser]);

  // Fetch or initialize a user's streak challenge
  const getStreakChallenge = useCallback(
    (productId: string): ProductStreakChallenge => {
      const isAlreadyUnlocked = currentUser?.unlockedOffers?.includes(productId) || false;
      const existing = currentUser?.streakChallenges?.[productId];

      if (existing) {
        if (isAlreadyUnlocked && !existing.offerUnlocked) {
          return {
            ...existing,
            offerUnlocked: true,
            challengeStatus: 'offer_unlocked',
          };
        }
        return existing;
      }

      return createDefaultStreakChallenge(productId);
    },
    [currentUser, createDefaultStreakChallenge]
  );

  // Start a new challenge
  const startStreakChallenge = useCallback(
    (productId: string) => {
      if (!currentUser) {
        addToast({
          type: 'info',
          title: 'Login Required',
          message: 'Please log in to start fitness challenges.',
        });
        return;
      }

      const current = getStreakChallenge(productId);
      const updated: ProductStreakChallenge = {
        ...current,
        challengeStatus: 'today_pending',
        challengeStartDate: new Date().toISOString(),
        todayCompleted: false,
        todayProgress: 0,
        currentStreak: 0,
        completedDays: 0,
        offerUnlocked: false,
      };

      const updatedChallenges = {
        ...(currentUser.streakChallenges || {}),
        [productId]: updated,
      };

      updateUser({
        streakChallenges: updatedChallenges,
      });

      addToast({
        type: 'success',
        title: '🔥 Streak Challenge Started!',
        message: `Complete ${updated.dailyTarget.toLocaleString()} ${updated.targetUnit} daily for ${updated.streakRequiredDays} consecutive days to unlock ${updated.discountPercentage}% OFF!`,
      });
    },
    [currentUser, getStreakChallenge, updateUser, addToast]
  );

  // Simulate logging activity for today
  const simulateTodayActivity = useCallback(
    (productId: string, customIncrement?: number) => {
      if (!currentUser) {
        addToast({
          type: 'info',
          title: 'Login Required',
          message: 'Please log in to track your fitness activities.',
        });
        return;
      }

      const challenge = getStreakChallenge(productId);

      if (challenge.offerUnlocked) {
        addToast({
          type: 'info',
          title: 'Offer Already Unlocked!',
          message: `You already earned ${challenge.discountPercentage}% OFF on this product.`,
        });
        return;
      }

      if (challenge.challengeStatus === 'streak_reset') {
        addToast({
          type: 'error',
          title: 'Streak Broken',
          message: 'Please click "Start Again" to restart this streak challenge from Day 1.',
        });
        return;
      }

      if (challenge.todayCompleted) {
        addToast({
          type: 'info',
          title: "✓ Today's Activity Already Completed!",
          message: "You've hit today's target. Use 'Simulate Next Day' to advance to the next day.",
        });
        return;
      }

      // Determine default increment step
      const step =
        customIncrement ??
        (challenge.dailyTarget <= 10
          ? 1
          : challenge.dailyTarget <= 100
          ? 10
          : 1000);

      const remainingToday = challenge.dailyTarget - challenge.todayProgress;
      const actualIncrement = Math.min(step, remainingToday);
      const newTodayProgress = challenge.todayProgress + actualIncrement;
      const isTodayFinished = newTodayProgress >= challenge.dailyTarget;

      const newCurrentStreak = isTodayFinished
        ? challenge.currentStreak + 1
        : challenge.currentStreak;
      const newCompletedDays = isTodayFinished
        ? challenge.completedDays + 1
        : challenge.completedDays;

      const isStreakFinished = isTodayFinished && newCurrentStreak >= challenge.streakRequiredDays;

      let newStatus: StreakChallengeStatus = challenge.challengeStatus;
      if (isStreakFinished) {
        newStatus = 'streak_completed';
      } else if (isTodayFinished) {
        newStatus = 'today_completed';
      } else {
        newStatus = 'today_pending';
      }

      const updatedStreakItem: ProductStreakChallenge = {
        ...challenge,
        todayProgress: newTodayProgress,
        todayCompleted: isTodayFinished,
        currentStreak: newCurrentStreak,
        completedDays: newCompletedDays,
        challengeStatus: newStatus,
        lastCompletedDate: isTodayFinished ? new Date().toISOString().split('T')[0] : challenge.lastCompletedDate,
      };

      // Also increment cumulative user stats
      let distanceInc = 0;
      let stepsInc = 0;
      if (challenge.activityType === 'running' || challenge.activityType === 'cycling') {
        distanceInc = actualIncrement;
      } else if (challenge.activityType === 'walking') {
        stepsInc = actualIncrement;
        distanceInc = Math.round((actualIncrement / 1300) * 10) / 10;
      }

      const newRewards = currentUser.rewards + (isTodayFinished ? 100 : 25);
      const newBestStreak = Math.max(currentUser.bestStreak || 0, newCurrentStreak);

      const updatedStreakMap = {
        ...(currentUser.streakChallenges || {}),
        [productId]: updatedStreakItem,
      };

      updateUser({
        streakChallenges: updatedStreakMap,
        streaks: Math.max(currentUser.streaks || 0, newCurrentStreak),
        bestStreak: newBestStreak,
        totalSteps: currentUser.totalSteps + stepsInc,
        totalDistanceKm: Math.round((currentUser.totalDistanceKm + distanceInc) * 10) / 10,
        rewards: newRewards,
      });

      if (isStreakFinished) {
        addToast({
          type: 'success',
          title: `🎉 ${challenge.streakRequiredDays}-DAY STREAK COMPLETED!`,
          message: `You completed all ${challenge.streakRequiredDays} required days. Your ${challenge.discountPercentage}% OFF is ready to unlock!`,
        });
      } else if (isTodayFinished) {
        addToast({
          type: 'success',
          title: `✓ Day ${newCompletedDays} Completed!`,
          message: `Streak: ${newCurrentStreak}/${challenge.streakRequiredDays} Days. Keep it up!`,
        });
      } else {
        addToast({
          type: 'info',
          title: `+${actualIncrement.toLocaleString()} ${challenge.targetUnit} Logged!`,
          message: `Today: ${newTodayProgress.toLocaleString()} / ${challenge.dailyTarget.toLocaleString()} ${challenge.targetUnit}`,
        });
      }
    },
    [currentUser, getStreakChallenge, updateUser, addToast]
  );

  // Simulate advancing to the next day
  const simulateNextDay = useCallback(
    (productId: string) => {
      if (!currentUser) return;
      const challenge = getStreakChallenge(productId);

      if (challenge.offerUnlocked) {
        addToast({
          type: 'info',
          title: 'Offer Already Unlocked',
          message: 'This offer is already permanently unlocked.',
        });
        return;
      }

      if (challenge.challengeStatus === 'streak_completed') {
        addToast({
          type: 'info',
          title: 'Streak Completed',
          message: 'Your streak is complete! Click "Unlock Offer" to claim your discount.',
        });
        return;
      }

      // If today was not completed and streak was active (>0), advancing a day breaks the streak!
      if (!challenge.todayCompleted && challenge.currentStreak > 0) {
        const resetItem: ProductStreakChallenge = {
          ...challenge,
          previousStreak: challenge.currentStreak,
          currentStreak: 0,
          completedDays: 0,
          todayCompleted: false,
          todayProgress: 0,
          challengeStatus: 'streak_reset',
        };

        const updatedStreakMap = {
          ...(currentUser.streakChallenges || {}),
          [productId]: resetItem,
        };

        updateUser({ streakChallenges: updatedStreakMap });

        addToast({
          type: 'error',
          title: '⚠️ Streak Broken!',
          message: `Day ${challenge.currentStreak + 1} was missed without completing activity. Streak reset to 0.`,
        });
        return;
      }

      // Normal next-day advancement after completing today
      const nextDayItem: ProductStreakChallenge = {
        ...challenge,
        todayCompleted: false,
        todayProgress: 0,
        challengeStatus: 'today_pending',
      };

      const updatedStreakMap = {
        ...(currentUser.streakChallenges || {}),
        [productId]: nextDayItem,
      };

      updateUser({ streakChallenges: updatedStreakMap });

      addToast({
        type: 'info',
        title: `📅 Day ${challenge.currentStreak + 1} of ${challenge.streakRequiredDays} Started`,
        message: `Complete ${challenge.dailyTarget.toLocaleString()} ${challenge.targetUnit} today to continue your streak!`,
      });
    },
    [currentUser, getStreakChallenge, updateUser, addToast]
  );

  // Simulate missing a day (Streak Broken test)
  const simulateMissedDay = useCallback(
    (productId: string) => {
      if (!currentUser) return;
      const challenge = getStreakChallenge(productId);

      const brokenItem: ProductStreakChallenge = {
        ...challenge,
        previousStreak: challenge.currentStreak || challenge.completedDays || 1,
        currentStreak: 0,
        completedDays: 0,
        todayCompleted: false,
        todayProgress: 0,
        challengeStatus: 'streak_reset',
      };

      const updatedStreakMap = {
        ...(currentUser.streakChallenges || {}),
        [productId]: brokenItem,
      };

      updateUser({ streakChallenges: updatedStreakMap });

      addToast({
        type: 'error',
        title: '⚠️ Streak Broken!',
        message: `You missed a required day. Your ${challenge.streakRequiredDays}-day streak has been reset.`,
      });
    },
    [currentUser, getStreakChallenge, updateUser, addToast]
  );

  // Restart after a streak reset or start fresh
  const restartStreakChallenge = useCallback(
    (productId: string) => {
      if (!currentUser) return;
      const challenge = getStreakChallenge(productId);

      const freshItem: ProductStreakChallenge = {
        ...challenge,
        currentStreak: 0,
        completedDays: 0,
        todayCompleted: false,
        todayProgress: 0,
        challengeStatus: 'today_pending',
        challengeStartDate: new Date().toISOString(),
      };

      const updatedStreakMap = {
        ...(currentUser.streakChallenges || {}),
        [productId]: freshItem,
      };

      updateUser({ streakChallenges: updatedStreakMap });

      addToast({
        type: 'info',
        title: 'Challenge Restarted',
        message: `Starting fresh from Day 1 of ${challenge.streakRequiredDays}. Keep your daily momentum!`,
      });
    },
    [currentUser, getStreakChallenge, updateUser, addToast]
  );

  // Unlock Offer after Streak Completed
  const unlockStreakOffer = useCallback(
    (productId: string) => {
      if (!currentUser) {
        addToast({
          type: 'info',
          title: 'Login Required',
          message: 'Please log in to unlock offers.',
        });
        return;
      }

      const prod = products.find((p) => p.id === productId);
      const challenge = getStreakChallenge(productId);
      const discount = prod?.fitnessOffer.discountPercentage || challenge.discountPercentage || 20;

      const existingUnlocked = currentUser.unlockedOffers || [];
      const updatedUnlocked = Array.from(new Set([...existingUnlocked, productId]));

      const unlockedItem: ProductStreakChallenge = {
        ...challenge,
        challengeStatus: 'offer_unlocked',
        offerUnlocked: true,
        unlockedDate: new Date().toISOString(),
      };

      const updatedStreakMap = {
        ...(currentUser.streakChallenges || {}),
        [productId]: unlockedItem,
      };

      updateUser({
        unlockedOffers: updatedUnlocked,
        streakChallenges: updatedStreakMap,
      });

      addToast({
        type: 'success',
        title: `✓ ${discount}% OFF UNLOCKED!`,
        message: `Discount applied to ${prod?.name || 'product'}. Add to cart to shop with savings!`,
      });
    },
    [currentUser, getStreakChallenge, updateUser, addToast]
  );

  // Reset demo challenge back to clean state
  const resetStreakChallenge = useCallback(
    (productId: string) => {
      if (!currentUser) return;
      const challenge = getStreakChallenge(productId);

      const resetItem: ProductStreakChallenge = {
        ...challenge,
        currentStreak: 0,
        completedDays: 0,
        challengeStatus: 'not_started',
        todayCompleted: false,
        todayProgress: 0,
        offerUnlocked: false,
      };

      const updatedUnlocked = (currentUser.unlockedOffers || []).filter((id) => id !== productId);
      const updatedStreakMap = {
        ...(currentUser.streakChallenges || {}),
        [productId]: resetItem,
      };

      updateUser({
        unlockedOffers: updatedUnlocked,
        streakChallenges: updatedStreakMap,
      });

      addToast({
        type: 'info',
        title: 'Demo Challenge Reset',
        message: 'This challenge has been reset to pristine initial state for testing.',
      });
    },
    [currentUser, getStreakChallenge, updateUser, addToast]
  );

  // Helper for fitness rewards dashboard to list all active streak challenges
  const getAllActiveChallenges = useCallback((): ProductStreakChallenge[] => {
    const productStreakChallenges: ProductStreakChallenge[] = [];
    products.forEach((prod) => {
      if (prod.fitnessOffer) {
        productStreakChallenges.push(getStreakChallenge(prod.id));
      }
    });
    return productStreakChallenges;
  }, [getStreakChallenge]);

  // Backward compatibility methods
  const getChallengeProgress = useCallback(
    (challengeId: string): UserChallengeProgress => {
      const challengeDef = challenges.find((c) => c.id === challengeId);
      const target = challengeDef ? challengeDef.target : 5;

      if (!currentUser || !currentUser.challenges || !currentUser.challenges[challengeId]) {
        return {
          challengeId,
          current: 0,
          target,
          isCompleted: false,
          isUnlocked: false,
        };
      }
      return currentUser.challenges[challengeId];
    },
    [currentUser]
  );

  const simulateActivity = useCallback(
    (challengeId: string, customIncrement?: number) => {
      const challengeDef = challenges.find((c) => c.id === challengeId);
      if (challengeDef?.associatedProductId) {
        simulateTodayActivity(challengeDef.associatedProductId, customIncrement);
      }
    },
    [simulateTodayActivity]
  );

  const unlockOffer = useCallback(
    (productId: string) => {
      unlockStreakOffer(productId);
    },
    [unlockStreakOffer]
  );

  const getOfferStatus = useCallback(
    (productId: string): OfferStatus => {
      if (!currentUser) return 'locked';

      if (currentUser.unlockedOffers && currentUser.unlockedOffers.includes(productId)) {
        return 'unlocked';
      }

      const streakItem = currentUser.streakChallenges?.[productId];
      if (streakItem) {
        if (streakItem.offerUnlocked || streakItem.challengeStatus === 'offer_unlocked') {
          return 'unlocked';
        }
        if (
          streakItem.challengeStatus === 'streak_completed' ||
          streakItem.currentStreak >= streakItem.streakRequiredDays
        ) {
          return 'activity_completed';
        }
      }

      const product = products.find((p) => p.id === productId);
      if (!product) return 'locked';

      const challengeId = product.fitnessOffer.requirement.challengeId;
      const progress = currentUser.challenges?.[challengeId];
      if (progress?.isUnlocked) return 'unlocked';
      if (progress?.isCompleted) return 'activity_completed';

      return 'locked';
    },
    [currentUser]
  );

  const isOfferUnlocked = useCallback(
    (productId: string): boolean => {
      return getOfferStatus(productId) === 'unlocked';
    },
    [getOfferStatus]
  );

  return (
    <FitnessContext.Provider
      value={{
        getChallengeProgress,
        simulateActivity,
        unlockOffer,
        getOfferStatus,
        isOfferUnlocked,
        getStreakChallenge,
        startStreakChallenge,
        simulateTodayActivity,
        simulateNextDay,
        simulateMissedDay,
        restartStreakChallenge,
        unlockStreakOffer,
        resetStreakChallenge,
        getAllActiveChallenges,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = (): FitnessContextType => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
