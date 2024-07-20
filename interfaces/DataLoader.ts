export interface DataLoader<T extends Response> {
  load(): Promise<T>;
}
