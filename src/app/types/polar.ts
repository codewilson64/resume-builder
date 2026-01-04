export interface PolarSubscription {
  id: string;
  status: string;

  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string | null;
  recurringInterval: string;
  recurringIntervalCount: number;

  customer?: {
    id: string;
    externalId?: string;
  };

  product: {
    id: string;
    name?: string;
  };

  prices?: Array<{
    priceAmount: number;
    priceCurrency: string;
  }>;
}
