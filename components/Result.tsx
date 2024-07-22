"use client";

import { useEffect, useState, useRef } from "react";
import { RankingResponse } from "@/models/ranking";
import NavigateButton from "@/components/NavigateButton";
import styles from "@/styles/result.module.scss";
import Image from "next/image";
import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { RoomAction } from "@/interfaces/RoomAction";
import { ResultSocketInfo } from "@/interfaces/ResultSocketInfo";

gsap.registerPlugin(CSSRulePlugin);

type ResultProps = {
  response: RankingResponse;
};

export const Result = ({ response }: ResultProps) => {
  const [score, setScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const getItem = localStorage.getItem("score");
    if (getItem) {
      setScore(parseInt(getItem));
    }
  }, []);

  const [loading, setLoading] = useState(true);

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
  }, [loading, response]);
  const [resultSockerInfo, setResultSockerInfo] = useState<ResultSocketInfo>();
  const [connected, setConnected] = useState(false);
  const [roomMembersResult, setRoomMembersResult] = useState<
    Set<ResultSocketInfo>
  >(new Set());
  const webSocketRef = useRef<WebSocket>();

  useEffect(() => {
    const getLocalScore = localStorage.getItem("score");
    const getLocalInfo = localStorage.getItem("joinInfo");

    if (getLocalScore) {
      setScore(parseInt(getLocalScore));
    }

    if (getLocalInfo) {
      const parsedJoinInfo: RoomAction = JSON.parse(getLocalInfo);

      const resultSocketInfo: ResultSocketInfo = {
        room: parsedJoinInfo.room,
        nickname: parsedJoinInfo.nickname,
        member_type: parsedJoinInfo.member_type,
        action: parsedJoinInfo.action,
        score: getLocalScore || "0",
      };

      setResultSockerInfo(resultSocketInfo);

      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEB_SOCKET_BASE_URL}/room-result/${resultSocketInfo.room}`,
      );

      ws.onopen = () => {
        console.log("connected");
        setConnected(true);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setConnected(false);
      };

      webSocketRef.current = ws;
      webSocketRef.current.onmessage = (event) => {
        const data: ResultSocketInfo = JSON.parse(event.data);
        setRoomMembersResult((prev) => prev.add(data));
      };
      return () => ws.close();
    }
  }, [roomMembersResult]);

  useEffect(() => {
    const successConnection = connected && resultSockerInfo;
    const wsIsOpen =
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN;

    if (!successConnection) return;
    if (!wsIsOpen) {
      console.error("WebSocket is not open");
      return;
    }

    webSocketRef.current!.send(JSON.stringify(resultSockerInfo));
  }, [connected, resultSockerInfo]);

  let level: string = "";
  let ranking: { nickname: string; score: number }[] = [];

  if (roomMembersResult.size === 0) {
    level = response.level;
    ranking = response.ranking;
  } else {
    roomMembersResult.forEach((member) => {
      ranking.push({
        nickname: member.nickname,
        score: parseInt(member.score),
      });
    });

    ranking.sort((a, b) => b.score - a.score);
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
