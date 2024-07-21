"use client";

import NavigateButton from "@/components/NavigateButton";
import Image from "next/image";
import gsap from "gsap";
import styles from "@/styles/welcome.module.scss";

import backImg from "@/public/images/samurai/samurai-home.svg";
import { useEffect } from "react";

export default function Welcome() {
  useEffect(() => {
    gsap
      .timeline()
      .fromTo(
        `.${styles.info} > *`,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.2,
        },
      )
      .fromTo("image", { y: 100, opacity: 0 }, { y: 0, opacity: 1 });
  }, []);

  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h1 className={styles.h1}>WAGIRI!!</h1>
            <p className={styles.parag}>
              「WAGIRI!!」は、日本をテーマにしたオンラインタイピングWEBアプリです。スマホのフリック入力に対応しており、スピードを要する侍の緊張を表現。さらに、ランキング機能を搭載しているので、他のユーザーと競い合いながらスコアを伸ばす楽しさも味わえます。さあ、「WAGIRI!!」でタイピングの達人を目指しましょう！
            </p>
            <NavigateButton to="play" label="Play" />
          </div>
          <div className={`${styles.image} "image"`}>
            <Image
              className={styles.mainImage}
              alt="samurai"
              src={backImg}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
