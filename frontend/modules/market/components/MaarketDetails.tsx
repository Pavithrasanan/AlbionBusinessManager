import { MarketItem } from "@/types/market";

interface MarketDetailsProps {
  item: MarketItem | null;
}

export default function MarketDetails({
  item,
}: MarketDetailsProps) {
  if (!item) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
        <p className="text-slate-400">
          Select an item to view details.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">
        {item.name}
      </h2>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Tier:</strong>{" "}
          T{item.tier}.{item.enchantment}
        </p>

        <p>
          <strong>Quality:</strong>{" "}
          {item.quality}
        </p>

        <p>
          <strong>City:</strong>{" "}
          {item.city}
        </p>

        <p>
          <strong>Buy Price:</strong>{" "}
          {item.buyPrice.toLocaleString()}
        </p>

        <p>
          <strong>Sell Price:</strong>{" "}
          {item.sellPrice.toLocaleString()}
        </p>

        <p className="font-bold text-green-400">
          Profit:{" "}
          {(item.sellPrice - item.buyPrice).toLocaleString()}
        </p>
      </div>
    </div>
  );
}