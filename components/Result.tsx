"use client";

import { useEffect, useRef, useState } from "react";
import { RankingResponse } from "@/models/ranking";
import NavigateButton from "@/components/NavigateButton";
import { RoomAction } from "@/interfaces/RoomAction";
import { ResultSocketInfo } from "@/interfaces/ResultSocketInfo";

type ResultProps = {
  response: RankingResponse;
};

export const Result = ({ response }: ResultProps) => {
  const [score, setScore] = useState(0);
  const [resultSockerInfo, setResultSockerInfo] = useState<ResultSocketInfo>();
  const [connected, setConnected] = useState(false);
  const [roomMembersResult, setRoomMembersResult] = useState<
    ResultSocketInfo[]
  >([]);
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
        setRoomMembersResult((prevArray) => {
          if (prevArray.includes(data)) return prevArray;
          return [...prevArray, data];
        });
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

  if (roomMembersResult.length === 0) {
    level = response.level;
    ranking = response.ranking;
  } else {
    ranking = roomMembersResult.map((member) => {
      return {
        nickname: member.nickname,
        score: parseInt(member.score),
      };
    });

    ranking.sort((a, b) => b.score - a.score);
  }

  return (
    <main>
      <h1>Result画面</h1>
      <p>あなたのスコア : {score ? score : 0}点です</p>
      <h2>レベル: {level}</h2>
      <h2>ランキング</h2>
      <ol>
        {ranking.map((ranking, index) => (
          <li key={index}>
            {index + 1}位 {ranking.nickname} : {ranking.score}点
          </li>
        ))}
      </ol>
      <NavigateButton to="" label="最初の画面へ" />
    </main>
  );
};
