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
        <h2 className="text-xl font-bold">
          Market Details
        </h2>

        <p className="mt-4 text-slate-400">
          Select an item to view its market information.
        </p>
      </div>
    );
  }

  const profit =
    item.sellPrice - item.buyPrice;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {item.displayName}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {item.uniqueName}
          </p>
        </div>

        <div className="rounded bg-slate-800 px-3 py-1 text-sm">
          T{item.tier}.{Math.max(0, item.enchantment - 1)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Quality
          </p>

          <p className="mt-1 text-xl font-semibold">
            {item.quality}
          </p>
        </div>

        <div className="rounded bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            City
          </p>

          <p className="mt-1 text-xl font-semibold">
            {item.city}
          </p>
        </div>

        <div className="rounded bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Buy Price
          </p>

          <p className="mt-1 text-xl font-semibold">
            {item.buyPrice.toLocaleString()}
          </p>
        </div>

        <div className="rounded bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Sell Price
          </p>

          <p className="mt-1 text-xl font-semibold">
            {item.sellPrice.toLocaleString()}
          </p>
        </div>

        <div className="rounded bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Demand
          </p>

          <p className="mt-1 text-xl font-semibold">
            {item.demand ?? "-"}
          </p>
        </div>

        <div className="rounded bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Last Updated
          </p>

          <p className="mt-1 text-xl font-semibold">
            {item.lastUpdated ?? "-"}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-green-700 bg-green-900/20 p-5">
        <p className="text-sm text-slate-300">
          Estimated Profit
        </p>

        <p className="mt-2 text-4xl font-bold text-green-400">
          {profit.toLocaleString()}
        </p>
      </div>
    </div>
  );
}