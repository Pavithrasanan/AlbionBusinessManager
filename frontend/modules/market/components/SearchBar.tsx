interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      placeholder="Search item..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}