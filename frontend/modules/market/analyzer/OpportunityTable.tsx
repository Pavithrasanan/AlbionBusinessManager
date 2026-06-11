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
            <th className="p-3">Item</th>
            <th className="p-3">Buy From</th>
            <th className="p-3">Sell To</th>
            <th className="p-3">Spread</th>
            <th className="p-3">Net Profit</th>
            <th className="p-3">ROI</th>
          </tr>
        </thead>

        <tbody>
          {opportunities.map((item) => (
            <tr
              key={item.uniqueName}
              onClick={() => onSelect(item)}
              className="cursor-pointer border-t border-slate-800 hover:bg-slate-800"
            >
              <td className="p-3 font-medium">
                {item.displayName}
              </td>

              <td className="p-3">
                {item.buyCity}
              </td>

              <td className="p-3">
                {item.sellCity}
              </td>

              <td className="p-3 text-yellow-400 font-semibold">
                {item.spread.toLocaleString()}
              </td>

              <td className="p-3 text-green-400 font-semibold">
                {item.netProfit.toLocaleString()}
              </td>

              <td className="p-3">
                {item.roi.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}