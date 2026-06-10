"use client";

import { useEffect, useState } from "react";

type Character = {
  name: string;
  silver: number;
  focus: number;
  islands: number;
};

export default function DashboardStats() {
  const [character, setCharacter] = useState<Character>({
    name: "",
    silver: 0,
    focus: 30000,
    islands: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("character");

    if (saved) {
      setCharacter(JSON.parse(saved));
    }
  }, []);

  const stats = [
    {
      title: "💰 Silver",
      value: character.silver.toLocaleString(),
    },
    {
      title: "⚡ Focus",
      value: character.focus.toLocaleString(),
    },
    {
      title: "🏝 Islands",
      value: character.islands.toString(),
    },
    {
      title: "📈 Today's Profit",
      value: "0",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <div className="text-slate-400">
            {item.title}
          </div>

          <div className="mt-3 text-3xl font-bold text-white">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}