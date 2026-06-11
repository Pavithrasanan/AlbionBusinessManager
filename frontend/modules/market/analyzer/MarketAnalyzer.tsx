"use client";

import { useEffect, useMemo, useState } from "react";

import OpportunityTable from "./OpportunityTable";
import OpportunityDetails from "./OpportunityDetails";

import { searchOpportunities } from "@/services/opportunityService";
import { MarketOpportunity } from "@/types/opportunity";

export default function MarketAnalyzer() {
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [opportunities, setOpportunities] =
    useState<MarketOpportunity[]>([]);

  const [selectedOpportunity, setSelectedOpportunity] =
    useState<MarketOpportunity | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // Temporary default search until we load all items
        const results =
          await searchOpportunities("bag");

        setOpportunities(results);

        if (results.length > 0) {
          setSelectedOpportunity(results[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return opportunities;
    }

    return opportunities.filter((item) =>
      item.displayName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, opportunities]);

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-3xl font-bold">
          📈 Market Analyzer
        </h2>

        <p className="mt-2 text-slate-400">
          Analyze profitable trading opportunities.
        </p>
      </div>

      <input
        type="text"
        placeholder="Filter items..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
      />

      {loading ? (
        <div className="rounded-lg bg-slate-900 p-6">
          Loading opportunities...
        </div>
      ) : (
        <>
          <OpportunityTable
            opportunities={filtered}
            onSelect={setSelectedOpportunity}
          />

          <OpportunityDetails
            opportunity={selectedOpportunity}
          />
        </>
      )}

    </div>
  );
}