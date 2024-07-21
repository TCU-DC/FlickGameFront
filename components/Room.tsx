"use client";

import { useEffect, useRef, useState } from "react";
import type { RoomAction } from "@/interfaces/RoomAction";
import { useRouter } from "next/navigation";

const Room = () => {
  const [joinInfo, setJoinInfo] = useState<RoomAction>();
  const [connected, setConnected] = useState(false);

  const webSocketRef = useRef<WebSocket>();
  const [message, setMessage] = useState<RoomAction[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getItem = localStorage.getItem("joinInfo");
    let roomId = "";
    if (getItem) {
      const parsedJoinInfo = JSON.parse(getItem);
      setJoinInfo(parsedJoinInfo);
      roomId = parsedJoinInfo.room;
    }
    const ws = new WebSocket(`ws://localhost:8080/room/${roomId}`);

    ws.onopen = () => {
      console.log("connected");
      setConnected(true);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setConnected(false);
    };

    webSocketRef.current = ws;
    return () => ws.close();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "start") {
        console.log("スタート");
        router.push("/play");
        return;
      }

      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setMessage(data);
        } else if (typeof data === "object" && data.action) {
          console.log("Received action message:", data);
        } else {
          console.error(
            "Received data is not an array or an action message:",
            data,
          );
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    const ws = webSocketRef.current;
    if (ws) {
      ws.addEventListener("message", handleMessage);
      return () => ws.removeEventListener("message", handleMessage);
    }
  }, [connected, router]);

  useEffect(() => {
    if (!connected || !joinInfo) return;
    const ws = webSocketRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(joinInfo));
    } else {
      console.error("WebSocket is not open");
    }
  }, [connected, joinInfo]);

  const handleStart = () => {
    if (!joinInfo) return;

    const startAction: RoomAction = {
      room: joinInfo.room,
      nickname: joinInfo.nickname,
      member_type: joinInfo.member_type,
      action: "start",
    };
    console.log(JSON.stringify(startAction));
    const ws = webSocketRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(startAction));
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <>
      <h1>Room ID:{joinInfo?.room}</h1>

      {joinInfo?.member_type === "leader" ? (
        <>
          <p>メンバー全員が参加後「開始」を押してください</p>
          <button onClick={handleStart}>開始</button>
        </>
      ) : (
        <p>リーダーが開始するまでお待ちください</p>
      )}

      <h2>参加者</h2>
      <ul>
        {message.map((item, index) => (
          <li key={index}>
            <p>ニックネーム: {item.nickname}</p>
            <p>
              メンバータイプ:{" "}
              {item.member_type === "member" ? "参加者" : "リーダー"}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Room;
