import { MessageTypes } from '../enums/MessageTypes';

export type Message = {
  type: MessageTypes;
  balance: number;
  win: number;
  symbols: number[][];
  winSymbols: number[][];
};
