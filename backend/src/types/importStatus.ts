export interface ImportStatus {
  items: number;
  recipes: number;
  ingredients: number;

  startedAt: Date;
  finishedAt?: Date;
}