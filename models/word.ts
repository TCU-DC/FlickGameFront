export interface Word {
  word_id: string;
  word_text: string;
  word_furigana: string;
  word_level: string;
  point_allocation: number;
}

export interface WordListResponse {
  words: Word[];
  limit_time: number;
}
