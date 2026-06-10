export default function CharacterProfile() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-white">
        👤 Character Profile
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div>
          <label className="text-slate-400">
            Character Name
          </label>

          <input
            className="mt-2 w-full rounded-lg bg-slate-800 p-3 text-white"
            placeholder="Enter character name"
          />
        </div>

        <div>
          <label className="text-slate-400">
            Current Silver
          </label>

          <input
            className="mt-2 w-full rounded-lg bg-slate-800 p-3 text-white"
            placeholder="0"
          />
        </div>

        <div>
          <label className="text-slate-400">
            Current Focus
          </label>

          <input
            className="mt-2 w-full rounded-lg bg-slate-800 p-3 text-white"
            placeholder="30000"
          />
        </div>

        <div>
          <label className="text-slate-400">
            Number of Islands
          </label>

          <input
            className="mt-2 w-full rounded-lg bg-slate-800 p-3 text-white"
            placeholder="0"
          />
        </div>

      </div>
    </div>
  );
}