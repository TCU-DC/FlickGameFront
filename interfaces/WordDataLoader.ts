import { WordList } from "@/models/word";

export interface WordDataLoader {
  load(): Promise<WordList>;
}
