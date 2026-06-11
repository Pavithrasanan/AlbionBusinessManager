export interface Recommendation {
  item: string;

  buyCity: string;
  buyPrice: number;

  sellCity: string;
  sellPrice: number;

  profit: number;

  margin: number;

  recommendation:
    | "BUY"
    | "SELL"
    | "HOLD";
}