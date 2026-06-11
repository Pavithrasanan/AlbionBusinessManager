interface FiltersProps {
  city: string;
  onCityChange: (city: string) => void;
}

export default function Filters({
  city,
  onCityChange,
}: FiltersProps) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-slate-300">
        🏙 City
      </label>

      <select
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-blue-500"
      >
        <option value="All">All Cities</option>
        <option value="Bridgewatch">Bridgewatch</option>
        <option value="Martlock">Martlock</option>
        <option value="Lymhurst">Lymhurst</option>
        <option value="Fort Sterling">Fort Sterling</option>
        <option value="Thetford">Thetford</option>
        <option value="Caerleon">Caerleon</option>
      </select>
    </div>
  );
}