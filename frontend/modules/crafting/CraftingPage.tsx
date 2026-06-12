"use client";

import CraftingCalculator from "./CraftingCalculator";

export default function CraftingPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            🛠 Crafting Calculator
          </h1>

          <p className="mt-2 text-slate-400">
            Calculate crafting costs, profits and ROI.
          </p>
        </div>

        <CraftingCalculator />

      </div>
    </main>
  );
}