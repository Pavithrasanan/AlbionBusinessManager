"use client";

import { useMemo } from "react";

import { MarketItem } from "@/types/market";
import OpportunityCard from "./OpportunityCard";

import { MarketOpportunity } from "@/types/opportunity";

interface Props {
  items: MarketItem[];

  onAnalyze: (
    opportunity: MarketOpportunity
  ) => void;
}

export default function OpportunityScanner({
  items,
  onAnalyze,
}: Props) {
  const opportunities = useMemo(() => {
    const grouped = new Map<
      string,
      MarketItem[]
    >();

    items.forEach((item) => {
      if (!grouped.has(item.uniqueName)) {
        grouped.set(item.uniqueName, []);
      }

      grouped.get(item.uniqueName)!.push(item);
    });

    const results = [];

    for (const [, markets] of grouped) {
      if (markets.length < 2) {
        continue;
      }

      const lowestBuy = markets.reduce(
        (a, b) =>
          a.buyPrice < b.buyPrice ? a : b
      );

      const highestSell = markets.reduce(
        (a, b) =>
          a.sellPrice > b.sellPrice
            ? a
            : b
      );

      const profit =
        highestSell.sellPrice -
        lowestBuy.buyPrice;

      if (profit <= 0) {
        continue;
      }

      results.push({
        uniqueName:
          lowestBuy.uniqueName,

        displayName:
          lowestBuy.displayName,

        buyCity:
          lowestBuy.city,

        sellCity:
          highestSell.city,

        buyPrice:
          lowestBuy.buyPrice,

        sellPrice:
          highestSell.sellPrice,

        profit,
      });
    }

    return results.sort(
      (a, b) => b.profit - a.profit
    );
  }, [items]);

  if (opportunities.length === 0) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-10 text-center text-slate-400">
        🔍 No profitable opportunities found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          🔥 Opportunity Scanner
        </h1>

        <p className="mt-2 text-slate-400">
          Best cross-city trading opportunities.
        </p>

      </div>

      <div className="grid gap-4">

{opportunities.map(
  (opportunity) => (
    <OpportunityCard
      key={opportunity.uniqueName}
      opportunity={{
        uniqueName: opportunity.uniqueName,
        displayName: opportunity.displayName,
        tier: 0,
        enchantment: 0,
        quality: 1,
        buyCity: opportunity.buyCity,
        buyPrice: opportunity.buyPrice,
        sellCity: opportunity.sellCity,
        sellPrice: opportunity.sellPrice,
        spread: opportunity.profit,
        estimatedTax: 0,
        netProfit: opportunity.profit,
        roi: 0,
        recommendation: "BUY",
      }}
onAnalyze={onAnalyze}
    />
  )
)}

      </div>

    </div>
  );
}