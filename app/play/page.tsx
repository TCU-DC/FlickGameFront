"use client";

import { useRouter } from "next/navigation";

export default function Play() {
  const router = useRouter();

  const navigateToResult = () => {
    router.push("/result");
  };

  return (
    <main>
      <h1>Play画面</h1>
      <button onClick={navigateToResult}>結果</button>
    </main>
  );
}
