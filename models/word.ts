export interface Word {
  content: string;
  furigana: string;
  point: number;
  level: string;
}

export interface WordItem {
  word: Word;
}

export interface WordList {
  words: Word[];
}
