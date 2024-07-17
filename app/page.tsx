import NavigateButton from "@/components/NavigateButton";

export default function Home() {
  return (
    <main>
      <h1>Home画面</h1>
      <NavigateButton to="play" label="Playへ" />
    </main>
  );
}
