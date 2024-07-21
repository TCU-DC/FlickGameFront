"use client";

import { useEffect, useState, useRef } from "react";
import { RankingResponse } from "@/models/ranking";
import NavigateButton from "@/components/NavigateButton";
import styles from "@/styles/result.module.scss";
import Image from "next/image";
import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin);

type ResultProps = {
  response: RankingResponse;
};

export const Result = ({ response }: ResultProps) => {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { clipPath: "inset(120% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1 },
        );

        gsap.fromTo(
          imageRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, delay: 1 },
        );
      }
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section ref={containerRef} className={styles.result}>
      <div className="relative flex w-80 flex-col rounded-xl bg-gray-700 bg-clip-border text-stone-50 shadow-md">
        <div
          ref={imageRef}
          className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"
        >
          <Image src="/images/result.webp" alt="result" fill priority />
        </div>
        <div className="p-6">
          <h1 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            結果
          </h1>
          <div className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            <section className={styles.pointResult}>
              <label className={styles.label}>得点:&nbsp;</label>
              <span className={styles.score}>
                <span className={styles.point}>{score ? score : 0}</span>
                <span className={styles.pointUnit}>点</span>
              </span>
            </section>

            <br />
            <hr />
            <br />
            <label className={`${styles.label} ${styles.ranking}`}>
              ランキング
            </label>
            {ranking.map((ranking, index) => (
              <li className={styles.list} key={index}>
                <span className={styles.rank}>{index + 1}位</span> 『
                {ranking.nickname}』 :{" "}
                <span className={styles.point}>{ranking.score}</span>
                <span className={styles.pointUnit}>点</span>
              </li>
            ))}
          </div>
        </div>
        <div className="p-6 pt-0 flex justify-center">
          <NavigateButton to="/" label="最初の画面へ" />
        </div>
      </div>
    </section>
  );
};
