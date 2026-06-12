"use client";

import { useState } from "react";
import { calculateCraftProfit } from "@/services/craftingService";

export default function CraftingCalculator() {
const [itemId, setItemId] = useState("");

const [quantity, setQuantity] =
  useState(1);

const [useFocus, setUseFocus] =
  useState(true);

const [city, setCity] =
  useState("Caerleon");

const [result, setResult] =
  useState<any>(null);

const [loading, setLoading] =
  useState(false);

  async function handleCalculate() {
    if (!itemId.trim()) return;

    setLoading(true);

    try {
      const data = await calculateCraftProfit(itemId);
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(null);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-4xl space-y-6">

        <h1 className="text-4xl font-bold">
          🛠 Crafting Calculator
        </h1>

<div className="grid gap-4">

  <input
    value={itemId}
    onChange={(e) =>
      setItemId(e.target.value)
    }
    placeholder="Example: T4_BAG"
    className="rounded-lg border border-slate-700 bg-slate-900 p-3"
  />

  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

    <input
      type="number"
      min={1}
      value={quantity}
      onChange={(e) =>
        setQuantity(
          Number(e.target.value)
        )
      }
      className="rounded-lg border border-slate-700 bg-slate-900 p-3"
      placeholder="Quantity"
    />

    <select
      value={city}
      onChange={(e) =>
        setCity(e.target.value)
      }
      className="rounded-lg border border-slate-700 bg-slate-900 p-3"
    >
      <option>Caerleon</option>
      <option>Bridgewatch</option>
      <option>Martlock</option>
      <option>Lymhurst</option>
      <option>Fort Sterling</option>
      <option>Thetford</option>
    </select>

    <label className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 p-3">

      <input
        type="checkbox"
        checked={useFocus}
        onChange={(e) =>
          setUseFocus(
            e.target.checked
          )
        }
      />

      Use Focus

    </label>

  </div>

  <button
    onClick={handleCalculate}
    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
  >
    Calculate
  </button>

</div>

        {loading && (
          <div className="rounded-lg bg-slate-900 p-6">
            Calculating...
          </div>
        )}

        {result && (
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">

            <h2 className="text-2xl font-bold">
              {result.displayName}
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-slate-400">
                  Material Cost
                </p>

                <p className="text-xl font-semibold">
                  {result.materialCost.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Crafting Fee
                </p>

                <p className="text-xl font-semibold">
                  {result.craftingFee.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Total Cost
                </p>

                <p className="text-xl font-semibold">
                  {result.totalCost.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Market Value
                </p>

                <p className="text-xl font-semibold">
                  {result.marketPrice.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Estimated Tax
                </p>

                <p className="text-xl font-semibold text-red-400">
                  {result.estimatedTax.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-slate-400">
                  Net Profit
                </p>

                <p
                  className={`text-xl font-bold ${
                    result.netProfit >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {result.netProfit.toLocaleString()}
                </p>
              </div>

            </div>

            <div className="mt-4 rounded-lg bg-slate-800 p-4">
              <p className="text-slate-400">
                ROI
              </p>

              <p className="text-3xl font-bold">
                {result.roi.toFixed(2)}%
              </p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}