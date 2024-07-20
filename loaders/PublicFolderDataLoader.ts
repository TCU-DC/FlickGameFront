import fs from "fs";
import path from "path";
import { WordDataLoader } from "@/interfaces/WordDataLoader";
import { WordListResponse } from "@/models/word";

export class PublicFolderDataLoader implements WordDataLoader {
  async load(): Promise<WordListResponse> {
    const filePath = path.join(process.cwd(), "public", "words.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data: WordListResponse = JSON.parse(jsonData);
    return data;
  }
}
