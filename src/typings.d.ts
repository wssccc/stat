export declare type Item = [string, number, string, number, number, number]

export declare interface AppState {
  data: Item[] | undefined,
  progress: number,
  latest: number
}
