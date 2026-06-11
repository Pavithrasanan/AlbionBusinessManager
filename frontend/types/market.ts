export interface MarketItem {
  id: string;

  uniqueName: string;

  displayName: string;

  tier: number;

  enchantment: number;

  quality: number;

  city: string;

  buyPrice: number;

  sellPrice: number;

  demand?: number;

  lastUpdated?: string;
}