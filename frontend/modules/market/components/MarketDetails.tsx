"use client";

import { MarketItem } from "@/types/market";

interface MarketDetailsProps {
  item: MarketItem | null;
}

function qualityName(quality: number) {
  switch (quality) {
    case 1:
      return "Normal";
    case 2:
      return "Good";
    case 3:
      return "Outstanding";
    case 4:
      return "Excellent";
    case 5:
      return "Masterpiece";
    default:
      return quality.toString();
  }
}

export default function MarketDetails({
  item,
}: MarketDetailsProps) {
  if (!item) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 h-full">
        <h2 className="text-2xl font-bold">
          Item Details
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center text-slate-400">
          <div className="text-6xl">📦</div>

          <p className="mt-4 text-center">
            Select an item from the table to view its details.
          </p>
        </div>
      </div>
    );
  }

  const image =
    `https://render.albiononline.com/v1/item/${item.uniqueName}.png`;

  const profit =
    item.sellPrice - item.buyPrice;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

      <div className="flex flex-col items-center">

        <img
          src={image}
          alt={item.displayName}
          className="h-28 w-28 rounded-lg bg-slate-800 p-2"
        />

        <h2 className="mt-4 text-center text-2xl font-bold">
          {item.displayName}
        </h2>

        <p className="mt-1 text-xs text-slate-400 break-all text-center">
          {item.uniqueName}
        </p>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">

        <InfoCard
          title="Tier"
          value={`T${item.tier}`}
        />

        <InfoCard
          title="Enchant"
          value={`+${item.enchantment}`}
        />

        <InfoCard
          title="Quality"
          value={qualityName(item.quality)}
        />

        <InfoCard
          title="City"
          value={item.city}
        />

        <InfoCard
          title="Buy Order"
          value={item.buyPrice.toLocaleString()}
        />

        <InfoCard
          title="Sell Order"
          value={item.sellPrice.toLocaleString()}
        />

      </div>

      <div className="mt-6 rounded-lg bg-slate-800 p-4">

        <p className="text-sm text-slate-400">
          Estimated Profit
        </p>

        <p
          className={`mt-2 text-3xl font-bold ${
            profit >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {profit.toLocaleString()}
        </p>

      </div>

      <div className="mt-4 rounded-lg bg-slate-800 p-4">

        <p className="text-sm text-slate-400">
          Last Updated
        </p>

        <p className="mt-2 text-sm break-all">
          {item.lastUpdated ?? "-"}
        </p>

      </div>

    </div>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
}

function InfoCard({
  title,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-lg bg-slate-800 p-3">

      <div className="text-xs text-slate-400">
        {title}
      </div>

      <div className="mt-1 font-semibold">
        {value}
      </div>

    </div>
  );
}