import { MarketItem } from "@/types/market";

interface MarketTableProps {
  items: MarketItem[];
}

export default function MarketTable({
  items,
}: MarketTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700">
      <table className="w-full text-left">
        <thead className="bg-slate-900">
          <tr>
            <th className="p-3">Item</th>
            <th className="p-3">Tier</th>
            <th className="p-3">City</th>
            <th className="p-3">Buy</th>
            <th className="p-3">Sell</th>
            <th className="p-3">Profit</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-t border-slate-800"
            >
              <td className="p-3">{item.name}</td>

              <td className="p-3">
                T{item.tier}.{item.enchantment}
              </td>

              <td className="p-3">{item.city}</td>

              <td className="p-3">
                {item.buyPrice.toLocaleString()}
              </td>

              <td className="p-3">
                {item.sellPrice.toLocaleString()}
              </td>

              <td className="p-3 font-semibold text-green-400">
                {(item.sellPrice - item.buyPrice).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}