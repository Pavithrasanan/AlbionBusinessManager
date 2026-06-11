export interface MarketOpportunity {
  uniqueName: string;
  displayName: string;

  tier: number;
  enchantment: number;
  quality: number;

  buyCity: string;
  buyPrice: number;

  sellCity: string;
  sellPrice: number;

  spread: number;

  estimatedTax: number;

  netProfit: number;

  roi: number;

  recommendation: "BUY" | "HOLD" | "SKIP";
}