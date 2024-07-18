import { WordDataLoader } from "@/interfaces/WordDataLoader";
import { PublicFolderDataLoader } from "@/loaders/PublicFolderDataLoader";

export class Container {
  private static instance: Container;
  private dataLoader: WordDataLoader;

  private constructor() {
    this.dataLoader = new PublicFolderDataLoader();
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public getDataLoader(): WordDataLoader {
    return this.dataLoader;
  }
}
