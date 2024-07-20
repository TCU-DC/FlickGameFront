import { RankingResponse } from "@/models/ranking";

export interface DataLoader<T> {
  load(): Promise<T>;
}
