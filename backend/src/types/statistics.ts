export interface MarketStatistics {

  unique_name: string;

  city: string;

  quality: number;

  avg_buy_24h: number;

  avg_sell_24h: number;

  avg_buy_7d: number;

  avg_sell_7d: number;

  avg_buy_30d: number;

  avg_sell_30d: number;

  min_buy: number;

  max_sell: number;

  snapshots: number;

  trend: "UP" | "DOWN" | "STABLE";

  score: number;

}