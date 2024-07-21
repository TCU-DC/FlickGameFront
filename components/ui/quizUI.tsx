import React, { useEffect, useState } from "react";
import styles from "@/styles/quizui.module.scss";

type QuizUIProps = {
  leftTime: number;
  question: string;
  question_furigana: string;
  userInput: string | "";
};

const QuizUI: React.FC<QuizUIProps> = ({
  leftTime,
  question,
  question_furigana,
  userInput,
}) => {
  const [timePercentage, setTimePercentage] = useState(0);

  // leftTimeの範囲を0〜100に正規化する関数
  const calculateTimePercentage = (time: number) => {
    const maxTime = 100; // 例えば最大時間を100と仮定
    return (time / maxTime) * 100;
  };

  // leftTimeが変わるたびにバーの幅を更新
  useEffect(() => {
    setTimePercentage(calculateTimePercentage(leftTime));
  }, [leftTime]);

  return (
    <div className={styles["quiz-container"]}>
      <div className={styles["time"]}>
        {leftTime}
        <span className={styles.tUnit}>秒</span>
      </div>
      <div className={styles["time-bar-container"]}>
        <div
          className={styles["time-bar"]}
          style={{ width: `${timePercentage}%` }}
        />
      </div>
      <div className={styles["user-input"]}>{userInput}</div>
      <div className={styles.question}>
        <span className={styles.qLabel}>問題:</span> {question}（
        {question_furigana}）
      </div>
    </div>
  );
};

export default QuizUI;
