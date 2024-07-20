import { RankingResponse } from "@/models/ranking";

export interface DataLoader<T extends Response> {
  load(): Promise<T>;
}
