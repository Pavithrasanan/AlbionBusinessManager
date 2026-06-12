"use client";

interface Props {
  label: string;
  value: string;
  cities: string[];
  onChange: (value: string) => void;
}

export default function CitySelector({
  label,
  value,
  cities,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
      >
        <option value="">
          Select City
        </option>

        {cities.map((city) => (
          <option
            key={city}
            value={city}
          >
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}