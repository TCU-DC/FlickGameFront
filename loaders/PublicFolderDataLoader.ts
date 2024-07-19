import fs from "fs";
import path from "path";
import { WordDataLoader } from "@/interfaces/WordDataLoader";
import { WordList } from "@/models/word";

export class PublicFolderDataLoader implements WordDataLoader {
  async load(): Promise<WordList> {
    const filePath = path.join(process.cwd(), "public", "words.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data: WordList = JSON.parse(jsonData);
    return data;
  }
}
