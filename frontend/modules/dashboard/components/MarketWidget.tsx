export default function MarketWidget() {
  const stats = [
    {
      label: "Best Opportunity",
      value: "+0",
      color: "text-green-400",
    },
    {
      label: "Top City",
      value: "Unknown",
      color: "text-blue-400",
    },
    {
      label: "Items Tracked",
      value: "0",
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold">
          📊 Market Overview
        </h2>

        <span className="rounded-lg bg-green-900 px-3 py-1 text-sm text-green-400">
          LIVE
        </span>

      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        {stats.map((stat) => (

          <div
            key={stat.label}
            className="rounded-lg bg-slate-800 p-4"
          >

            <div className="text-sm text-slate-400">
              {stat.label}
            </div>

            <div
              className={`mt-2 text-2xl font-bold ${stat.color}`}
            >
              {stat.value}
            </div>

          </div>

        ))}

      </div>

      <div className="mt-6 flex justify-end">

        <button className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-500">
          Open Market →
        </button>

      </div>

    </div>
  );
}