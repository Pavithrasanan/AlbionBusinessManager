interface ItemCardProps {
  uniqueName: string;
  displayName: string;
  category?: string;
  selected?: boolean;
  onClick: () => void;
}

export default function ItemCard({
  uniqueName,
  displayName,
  category,
  selected = false,
  onClick,
}: ItemCardProps) {
  const image = `https://render.albiononline.com/v1/item/${uniqueName}.png`;

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border transition-all duration-200 text-left ${
        selected
          ? "border-blue-500 bg-slate-800 shadow-lg shadow-blue-500/20"
          : "border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800"
      }`}
    >
      <div className="flex items-center gap-4 p-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-950">
          <img
            src={image}
            alt={displayName}
            className="h-12 w-12 object-contain"
            loading="lazy"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="truncate font-semibold text-white">
            {displayName}
          </div>

          <div className="mt-1 text-xs text-slate-400">
            {category || "Albion Item"}
          </div>

          <div className="mt-2 text-xs text-slate-500 truncate">
            {uniqueName}
          </div>
        </div>

        {selected && (
          <div className="rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
            Selected
          </div>
        )}
      </div>
    </button>
  );
}