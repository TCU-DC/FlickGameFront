import styles from "@/styles/game.module.scss";
import Image from "next/image";

export default function Game({
  isFinished,
  userInput,
  isCorrect,
}: {
  isFinished: boolean;
  userInput: string;
  isCorrect: boolean;
}) {
  // 画像や背景を決定するロジック
  const getBackgroundImage = () => {
    if (isCorrect) return "/images/slash.gif";
    return "/images/background.webp";
  };

  const getSamuraiImage = () => {
    if (userInput) return "/images/samurai/samurai-stanby.svg";
    if (isCorrect) return "/images/samurai/samurai-end.svg";
    return `/images/samurai/samurai-default.svg`;
  };

  const getEnemyImage = () => {
    if (isFinished) return "/images/enemy/nemy-die.svg";
    if (isCorrect) return "/images/enemy/enemy-die.svg";
    return `/images/enemy/enemy-default.svg`;
  };

  return (
    <section className={styles.gameUI}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      ></div>
      {!isCorrect && (
        <div className={styles.samurai}>
          <Image
            src={getSamuraiImage()}
            alt="Samurai"
            width={200}
            height={200}
          />
        </div>
      )}
      {!isCorrect && (
        <div className={styles.enemy}>
          <Image src={getEnemyImage()} alt="Enemy" width={200} height={200} />
        </div>
      )}
    </section>
  );
}
