export interface ScoreRequest extends Request {
  user_id: string;
  point: number;
  level: string;
  guest_name: string;
}
