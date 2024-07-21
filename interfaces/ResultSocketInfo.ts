export interface ResultSocketInfo {
  room: string;
  nickname: string;
  member_type: "leader" | "member";
  action: "join" | "start";
  score: string;
}
