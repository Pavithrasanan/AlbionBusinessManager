export interface MarketOpportunity {
  uniqueName: string;
  displayName: string;

  buyCity: string;
  buyPrice: number;

  sellCity: string;
  sellPrice: number;

  spread: number;

  estimatedTax: number;

  netProfit: number;

  roi: number;
}