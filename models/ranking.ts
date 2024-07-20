export interface Ranking {
  user_id: string;
  nickname: string;
  score: number;
}

export interface RankingResponse {
  level: string;
  rankings: Ranking[];
}
