export interface DataPoster<T extends Request> {
  post(data: T): Promise<Response>;
}
