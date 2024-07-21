import { DataLoader } from "@/interfaces/DataLoader";
import { WordListResponse } from "@/models/word";

export class WordLoaderFromApi implements DataLoader<WordListResponse> {
  private readonly BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  private readonly ENDPOINT = "/word-get";
  private readonly URL = new URL(`${this.BASE_URL}${this.ENDPOINT}`);
  private readonly LEVEL = "easy";
  private readonly COUNT = "10";

  constructor() {
    this.URL.searchParams.append("level", this.LEVEL);
    this.URL.searchParams.append("count", this.COUNT);
  }

  async load(): Promise<WordListResponse> {
    console.log(this.BASE_URL);

    const response = await fetch(this.URL, { cache: "no-store" });
    const data: WordListResponse = await response.json();

    console.log("WordLoaderFromApi", data);

    return data;
  }
}
