import { DataLoader } from "@/interfaces/DataLoader";
import { DataPoster } from "@/interfaces/DataPoster";
import { RankingLoaderFromLocal } from "@/loaders/RankingLoaderFromLocal";
import { WordLoaderFromLocal } from "@/loaders/WordLoaderFromLocal";
import { RankingResponse } from "@/models/ranking";
import { ScoreRequest } from "@/models/scoreRequest";
import { WordListResponse } from "@/models/word";
import { ScorePoster } from "@/sender/ScorePoster";

export class Container {
  private static instance: Container;
  private wordLoader: DataLoader<WordListResponse>;
  private rankingLoader: DataLoader<RankingResponse>;
  private scorePoster: DataPoster<ScoreRequest>;

  private constructor() {
    this.wordLoader = new WordLoaderFromLocal();
    this.rankingLoader = new RankingLoaderFromLocal();
    this.scorePoster = new ScorePoster();
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

  public getScorePoster(): DataPoster<ScoreRequest> {
    return this.scorePoster;
  }
}
