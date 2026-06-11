"use client";

import { useEffect, useState } from "react";

import OpportunityTable from "./OpportunityTable";
import OpportunityDetails from "./OpportunityDetails";

import { searchOpportunities } from "@/services/opportunityService";
import { MarketOpportunity } from "@/types/opportunity";

export default function MarketAnalyzer() {
  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [opportunities, setOpportunities] =
    useState<MarketOpportunity[]>([]);

  const [selectedOpportunity, setSelectedOpportunity] =
    useState<MarketOpportunity | null>(null);

  useEffect(() => {
    async function load() {
      if (!search.trim()) {
        setOpportunities([]);
        setSelectedOpportunity(null);
        return;
      }

      try {
        setLoading(true);

        const results =
          await searchOpportunities(search);

        setOpportunities(results);

        if (results.length > 0) {
          setSelectedOpportunity(results[0]);
        } else {
          setSelectedOpportunity(null);
        }
      } catch (err) {
        console.error(err);
        setOpportunities([]);
        setSelectedOpportunity(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [search]);

  return (
    <div className="space-y-6">

      <div>

        <h2 className="text-3xl font-bold">
          📈 Market Analyzer
        </h2>

        <p className="mt-2 text-slate-400">
          Find the best trading opportunities.
        </p>

      </div>

      <input
        type="text"
        value={search}
        placeholder="Search item (Example: T6 Bag)"
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
      />

      {loading && (
        <div className="rounded-lg bg-slate-900 p-4">
          Loading...
        </div>
      )}

      {!loading && (
        <>
          <OpportunityTable
            opportunities={opportunities}
            onSelect={
              setSelectedOpportunity
            }
          />

          <OpportunityDetails
            opportunity={
              selectedOpportunity
            }
          />
        </>
      )}

    </div>
  );
}