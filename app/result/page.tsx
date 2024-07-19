"use client";

import NavigateButton from "@/components/NavigateButton";

export default function Result() {
  const score = localStorage.getItem("score");

  return (
    <main>
      <h1>Result画面</h1>
      <p>あなたのスコア : {score ? score : 0}点です</p>
      <NavigateButton to="" label="最初の画面へ" />
    </main>
  );
}
