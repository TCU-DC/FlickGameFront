import type {
  FlickHiraganaKeyData,
  HiraganaSwitchList,
} from "@/models/flickKeyTypes";

// フリックキーデータ（ひらがな）
export const flickHiraganaKeyData: FlickHiraganaKeyData = {
  あ: {
    Right: "え",
    Left: "い",
    Up: "う",
    Down: "お",
  },
  か: {
    Right: "け",
    Left: "き",
    Up: "く",
    Down: "こ",
  },
  さ: {
    Right: "せ",
    Left: "し",
    Up: "す",
    Down: "そ",
  },
  た: {
    Right: "て",
    Left: "ち",
    Up: "つ",
    Down: "と",
  },
  な: {
    Right: "ね",
    Left: "に",
    Up: "ぬ",
    Down: "の",
  },
  は: {
    Right: "へ",
    Left: "ひ",
    Up: "ふ",
    Down: "ほ",
  },
  ま: {
    Right: "め",
    Left: "み",
    Up: "む",
    Down: "も",
  },
  や: {
    Right: "」",
    Left: "「",
    Up: "ゆ",
    Down: "よ",
  },
  ら: {
    Right: "れ",
    Left: "り",
    Up: "る",
    Down: "ろ",
  },
  わ: {
    Right: "ー",
    Left: "を",
    Up: "ん",
    Down: "",
  },
  "、": {
    Right: "！",
    Left: "。",
    Up: "？",
    Down: "",
  },
};

// ひらがな変換リスト
export const hiraganaSwitchList: HiraganaSwitchList = [
  ["あ", "ぁ"],
  ["い", "ぃ"],
  ["う", "ぅ"],
  ["え", "ぇ"],
  ["お", "ぉ"],
  ["か", "が"],
  ["き", "ぎ"],
  ["く", "ぐ"],
  ["け", "げ"],
  ["こ", "ご"],
  ["さ", "ざ"],
  ["し", "じ"],
  ["す", "ず"],
  ["せ", "ぜ"],
  ["そ", "ぞ"],
  ["た", "だ"],
  ["ち", "ぢ"],
  ["つ", "っ", "づ"],
  ["て", "で"],
  ["と", "ど"],
  ["は", "ば", "ぱ"],
  ["ひ", "び", "ぴ"],
  ["ふ", "ぶ", "ぷ"],
  ["へ", "べ", "ぺ"],
  ["ほ", "ぼ", "ぽ"],
  ["や", "ゃ"],
  ["ゆ", "ゅ"],
  ["よ", "ょ"],
];
