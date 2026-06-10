"use client";

import { useEffect, useState } from "react";
import { Character } from "@/data/character";
import {
  loadCharacter,
  saveCharacter,
} from "@/services/characterService";

export function useCharacter() {
  const [character, setCharacter] =
    useState<Character>(loadCharacter());

  useEffect(() => {
    saveCharacter(character);
  }, [character]);

  return {
    character,
    setCharacter,
  };
}