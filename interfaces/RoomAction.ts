export type MemberType = "leader" | "member";
export type ActionType = "join" | "start";

export interface RoomAction {
  room: string;
  nickname: string;
  member_type: MemberType;
  action: ActionType;
}
