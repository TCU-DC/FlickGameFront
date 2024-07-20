import fs from "fs";
import path from "path";
import { WordListResponse } from "@/models/word";
import { DataLoader } from "@/interfaces/DataLoader";
import { RankingResponse } from "@/models/ranking";

export class RankingLoaderFromLocal implements DataLoader<RankingResponse> {
  async load(): Promise<RankingResponse> {
    const filePath = path.join(process.cwd(), "public", "ranking.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data: RankingResponse = JSON.parse(jsonData);
    return data;
  }
}
