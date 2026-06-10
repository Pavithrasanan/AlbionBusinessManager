import { Character, emptyCharacter } from "@/data/character";

const STORAGE_KEY = "abm-character";

export function loadCharacter(): Character {
  if (typeof window === "undefined") {
    return emptyCharacter;
  }

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return emptyCharacter;
  }

  try {
    return JSON.parse(data);
  } catch {
    return emptyCharacter;
  }
}

export function saveCharacter(character: Character) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(character)
  );
}

export function clearCharacter() {
  localStorage.removeItem(STORAGE_KEY);
}