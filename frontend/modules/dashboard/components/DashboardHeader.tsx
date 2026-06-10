"use client";

import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const [name, setName] = useState("Adventurer");

  useEffect(() => {
    const saved = localStorage.getItem("character");

    if (saved) {
      const character = JSON.parse(saved);

      if (character.name) {
        setName(character.name);
      }
    }
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-4xl font-bold text-white">
        🏰 Albion Business Manager
      </h1>

      <p className="mt-3 text-slate-400">
        Welcome back, <span className="text-white font-semibold">{name}</span> 👋
      </p>
    </div>
  );
}