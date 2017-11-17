export interface IReducersList<T, R> {
  [key: string]: (state: T, action: R) => T;
}
