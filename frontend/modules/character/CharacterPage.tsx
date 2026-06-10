"use client";

import { useEffect, useState } from "react";
import { emptyCharacter, Character } from "../../data/character";

export default function CharacterPage() {
  const [character, setCharacter] =
    useState<Character>(emptyCharacter);

  // Load saved character on startup
  useEffect(() => {
    const saved = localStorage.getItem("character");

    if (saved) {
      setCharacter(JSON.parse(saved));
    }
  }, []);

  // Save character
  const saveCharacter = () => {
    localStorage.setItem(
      "character",
      JSON.stringify(character)
    );

    alert("✅ Character saved successfully!");
  };

  // Reset character
  const resetCharacter = () => {
    if (
      confirm(
        "Are you sure you want to clear this character?"
      )
    ) {
      localStorage.removeItem("character");
      setCharacter(emptyCharacter);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-lg">

          <h1 className="text-3xl font-bold">
            👤 Character Setup
          </h1>

          <p className="text-slate-400 mt-2">
            Configure your Albion character. This information
            will be used throughout the application.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div>
              <label className="block mb-2 text-slate-300">
                Character Name
              </label>

              <input
                type="text"
                className="w-full rounded-lg bg-slate-800 p-3 outline-none border border-slate-700"
                placeholder="Enter character name"
                value={character.name}
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Current Silver
              </label>

              <input
                type="number"
                className="w-full rounded-lg bg-slate-800 p-3 outline-none border border-slate-700"
                value={character.silver}
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    silver: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Current Focus
              </label>

              <input
                type="number"
                className="w-full rounded-lg bg-slate-800 p-3 outline-none border border-slate-700"
                value={character.focus}
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    focus: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Number of Islands
              </label>

              <input
                type="number"
                className="w-full rounded-lg bg-slate-800 p-3 outline-none border border-slate-700"
                value={character.islands}
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    islands: Number(e.target.value),
                  })
                }
              />
            </div>

          </div>

          <div className="flex gap-4 mt-8">

            <button
              onClick={saveCharacter}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              💾 Save Character
            </button>

            <button
              onClick={resetCharacter}
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
            >
              🗑 Clear
            </button>

          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">

          <h2 className="text-2xl font-bold">
            📋 Current Profile
          </h2>

          <div className="mt-4 space-y-2 text-lg">

            <p>
              <strong>Name:</strong>{" "}
              {character.name || "Not Set"}
            </p>

            <p>
              <strong>Silver:</strong>{" "}
              {character.silver.toLocaleString()}
            </p>

            <p>
              <strong>Focus:</strong>{" "}
              {character.focus.toLocaleString()}
            </p>

            <p>
              <strong>Islands:</strong>{" "}
              {character.islands}
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}