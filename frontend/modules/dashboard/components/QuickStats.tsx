export default function QuickStats() {
  const cards = [
    {
      icon: "💰",
      title: "Silver",
      value: "0",
      color: "text-yellow-400",
    },
    {
      icon: "⚡",
      title: "Focus",
      value: "30,000",
      color: "text-blue-400",
    },
    {
      icon: "📈",
      title: "Profit Today",
      value: "0",
      color: "text-green-400",
    },
    {
      icon: "🏝️",
      title: "Islands",
      value: "0",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500 hover:bg-slate-800"
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">
              {card.icon}
            </span>

            <span
              className={`text-sm font-semibold ${card.color}`}
            >
              LIVE
            </span>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            {card.title}
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}