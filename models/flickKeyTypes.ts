// フリック入力の方向を表す型
export type FlickDirection = "Right" | "Left" | "Up" | "Down";

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
