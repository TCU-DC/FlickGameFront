"use client";

import { useState, useEffect } from "react";
import NavigateButton from "@/components/NavigateButton";
import { WordList } from "@/models/word";

type PlayProps = {
  data: WordList;
};

const Play = ({ data }: PlayProps) => {
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentWord = data.words[currentIndex];

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const handleNextWord = () => {
    const nextIndex = currentIndex + 1;
    setIsFinished(nextIndex >= data.words.length);

    if (nextIndex < data.words.length) {
      setCurrentIndex(nextIndex);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Play画面</h1>
      <p>{currentWord.word.content}</p>
      {isFinished ? (
        <NavigateButton to="result" label="結果画面へ" />
      ) : (
        <button type="button" onClick={handleNextWord}>
          次のWordへ
        </button>
      )}
    </main>
  );
};

export default Play;
