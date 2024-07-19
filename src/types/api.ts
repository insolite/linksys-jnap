export enum JnapResponseResult {
  OK = 'OK',
}

export interface JnapResponseBody<TOutput = unknown> {
  result: JnapResponseResult | string;
  output: TOutput;
}
