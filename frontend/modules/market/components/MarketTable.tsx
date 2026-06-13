"use client";

import { MarketItem } from "@/types/market";

interface MarketTableProps {
  items: MarketItem[];
  onSelect: (item: MarketItem) => void;
}

export default function MarketTable({
  items,
  onSelect,
}: MarketTableProps) {
if (items.length === 0) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-10 text-center">
      <div className="text-6xl mb-4">📦</div>

      <h2 className="text-xl font-bold text-white">
        No market data found
      </h2>

      <p className="mt-3 text-slate-400">
        This item currently has no entries in the database.
      </p>

      <p className="mt-1 text-slate-500 text-sm">
        Try another tier or another item.
      </p>
    </div>
  );
}

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shadow-lg">

      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-4 py-3">

        <h2 className="text-xl font-bold">
          Market Prices
        </h2>

        <span className="rounded bg-slate-700 px-3 py-1 text-sm">
          {items.length} Cities
        </span>

      </div>

      <div className="max-h-[700px] overflow-y-auto">

        <table className="w-full">

          <thead className="sticky top-0 bg-slate-800 text-slate-300">

            <tr>

              <th className="p-3 text-left">
                City
              </th>

              <th className="p-3 text-right">
                Buy Order
              </th>

              <th className="p-3 text-right">
                Sell Order
              </th>

              <th className="p-3 text-right">
                Profit
              </th>

              <th className="p-3 text-center">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {items.map((item) => {
              const profit =
                item.sellPrice -
                item.buyPrice;

              const profitable =
                profit >= 0;

              return (
                <tr
                  key={item.id}
                  onClick={() =>
                    onSelect(item)
                  }
                  className="cursor-pointer border-b border-slate-800 transition hover:bg-slate-800"
                >
                  <td className="p-3 font-semibold">
                    {item.city}
                  </td>

                  <td className="p-3 text-right">
                    {item.buyPrice.toLocaleString()}
                  </td>

                  <td className="p-3 text-right">
                    {item.sellPrice.toLocaleString()}
                  </td>

                  <td
                    className={`p-3 text-right font-bold ${
                      profitable
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {profit.toLocaleString()}
                  </td>

                  <td className="p-3 text-center text-xl">
                    {profitable ? "🟢" : "🔴"}
                  </td>
                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}