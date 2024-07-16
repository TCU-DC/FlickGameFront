"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToPlay = () => {
    router.push("/play");
  };

  return (
    <main>
      <h1>Flick Game!!</h1>
      <button onClick={navigateToPlay}>Play画面へ遷移</button>
    </main>
  );
}
