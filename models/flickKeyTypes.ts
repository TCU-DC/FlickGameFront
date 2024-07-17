// フリック入力の方向を表す型
export type FlickDirection = "Right" | "Left" | "Up" | "Down";

// フリックデータを表す型
export interface FlickDirectionData {
  Right: string;
  Left: string;
  Up: string;
  Down: string;
}

// フリックひらがなデータ全体を表す型
export interface FlickHiraganaKeyData {
  [key: string]: FlickDirectionData;
}

// ひらがな変換リスト
export type HiraganaSwitchList = string[][];
