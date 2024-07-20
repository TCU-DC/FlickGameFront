import NavigateButton from "@/components/NavigateButton";

export default function Home() {
  return (
    <main className="container">
      <h2 className="text-7xl font-bold title">
        <span>WAGIRI!!</span>
      </h2>

      <p className="explain">
        「WAGIRI!!」は、日本の和食をテーマにしたユニークなオンラインタイピングWEBアプリです。
      </p>
      <p className="explain">
        スマホのフリック入力に対応しており、楽しくタイピングスキルを磨くことができます。
      </p>
      <p className="explain">
        流れてくる和食の名前をタイピングすることで、日本の文化にも触れられます。
      </p>
      <p className="explain">
        さらに、ランキング機能を搭載しているので、他のユーザーと競い合いながらスコアを伸ばす楽しさも味わえます。
      </p>

      <p className="explain">
        さあ、「WAGIRI!!」でタイピングの達人を目指しましょう！
      </p>
      <NavigateButton to="play" label="Play" />
    </main>
  );
}
