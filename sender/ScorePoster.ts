import { DataPoster } from "@/interfaces/DataPoster";
import { ScoreRequest } from "@/models/ScoreRequest";

export class ScorePoster implements DataPoster<ScoreRequest> {
  private readonly BASE_URL = process.env.BASE_URL;
  private readonly ENDPOINT = "/register-score";
  private readonly URL = `${this.BASE_URL}${this.ENDPOINT}`;

  async post(data: ScoreRequest): Promise<Response> {
    const response = await fetch(this.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }
}
