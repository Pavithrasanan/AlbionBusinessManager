"use client";

import { MarketOpportunity } from "@/types/opportunity";

interface OpportunityDetailsProps {
  opportunity: MarketOpportunity | null;
}

export default function OpportunityDetails({
  opportunity,
}: OpportunityDetailsProps) {
  if (!opportunity) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold">
          Market Analyzer
        </h2>

        <p className="mt-4 text-slate-400">
          Select a trading opportunity to view
          detailed analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">

      <h2 className="text-3xl font-bold">
        {opportunity.displayName}
      </h2>
      <p className="mt-2 text-slate-400">
  Tier: T{opportunity.tier}.
  {Math.max(
    0,
    opportunity.enchantment - 1
  )}
</p>

<p className="text-slate-400">
  Quality: {opportunity.quality}
</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            🟢 Buy From
          </p>

          <p className="mt-2 text-xl font-semibold">
            {opportunity.buyCity}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {opportunity.buyPrice.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            🔴 Sell To
          </p>

          <p className="mt-2 text-xl font-semibold">
            {opportunity.sellCity}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {opportunity.sellPrice.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Spread
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-400">
            {opportunity.spread.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <p className="text-sm text-slate-400">
            Estimated Tax
          </p>

          <p className="mt-2 text-2xl font-bold text-red-400">
            {opportunity.estimatedTax.toLocaleString()}
          </p>
        </div>

      </div>

      <div className="mt-8 rounded-lg border border-green-700 bg-green-900/20 p-6">

        <p className="text-sm text-slate-300">
          Estimated Net Profit
        </p>

        <p className="mt-2 text-4xl font-bold text-green-400">
          {opportunity.netProfit.toLocaleString()}
        </p>

        <div className="mt-4 flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-400">
              ROI
            </p>

            <p className="text-2xl font-bold">
              {opportunity.roi.toFixed(2)}%
            </p>
          </div>

          <div
  className={`rounded-full px-4 py-2 font-semibold ${
    opportunity.recommendation === "BUY"
      ? "bg-green-700"
      : opportunity.recommendation ===
        "HOLD"
      ? "bg-yellow-700"
      : "bg-red-700"
  }`}
>
  {opportunity.recommendation ===
  "BUY"
    ? "🟢 BUY"
    : opportunity.recommendation ===
      "HOLD"
    ? "🟡 HOLD"
    : "🔴 SKIP"}
</div>

        </div>

      </div>

    </div>
  );
}