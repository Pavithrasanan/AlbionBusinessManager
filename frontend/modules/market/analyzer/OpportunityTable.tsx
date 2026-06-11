"use client";

import { MarketOpportunity } from "@/types/opportunity";

interface OpportunityTableProps {
  opportunities: MarketOpportunity[];
  onSelect: (item: MarketOpportunity) => void;
}

export default function OpportunityTable({
  opportunities,
  onSelect,
}: OpportunityTableProps) {
  if (opportunities.length === 0) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 text-center text-slate-400">
        No trading opportunities found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700">
      <table className="w-full text-left">
        <thead className="bg-slate-900">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Item</th>
            <th className="p-3">Buy From</th>
            <th className="p-3">Sell To</th>
            <th className="p-3">Net Profit</th>
            <th className="p-3">ROI</th>
            <th className="p-3">Recommendation</th>
          </tr>
        </thead>

        <tbody>
          {opportunities.map((item, index) => (
            <tr
              key={item.uniqueName}
              onClick={() => onSelect(item)}
              className="cursor-pointer border-t border-slate-800 hover:bg-slate-800"
            >
              <td className="p-3 font-bold">
                #{index + 1}
              </td>

              <td className="p-3 font-medium">
                <div>{item.displayName}</div>

                <div className="text-xs text-slate-400">
                  T{item.tier}.
                  {Math.max(
                    0,
                    item.enchantment - 1
                  )}
                </div>
              </td>

              <td className="p-3">
                {item.buyCity}
              </td>

              <td className="p-3">
                {item.sellCity}
              </td>

              <td className="p-3 text-green-400 font-semibold">
                {item.netProfit.toLocaleString()}
              </td>

              <td className="p-3 font-semibold">
                {item.roi.toFixed(2)}%
              </td>

              <td className="p-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    item.recommendation === "BUY"
                      ? "bg-green-700 text-white"
                      : item.recommendation ===
                        "HOLD"
                      ? "bg-yellow-600 text-black"
                      : "bg-red-700 text-white"
                  }`}
                >
                  {item.recommendation === "BUY"
                    ? "🟢 BUY"
                    : item.recommendation ===
                      "HOLD"
                    ? "🟡 HOLD"
                    : "🔴 SKIP"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}