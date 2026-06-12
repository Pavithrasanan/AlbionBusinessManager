import { IDataProvider } from "./IDataProvider";

export class AlbionGameDataProvider
  implements IDataProvider {

  async getItems(): Promise<any[]> {
    throw new Error(
      "Not implemented"
    );
  }

  async getRecipes(): Promise<any[]> {
    throw new Error(
      "Not implemented"
    );
  }

  async getRecipeIngredients(): Promise<any[]> {
    throw new Error(
      "Not implemented"
    );
  }
}