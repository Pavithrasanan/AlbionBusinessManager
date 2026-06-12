"use client";

import { MarketOpportunity } from "@/types/opportunity";

interface OpportunityCardProps {
  opportunity: MarketOpportunity;
  onAnalyze: (
    opportunity: MarketOpportunity
  ) => void;
}

export default function OpportunityCard({
  opportunity,
  onAnalyze,
}: OpportunityCardProps) {
  const image = `https://render.albiononline.com/v1/item/${opportunity.uniqueName}.png`;

  const stars =
    opportunity.netProfit >= 500000
      ? "★★★★★"
      : opportunity.netProfit >= 250000
      ? "★★★★☆"
      : opportunity.netProfit >= 100000
      ? "★★★☆☆"
      : opportunity.netProfit >= 50000
      ? "★★☆☆☆"
      : "★☆☆☆☆";

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 transition hover:border-blue-500 hover:bg-slate-800">

      <div className="flex items-center gap-4">

        <img
          src={image}
          alt={opportunity.displayName}
          className="h-16 w-16"
        />

        <div className="flex-1">

          <h3 className="text-lg font-bold">
            {opportunity.displayName}
          </h3>

          <div className="mt-1 text-sm text-slate-400">
            {opportunity.buyCity} ➜{" "}
            {opportunity.sellCity}
          </div>

        </div>

      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">

        <div>

          <div className="text-xs text-slate-400">
            Buy
          </div>

          <div className="font-semibold">
            {opportunity.buyPrice.toLocaleString()}
          </div>

        </div>

        <div>

          <div className="text-xs text-slate-400">
            Sell
          </div>

          <div className="font-semibold">
            {opportunity.sellPrice.toLocaleString()}
          </div>

        </div>

        <div>

          <div className="text-xs text-slate-400">
            Profit
          </div>

          <div className="font-bold text-green-400">
            {opportunity.netProfit.toLocaleString()}
          </div>

        </div>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span className="text-yellow-400">
          {stars}
        </span>

        <button
          onClick={() =>
            onAnalyze(opportunity)
          }
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm hover:bg-blue-500"
        >
          Analyze
        </button>

      </div>

    </div>
  );
}