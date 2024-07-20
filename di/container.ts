import { DataLoader } from "@/interfaces/DataLoader";
import { RankingLoaderFromLocal } from "@/loaders/RankingLoaderFromLocal";
import { WordLoaderFromLocal } from "@/loaders/WordLoaderFromLocal";
import { RankingResponse } from "@/models/ranking";
import { WordListResponse } from "@/models/word";

export class Container {
  private static instance: Container;
  private wordLoader: DataLoader<WordListResponse>;
  private rankingLoader: DataLoader<RankingResponse>;

  private constructor() {
    this.wordLoader = new WordLoaderFromLocal();
    this.rankingLoader = new RankingLoaderFromLocal();
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public getWordLoader(): DataLoader<WordListResponse> {
    return this.wordLoader;
  }

  public getRankingLoader(): DataLoader<RankingResponse> {
    return this.rankingLoader;
  }
}
