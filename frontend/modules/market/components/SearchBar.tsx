"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        Search Item
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search..."
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none"
      />
    </div>
  );
}