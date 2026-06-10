export type Character = {
  name: string;
  silver: number;
  focus: number;
  islands: number;
};

export const emptyCharacter: Character = {
  name: "",
  silver: 0,
  focus: 30000,
  islands: 0,
};