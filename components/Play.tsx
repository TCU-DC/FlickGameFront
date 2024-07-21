"use client";

import { useState, useEffect } from "react";
import { WordListResponse } from "@/models/word";
import { useRouter } from "next/navigation";

import FlickKeyboard from "@/components/flick/FlickKeyboard";
import { ScoreRequest } from "@/models/ScoreRequest";
import { ScorePoster } from "@/sender/ScorePoster";
import GameUI from "@/components/ui/gameUI";
import QuizUI from "@/components/ui/quizUI";

type PlayProps = {
  response: WordListResponse;
};

const Play = ({ response }: PlayProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [time, setTime] = useState(response.limit_time);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time <= 0) {
        localStorage.setItem("score", currentScore.toString());
        router.push("/result");
        return;
      }

      setTime(time - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentScore, router, time]);

  const currentWord = response.words[currentIndex];

  useEffect(() => {
    if (response) {
      setLoading(false);
    }
  }, [response]);

  useEffect(() => {
    const nextIndex = currentIndex + 1;
    const newScore = currentScore + currentWord.point_allocation;

    if (!isCorrect) return;

    const handleNextQuestion = () => {
      if (nextIndex < response.words.length) {
        setCurrentIndex(nextIndex);
        setCurrentScore(newScore);
      } else {
        const scoreRequest: ScoreRequest = {
          point: newScore,
          level: response.words[0].word_level,
        };

        const poster = new ScorePoster();

        try {
          poster.post(scoreRequest);
        } catch (e) {
          console.error(e);
        }

        localStorage.setItem("score", newScore.toString());
        router.push("/result");
      }

      setUserInput("");
      setIsCorrect(false);
    };

    const delayNextQuestion = () => {
      setTimeout(handleNextQuestion, 1000);
    };

    delayNextQuestion();
  }, [
    currentIndex,
    currentScore,
    currentWord.point_allocation,
    isCorrect,
    response.words,
    response.words.length,
    router,
  ]);

  const handleSetUserInput = (input: string) => {
    setUserInput(input);
    setIsCorrect(input === currentWord.word_furigana);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <h1>Play画面</h1> */}
      <QuizUI
        leftTime={time}
        question={currentWord.word_text}
        question_furigana={currentWord.word_furigana}
        userInput={userInput}
      />

      <GameUI userInput={userInput} isCorrect={isCorrect} />
      <FlickKeyboard
        userInput={userInput}
        handleSetUserInput={handleSetUserInput}
      />
    </>
  );
};

export default Play;
