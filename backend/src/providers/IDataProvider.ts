export interface IDataProvider {
  getItems(): Promise<any[]>;

  getRecipes(): Promise<any[]>;

  getRecipeIngredients(): Promise<any[]>;
}