declare module '*.json' {
  const value: any
  export default value
}

declare type Item = [string, number, string, number, number, number]

declare interface StoreState {
  data?: Item[],
  progress?: number
}
