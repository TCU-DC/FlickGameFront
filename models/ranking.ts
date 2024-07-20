export interface Ranking {
  user_id: string;
  nickname: string;
  score: number;
}

export interface RankingResponse extends Response {
  level: string;
  rankings: Ranking[];
}
