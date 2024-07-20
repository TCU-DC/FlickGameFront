import NavigateButton from "@/components/NavigateButton";
import styles from "./page.module.scss";
import Image from "next/image";

import backImg from "@/public/images/samurai/samurai-default.svg";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.blurCircle1}></div>
      <div className={styles.blurCircle2}></div>

      <div className={styles.landingPage}>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.info}>
              <h1 className={styles.h1}>WAGIRI!!</h1>
              <p className={styles.parag}>
                「WAGIRI!!」は、日本の和食をテーマにしたユニークなオンラインタイピングWEBアプリです。スマホのフリック入力に対応しており、楽しくタイピングスキルを磨くことができます。流れてくる和食の名前をタイピングすることで、日本の文化にも触れられます。さらに、ランキング機能を搭載しているので、他のユーザーと競い合いながらスコアを伸ばす楽しさも味わえます。さあ、「WAGIRI!!」でタイピングの達人を目指しましょう！
              </p>
              {/* <button className={styles.btn}> */}
              <NavigateButton to="play" label="Play" />
              {/* </button> */}
            </div>
            <div className={styles.image}>
              <Image
                className={styles.mainImage}
                alt="home"
                src={backImg}
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
