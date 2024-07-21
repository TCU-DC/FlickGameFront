"use client";

import { RoomAction } from "@/interfaces/RoomAction";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  // inputの値を取得する
  const handleJoinRoom = () => {
    const roomId = (document.getElementById("roomId") as HTMLInputElement)
      .value;
    const userName = (document.getElementById("userName") as HTMLInputElement)
      .value;
    const joinInfo: RoomAction = {
      room: roomId,
      nickname: userName,
      member_type: "member",
      action: "join",
    };

    localStorage.setItem("joinInfo", JSON.stringify(joinInfo));

    router.push("/room");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Join Room</h1>
        <div className="mt-4">
          <input
            id="roomId"
            type="text"
            placeholder="Room ID"
            className="px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div className="mt-4">
          <input
            id="userName"
            type="text"
            placeholder="Your Name"
            className="px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleJoinRoom}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
}
