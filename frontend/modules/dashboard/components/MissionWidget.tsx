export default function MissionWidget() {
  const missions = [
    {
      title: "Complete 1 profitable trade",
      progress: "0 / 1",
    },
    {
      title: "Analyze 5 market items",
      progress: "0 / 5",
    },
    {
      title: "Earn 1,000,000 silver",
      progress: "0 / 1,000,000",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          🎯 Today's Missions
        </h2>

        <span className="rounded-lg bg-blue-900 px-3 py-1 text-sm text-blue-400">
          DAILY
        </span>

      </div>

      <div className="mt-6 space-y-4">

        {missions.map((mission) => (
          <div
            key={mission.title}
            className="rounded-lg bg-slate-800 p-4"
          >
            <div className="flex items-center justify-between">

              <span className="font-medium">
                {mission.title}
              </span>

              <span className="text-sm text-slate-400">
                {mission.progress}
              </span>

            </div>

            <div className="mt-3 h-2 rounded-full bg-slate-700">

              <div className="h-2 w-0 rounded-full bg-green-500"></div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}