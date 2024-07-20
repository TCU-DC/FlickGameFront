import { RequestFormat } from "@/interfaces/RequestFormat";

export interface ScoreRequest extends RequestFormat {
  user_id?: string;
  point: number;
  level: string;
  guest_name?: string;
}
