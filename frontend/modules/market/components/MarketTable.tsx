type MarketItem = {
  id: string;
  name: string;
  tier: number;
  enchantment: number;
  city: string;
  buyPrice: number;
  sellPrice: number;
};

interface MarketTableProps {
  items: MarketItem[];
}

export default function MarketTable({
  items,
}: MarketTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="w-full text-left">
        <thead className="border-b border-slate-700">
          <tr>
            <th className="p-4">Item</th>
            <th className="p-4">Tier</th>
            <th className="p-4">City</th>
            <th className="p-4">Buy</th>
            <th className="p-4">Sell</th>
            <th className="p-4">Profit</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-800 hover:bg-slate-800"
            >
              <td className="p-4">{item.name}</td>

              <td className="p-4">
                T{item.tier}.{item.enchantment}
              </td>

              <td className="p-4">{item.city}</td>

              <td className="p-4">
                {item.buyPrice.toLocaleString()}
              </td>

              <td className="p-4">
                {item.sellPrice.toLocaleString()}
              </td>

              <td className="p-4 font-bold text-green-400">
                {(item.sellPrice - item.buyPrice).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}