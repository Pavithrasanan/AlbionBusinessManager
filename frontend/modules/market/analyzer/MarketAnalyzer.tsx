"use client";

"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import CitySelector from "./components/CitySelector";
import { MarketOpportunity } from "@/types/opportunity";

interface Props {
  opportunity?: MarketOpportunity | null;
}

export default function MarketAnalyzer({
  opportunity,
}: Props) {
  const cities = [
    "Bridgewatch",
    "Martlock",
    "Lymhurst",
    "Fort Sterling",
    "Thetford",
    "Caerleon",
  ];

  const [buyCity, setBuyCity] = useState("");
  const [sellCity, setSellCity] = useState("");

  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  useEffect(() => {
  if (!opportunity) {
    return;
  }

  setBuyCity(
    opportunity.buyCity
  );

  setSellCity(
    opportunity.sellCity
  );

  setBuyPrice(
    opportunity.buyPrice
  );

  setSellPrice(
    opportunity.sellPrice
  );
}, [opportunity]);

  const [quantity, setQuantity] = useState(1);
  const [tax, setTax] = useState(6.5);
  const [transportCost, setTransportCost] =
    useState(0);

  const analysis = useMemo(() => {
    const investment =
      buyPrice * quantity;

    const revenue =
      sellPrice * quantity;

    const taxAmount =
      revenue * (tax / 100);

    const profit =
      revenue -
      investment -
      taxAmount -
      transportCost;

    const roi =
      investment > 0
        ? (profit / investment) * 100
        : 0;

    return {
      investment,
      revenue,
      taxAmount,
      profit,
      roi,
    };
  }, [
    buyPrice,
    sellPrice,
    quantity,
    tax,
    transportCost,
  ]);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          📈 Market Analyzer
        </h1>

        <p className="mt-2 text-slate-400">
          Analyze cross-city trading opportunities.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">

        <CitySelector
          label="Buy City"
          value={buyCity}
          cities={cities}
          onChange={setBuyCity}
        />

        <CitySelector
          label="Sell City"
          value={sellCity}
          cities={cities}
          onChange={setSellCity}
        />

        <div>
          <label className="mb-2 block">
            Buy Price
          </label>

          <input
            type="number"
            value={buyPrice}
            onChange={(e) =>
              setBuyPrice(
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Sell Price
          </label>

          <input
            type="number"
            value={sellPrice}
            onChange={(e) =>
              setSellPrice(
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Quantity
          </label>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Tax (%)
          </label>

          <input
            type="number"
            step="0.1"
            value={tax}
            onChange={(e) =>
              setTax(
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="mb-2 block">
            Transport Cost
          </label>

          <input
            type="number"
            value={transportCost}
            onChange={(e) =>
              setTransportCost(
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />
        </div>

      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Analysis
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>Investment</span>

            <span>
              {analysis.investment.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Revenue</span>

            <span>
              {analysis.revenue.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>

            <span>
              {analysis.taxAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Transport</span>

            <span>
              {transportCost.toLocaleString()}
            </span>
          </div>

          <hr className="border-slate-700" />

          <div className="flex justify-between text-xl font-bold">

            <span>Net Profit</span>

            <span
              className={
                analysis.profit >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {analysis.profit.toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between text-lg">

            <span>ROI</span>

            <span
              className={
                analysis.roi >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {analysis.roi.toFixed(2)}%
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}