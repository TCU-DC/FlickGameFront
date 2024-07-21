import { DataLoader } from "@/interfaces/DataLoader";
import { RankingResponse } from "@/models/ranking";

export class RankingLoaderFromApi implements DataLoader<RankingResponse> {
  private readonly BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  private readonly ENDPOINT = "/get-ranking";
  private readonly URL = new URL(`${this.BASE_URL}${this.ENDPOINT}`);
  private readonly LEVEL = "easy";
  private readonly HIGH_ORDER = "3";

  constructor() {
    const randomString = Math.random().toString(36).slice(-8);
    this.URL.searchParams.append("level", this.LEVEL);
    this.URL.searchParams.append("high_order", this.HIGH_ORDER);
    this.URL.searchParams.append("_=", randomString);
  }

  async load(): Promise<RankingResponse> {
    const response = await fetch(this.URL);
    const data: RankingResponse = await response.json();

    return data;
  }
}
