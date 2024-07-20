"use client";

import { useState, useEffect } from "react";
import NavigateButton from "@/components/NavigateButton";
import { WordListResponse } from "@/models/word";
import { useRouter } from "next/navigation";

import FlickKeyboard from "@/components/flick/FlickKeyboard";
import { ScoreRequest } from "@/models/scoreRequest";
import { ScorePoster } from "@/sender/ScorePoster";

type PlayProps = {
  response: WordListResponse;
};

const Play = ({ response }: PlayProps) => {
  const router = useRouter();
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [time, setTime] = useState(response.limit_time);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        localStorage.setItem("score", currentScore.toString());
        router.push("/result");
        return;
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentScore, loading, response.limit_time, router, time]);

  const currentWord = response.words[currentIndex];

  useEffect(() => {
    if (response) {
      setLoading(false);
    }
  }, [response]);

  const handleNextWord = () => {
    const nextIndex = currentIndex + 1;
    const newScore = currentScore + currentWord.point_allocation;

    if (!isCorrect) return;
    if (nextIndex < response.words.length) {
      setCurrentScore(newScore);
      setCurrentIndex(nextIndex);
    } else {
      setIsFinished(true);
      localStorage.setItem("score", newScore.toString());

      const scoreRequest: ScoreRequest = {
        point: newScore,
        level: response.words[0].word_level,
      };

      const scorePoster = new ScorePoster();
      scorePoster.post(scoreRequest);
    }

    setUserInput("");
    setIsCorrect(false);
  };

  const handleSetUserInput = (input: string) => {
    setUserInput(input);
    setIsCorrect(input === currentWord.word_furigana);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Play画面</h1>
      <p>残り時間：{time}</p>
      <p>{currentWord.word_text}</p>
      <p className="h-8">{userInput}</p>
      {isFinished ? <NavigateButton to="result" label="結果画面へ" /> : <></>}
      <FlickKeyboard
        userInput={userInput}
        handleSetUserInput={handleSetUserInput}
        onClickEnter={handleNextWord}
      />
    </main>
  );
};

export default Play;
