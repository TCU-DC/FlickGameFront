import fs from "fs";
import path from "path";
import { WordListResponse } from "@/models/word";
import { DataLoader } from "@/interfaces/DataLoader";

export class WordLoaderFromLocal implements DataLoader<WordListResponse> {
  async load(): Promise<WordListResponse> {
    const filePath = path.join(process.cwd(), "public", "words.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data: WordListResponse = JSON.parse(jsonData);
    return data;
  }
}
