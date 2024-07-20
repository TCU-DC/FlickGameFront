import { WordListResponse } from "@/models/word";

export interface WordDataLoader {
  load(): Promise<WordListResponse>;
}
