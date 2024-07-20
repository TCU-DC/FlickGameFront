"use client";

import { useEffect, useState } from "react";
import { RankingResponse } from "@/models/ranking";
import NavigateButton from "@/components/NavigateButton";

type ResultProps = {
  response: RankingResponse;
};

export const Result = ({ response }: ResultProps) => {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const getItem = localStorage.getItem("score");
    if (getItem) {
      setScore(parseInt(getItem));
    }
  }, []);

  const level = response.level;
  const ranking = response.ranking;

  useEffect(() => {
    if (response) {
      setLoading(false);
    }
  }, [response]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Result画面</h1>
      <p>あなたのスコア : {score ? score : 0}点です</p>
      <h2>レベル: {level}</h2>
      <h2>ランキング</h2>
      <ol>
        {ranking.map((ranking, index) => (
          <li key={index}>
            {index + 1}位 {ranking.nickname} : {ranking.score}点
          </li>
        ))}
      </ol>
      <NavigateButton to="" label="最初の画面へ" />
    </main>
  );
};
