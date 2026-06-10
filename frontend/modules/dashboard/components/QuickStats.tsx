export default function QuickStats() {
  const cards = [
    {
      title: "💰 Silver",
      value: "0",
    },
    {
      title: "⚡ Focus",
      value: "30,000",
    },
    {
      title: "📈 Profit Today",
      value: "0",
    },
    {
      title: "🏝 Islands",
      value: "0",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <h3 className="text-slate-400">
            {card.title}
          </h3>

          <h1 className="mt-2 text-3xl font-bold">
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}