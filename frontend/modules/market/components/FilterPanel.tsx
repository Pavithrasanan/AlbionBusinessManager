"use client";

interface FilterPanelProps {
  city: string;
  tier: string;
  enchantment: string;
  quality: string;
  sort: string;

  onCityChange: (value: string) => void;
  onTierChange: (value: string) => void;
  onEnchantmentChange: (value: string) => void;
  onQualityChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const cities = [
  "All",
  "Bridgewatch",
  "Martlock",
  "Lymhurst",
  "Fort Sterling",
  "Thetford",
  "Caerleon",
];

const tiers = [
  "All",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
];

const enchantments = [
  "All",
  "0",
  "1",
  "2",
  "3",
  "4",
];

const qualities = [
  "All",
  "1",
  "2",
  "3",
  "4",
  "5",
];

const sorts = [
  "profit",
  "buy",
  "sell",
  "tier",
  "quality",
];

export default function FilterPanel({
  city,
  tier,
  enchantment,
  quality,
  sort,

  onCityChange,
  onTierChange,
  onEnchantmentChange,
  onQualityChange,
  onSortChange,
}: FilterPanelProps) {
  return (
    <div className="grid gap-4 md:grid-cols-5">

      <div>
        <label className="mb-2 block text-sm">
          Tier
        </label>

        <select
          value={tier}
          onChange={(e) =>
            onTierChange(e.target.value)
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        >
          {tiers.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "All" : `T${t}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm">
          Enchantment
        </label>

        <select
          value={enchantment}
          onChange={(e) =>
            onEnchantmentChange(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        >
          {enchantments.map((e1) => (
            <option key={e1} value={e1}>
              {e1 === "All"
                ? "All"
                : `+${e1}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm">
          Quality
        </label>

        <select
          value={quality}
          onChange={(e) =>
            onQualityChange(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        >
          <option value="All">
            All
          </option>

          <option value="1">
            Normal
          </option>

          <option value="2">
            Good
          </option>

          <option value="3">
            Outstanding
          </option>

          <option value="4">
            Excellent
          </option>

          <option value="5">
            Masterpiece
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm">
          City
        </label>

        <select
          value={city}
          onChange={(e) =>
            onCityChange(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        >
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm">
          Sort
        </label>

        <select
          value={sort}
          onChange={(e) =>
            onSortChange(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        >
          <option value="profit">
            Profit
          </option>

          <option value="buy">
            Buy Order
          </option>

          <option value="sell">
            Sell Order
          </option>

          <option value="tier">
            Tier
          </option>

          <option value="quality">
            Quality
          </option>
        </select>
      </div>

    </div>
  );
}