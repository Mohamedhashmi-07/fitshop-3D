import React, { createContext, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { OfferStatus, UserChallengeProgress } from '../types';
import { challenges } from '../data/challenges';
import { products } from '../data/products';

interface FitnessContextType {
  getChallengeProgress: (challengeId: string) => UserChallengeProgress;
  simulateActivity: (challengeId: string, increment?: number) => void;
  unlockOffer: (productId: string, challengeId: string) => void;
  getOfferStatus: (productId: string) => OfferStatus;
  isOfferUnlocked: (productId: string) => boolean;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateUser } = useAuth();
  const { addToast } = useToast();

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
      if (!currentUser) {
        addToast({
          type: 'info',
          title: 'Login Required',
          message: 'Please log in to track your fitness activities.',
        });
        return;
      }

      const challengeDef = challenges.find((c) => c.id === challengeId);
      if (!challengeDef) return;

      const increment = customIncrement ?? challengeDef.stepIncrement;
      const currentProgress = getChallengeProgress(challengeId);
      const newCurrent = Math.min(challengeDef.target, currentProgress.current + increment);
      const isNowCompleted = newCurrent >= challengeDef.target;

      const updatedProgress: UserChallengeProgress = {
        ...currentProgress,
        current: newCurrent,
        target: challengeDef.target,
        isCompleted: isNowCompleted,
      };

      const updatedChallenges = {
        ...(currentUser.challenges || {}),
        [challengeId]: updatedProgress,
      };

      // Also increment cumulative stats
      let distanceInc = 0;
      let stepsInc = 0;
      if (challengeDef.activityType === 'running' || challengeDef.activityType === 'cycling') {
        distanceInc = increment;
      } else if (challengeDef.activityType === 'walking') {
        stepsInc = increment;
        distanceInc = Math.round((increment / 1300) * 10) / 10;
      }

      const newRewards = currentUser.rewards + (isNowCompleted ? 150 : 25);

      updateUser({
        challenges: updatedChallenges,
        totalDistanceKm: Math.round((currentUser.totalDistanceKm + distanceInc) * 10) / 10,
        totalSteps: currentUser.totalSteps + stepsInc,
        rewards: newRewards,
      });

      if (isNowCompleted && !currentProgress.isCompleted) {
        addToast({
          type: 'success',
          title: '🎉 Activity Completed!',
          message: `${challengeDef.title} finished! Your ${challengeDef.discountPercentage}% OFF is ready to unlock.`,
        });
      } else {
        addToast({
          type: 'info',
          title: `+${increment} ${challengeDef.unit} Logged!`,
          message: `Progress: ${newCurrent}/${challengeDef.target} ${challengeDef.unit}`,
        });
      }
    },
    [currentUser, getChallengeProgress, updateUser, addToast]
  );

  const unlockOffer = useCallback(
    (productId: string, challengeId: string) => {
      if (!currentUser) {
        addToast({
          type: 'info',
          title: 'Login Required',
          message: 'Please log in to unlock offers.',
        });
        return;
      }

      const prod = products.find((p) => p.id === productId);
      const challengeDef = challenges.find((c) => c.id === challengeId);
      const discount = prod?.fitnessOffer.discountPercentage || challengeDef?.discountPercentage || 20;

      const existingUnlocked = currentUser.unlockedOffers || [];
      const updatedUnlocked = Array.from(new Set([...existingUnlocked, productId]));

      const currentProg = getChallengeProgress(challengeId);
      const updatedProg: UserChallengeProgress = {
        ...currentProg,
        isCompleted: true,
        isUnlocked: true,
      };

      const updatedChallenges = {
        ...(currentUser.challenges || {}),
        [challengeId]: updatedProg,
      };

      updateUser({
        unlockedOffers: updatedUnlocked,
        challenges: updatedChallenges,
      });

      addToast({
        type: 'success',
        title: `✓ ${discount}% OFF UNLOCKED!`,
        message: `Discount applied to ${prod?.name || 'product'}. Add to cart to shop with savings!`,
      });
    },
    [currentUser, getChallengeProgress, updateUser, addToast]
  );

  const getOfferStatus = useCallback(
    (productId: string): OfferStatus => {
      if (!currentUser) return 'locked';

      // 1. Is it explicitly unlocked?
      if (currentUser.unlockedOffers && currentUser.unlockedOffers.includes(productId)) {
        return 'unlocked';
      }

      // 2. Find product requirement and challenge
      const product = products.find((p) => p.id === productId);
      if (!product) return 'locked';

      const challengeId = product.fitnessOffer.requirement.challengeId;
      const progress = currentUser.challenges?.[challengeId];

      if (progress?.isUnlocked) {
        return 'unlocked';
      }

      if (progress?.isCompleted || (progress && progress.current >= progress.target)) {
        return 'activity_completed';
      }

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
