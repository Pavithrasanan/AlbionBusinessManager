"use client";

import { MarketItem } from "@/types/market";

interface Props {
  items: MarketItem[];
}

export default function StatsCards({
  items,
}: Props) {
  const totalItems = items.length;

  const bestProfit =
    items.length > 0
      ? Math.max(
          ...items.map(
            (i) =>
              i.sellPrice -
              i.buyPrice
          )
        )
      : 0;

  const highestBuy =
    items.length > 0
      ? Math.max(
          ...items.map(
            (i) => i.buyPrice
          )
        )
      : 0;

  const highestSell =
    items.length > 0
      ? Math.max(
          ...items.map(
            (i) => i.sellPrice
          )
        )
      : 0;

  const cards = [
    {
      title: "Items",
      value: totalItems,
      icon: "📦",
    },
    {
      title: "Best Profit",
      value: bestProfit.toLocaleString(),
      icon: "📈",
    },
    {
      title: "Highest Buy",
      value: highestBuy.toLocaleString(),
      icon: "💰",
    },
    {
      title: "Highest Sell",
      value: highestSell.toLocaleString(),
      icon: "🏆",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-700 bg-slate-900 p-4"
        >
          <div className="text-3xl">
            {card.icon}
          </div>

          <div className="mt-3 text-sm text-slate-400">
            {card.title}
          </div>

          <div className="mt-1 text-2xl font-bold">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}