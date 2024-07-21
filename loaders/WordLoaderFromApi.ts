import { DataLoader } from "@/interfaces/DataLoader";
import { WordListResponse } from "@/models/word";

export class WordLoaderFromApi implements DataLoader<WordListResponse> {
  private readonly BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  private readonly ENDPOINT = "/word-get";
  private readonly URL = new URL(`${this.BASE_URL}${this.ENDPOINT}`);
  private readonly LEVEL = "easy";
  private readonly COUNT = "10";

  constructor() {
    const randomString = Math.random().toString(36).slice(-8);
    this.URL.searchParams.append("level", this.LEVEL);
    this.URL.searchParams.append("count", this.COUNT);
    this.URL.searchParams.append("_=", randomString);
  }

  async load(): Promise<WordListResponse> {
    console.log(this.BASE_URL);

    const response = await fetch(this.URL);
    const data: WordListResponse = await response.json();

    console.log("WordLoaderFromApi", data);

    return data;
  }
}
