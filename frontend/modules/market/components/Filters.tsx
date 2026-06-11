"use client";

interface FiltersProps {
  city: string;
  onCityChange: (city: string) => void;
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

export default function Filters({
  city,
  onCityChange,
}: FiltersProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        City
      </label>

      <select
        value={city}
        onChange={(e) =>
          onCityChange(e.target.value)
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      >
        {cities.map((c) => (
          <option
            key={c}
            value={c}
          >
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}