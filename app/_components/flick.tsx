"use client";

import React, { useState } from "react";
import { useSwipeable, SwipeableHandlers } from "react-swipeable";
import {
  flickHiraganaKeyData,
  hiraganaSwitchList,
} from "@/app/_components/flickKeyData";
import type { FlickDirection } from "@/app/_components/flickKeyTypes";

interface HiraganaKeyProps {
  kana: string;
  handlePutKana: Function;
}

// フリックボタン コンポーネント
const HiraganaKey: React.FC<HiraganaKeyProps> = ({ kana, handlePutKana }) => {
  // 親コンポーネントに入力文字を渡す
  const putKana = (text: string): void => {
    handlePutKana(text);
  };
  // フラグの初期化
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  const [isSwipingUp, setIsSwipingUp] = useState(false);
  const [isSwipingDown, setIsSwipingDown] = useState(false);
  // スワイプ時のイベントハンドラ
  const handlers: SwipeableHandlers = useSwipeable({
    onSwiped: (eventData) => {
      // TODO: Any を避ける
      console.log(
        flickHiraganaKeyData[(eventData.event.target as any).dataset.kana][
          eventData.dir as FlickDirection
        ],
      );
      putKana(
        flickHiraganaKeyData[(eventData.event.target as any).dataset.kana][
          eventData.dir as FlickDirection
        ],
      );
    },
    onTap: (eventData) => {
      console.log((eventData.event.target as any).dataset.kana);
      putKana((eventData.event.target as any).dataset.kana);
    },
    onSwiping: (eventData) => {
      // スワイプ方向にかな表示を行うためのフラグを設定
      setIsSwipingRight(eventData.dir === ("Right" as FlickDirection));
      setIsSwipingLeft(eventData.dir === ("Left" as FlickDirection));
      setIsSwipingUp(eventData.dir === ("Up" as FlickDirection));
      setIsSwipingDown(eventData.dir === ("Down" as FlickDirection));
    },
    onTouchEndOrOnMouseUp: () => {
      // スワイプ終了時にフラグをリセット
      setIsSwipingRight(false);
      setIsSwipingLeft(false);
      setIsSwipingUp(false);
      setIsSwipingDown(false);
    },
    swipeDuration: 5000,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });
  return (
    // フリックボタン
    <div
      {...handlers}
      data-kana={kana}
      className="m-0.5 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:border-neutral-300"
    >
      {kana}
      {
        // 右にスワイプしている場合、右にかな表示を行う
        isSwipingRight && flickHiraganaKeyData[kana].Right && (
          <div className="absolute bg-gray-200 text-gray-800 p-2 rounded-lg ml-8">
            {flickHiraganaKeyData[kana].Right}
          </div>
        )
      }
      {
        // 左にスワイプしている場合、左にかな表示を行う
        isSwipingLeft && flickHiraganaKeyData[kana].Left && (
          <div className="absolute bg-gray-200 text-gray-800 p-2 rounded-lg -ml-12">
            {flickHiraganaKeyData[kana].Left}
          </div>
        )
      }
      {
        // 上にスワイプしている場合、上にかな表示を行う
        isSwipingUp && flickHiraganaKeyData[kana].Up && (
          <div className="absolute bg-gray-200 text-gray-800 p-2 mb-20 rounded-lg -ml-2">
            {flickHiraganaKeyData[kana].Up}
          </div>
        )
      }
      {
        // 下にスワイプしている場合、下にかな表示を行う
        isSwipingDown && flickHiraganaKeyData[kana].Down && (
          <div className="absolute bg-gray-200 text-gray-800 p-2 mt-20 rounded-lg -ml-2">
            {flickHiraganaKeyData[kana].Down}
          </div>
        )
      }
    </div>
  );
};

// 無効化ボタン コンポーネント
const KeyDisable: React.FC = () => {
  return (
    <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-500 text-white disabled:opacity-50 disabled:pointer-events-none">
      　
    </button>
  );
};

// フリック入力UIコンポーネント
export function Flick(): JSX.Element {
  const [text, setText] = useState("");
  const handlePutKana = (kana: string): void => {
    setText(`${text}${kana}`);
  };
  const deleteText = (): void => {
    setText(text.slice(0, -1));
  };
  const switchLetter = (): void => {
    const lastLetter = text.slice(-1);
    // lastLetter を二次元配列 hiraganaSwitchList の中から検索し、位置を取得
    let index: number = 0;
    let notFound: boolean = true;
    for (let i = 0; i < hiraganaSwitchList.length; i++) {
      if (hiraganaSwitchList[i].includes(lastLetter)) {
        index = i;
        notFound = false;
        break;
      }
    }
    if (!notFound) {
      // 位置を元に二次元配列の中の次の文字を取得
      const nextLetter =
        hiraganaSwitchList[index][
          (hiraganaSwitchList[index].indexOf(lastLetter) + 1) %
            hiraganaSwitchList[index].length
        ];
      setText(`${text.slice(0, -1)}${nextLetter}`);
    }
  };

  return (
    <div>
      {text}
      <br />
      <KeyDisable />
      <HiraganaKey kana={"あ"} handlePutKana={handlePutKana}></HiraganaKey>
      <HiraganaKey kana={"か"} handlePutKana={handlePutKana}></HiraganaKey>
      <HiraganaKey kana={"さ"} handlePutKana={handlePutKana}></HiraganaKey>
      <div
        onClick={deleteText}
        className="m-0.5 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:border-neutral-300"
      >
        ←
      </div>
      <br />
      <KeyDisable />
      <HiraganaKey kana={"た"} handlePutKana={handlePutKana}></HiraganaKey>
      <HiraganaKey kana={"な"} handlePutKana={handlePutKana}></HiraganaKey>
      <HiraganaKey kana={"は"} handlePutKana={handlePutKana}></HiraganaKey>
      <KeyDisable />
      <br />
      <KeyDisable />
      <HiraganaKey kana={"ま"} handlePutKana={handlePutKana}></HiraganaKey>
      <HiraganaKey kana={"や"} handlePutKana={handlePutKana}></HiraganaKey>
      <HiraganaKey kana={"ら"} handlePutKana={handlePutKana}></HiraganaKey>
      <KeyDisable />
      <br />
      <KeyDisable />
      <div
        onClick={switchLetter}
        className="m-0.5 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:border-neutral-300"
      >
        変
      </div>
      <HiraganaKey kana={"わ"} handlePutKana={handlePutKana}></HiraganaKey>
      <HiraganaKey kana={"、"} handlePutKana={handlePutKana}></HiraganaKey>
      <KeyDisable />
    </div>
  );
}
