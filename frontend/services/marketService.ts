import { MarketItem } from "@/types/market";

export async function searchMarket(
  query: string
): Promise<MarketItem[]> {
  const data: MarketItem[] = [
    {
      id: "1",
      name: "T4 Bag",
      tier: 4,
      enchantment: 0,
      city: "Bridgewatch",
      buyPrice: 1000,
      sellPrice: 1200,
    },
    {
      id: "2",
      name: "T5 Bag",
      tier: 5,
      enchantment: 0,
      city: "Bridgewatch",
      buyPrice: 2500,
      sellPrice: 2900,
    },
    {
      id: "3",
      name: "T6 Bag",
      tier: 6,
      enchantment: 0,
      city: "Martlock",
      buyPrice: 6200,
      sellPrice: 7100,
    },
  ];

  return data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}