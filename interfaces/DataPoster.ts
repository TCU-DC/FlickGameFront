import { RequestFormat } from "@/interfaces/RequestFormat";

export interface DataPoster<T extends RequestFormat> {
  post(data: T): Promise<Response>;
}
