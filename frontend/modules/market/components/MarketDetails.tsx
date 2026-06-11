"use client";

import { MarketItem } from "@/types/market";

interface MarketDetailsProps {
  item: MarketItem | null;
}

export default function MarketDetails({
  item,
}: MarketDetailsProps) {
  if (!item) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
        <p className="text-slate-400">
          Select an item to view details.
        </p>
      </div>
    );
  }

  const profit =
    item.sellPrice - item.buyPrice;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        {item.displayName}
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        <div>
          <p className="text-slate-400">
            Tier
          </p>

          <p className="text-lg font-semibold">
            T{item.tier}.{item.enchantment}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            Quality
          </p>

          <p className="text-lg font-semibold">
            {item.quality}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            City
          </p>

          <p className="text-lg font-semibold">
            {item.city}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            Demand
          </p>

          <p className="text-lg font-semibold">
            {item.demand ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            Buy Price
          </p>

          <p className="text-lg font-semibold">
            {item.buyPrice.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-slate-400">
            Sell Price
          </p>

          <p className="text-lg font-semibold">
            {item.sellPrice.toLocaleString()}
          </p>
        </div>

      </div>

      <div className="mt-6 rounded-lg bg-green-900/30 p-4">
        <p className="text-slate-300">
          Estimated Profit
        </p>

        <p className="text-3xl font-bold text-green-400">
          {profit.toLocaleString()}
        </p>
      </div>

      <div className="mt-4 text-sm text-slate-500">
        Last Updated:{" "}
        {item.lastUpdated ?? "-"}
      </div>
    </div>
  );
}