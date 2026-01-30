"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SubscriptionContextType {
  isPremium: boolean;
  isLoading: boolean;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/subscription");

      if (!res.ok) {
        setIsPremium(false);
        return;
      }

      const data = await res.json();

      setIsPremium(
        data.status === "active" || data.status === "trialing"
      );
    } catch (err) {
      console.error("Failed to fetch subscription", err);
      setIsPremium(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  return (
    <SubscriptionContext.Provider value={{ isPremium, isLoading, refreshSubscription: fetchSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used inside SubscriptionProvider"
    );
  }
  return context;
};
