// ひらがな変換リストの型
export type HiraganaSwitchList = string[][];

export interface FlickDirectionData {
  Right: string;
  Left: string;
  Up: string;
  Down: string;
}

export interface FlickHiraganaKeyData {
  [key: string]: FlickDirectionData;
}
