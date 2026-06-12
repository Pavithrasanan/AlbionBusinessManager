export default function AIWidget() {
  const recommendations = [
    {
      title: "Check Market Opportunities",
      description:
        "Scan cross-city prices for profitable trades.",
    },
    {
      title: "Use Your Focus",
      description:
        "You have 30,000 focus available for crafting profits.",
    },
    {
      title: "Complete Today's Missions",
      description:
        "Finish daily goals to maximize your earnings.",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          🤖 AI Recommendations
        </h2>

        <span className="rounded-lg bg-purple-900 px-3 py-1 text-sm text-purple-400">
          AI
        </span>

      </div>

      <div className="mt-6 space-y-4">

        {recommendations.map((item) => (
          <div
            key={item.title}
            className="rounded-lg bg-slate-800 p-4 transition hover:bg-slate-700"
          >
            <h3 className="font-semibold text-white">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {item.description}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}