export type LoginResponse = {
  ID: number;
  GateID: number;
  UserName: string;
};
export type LoginInput = {
  userName: string;
  password: string;
};

export type ticket = {
  ID: number;
  Name: string;
  Amount: number;
  Tax: number;
  quantity: number;
};

export type Card = {
  ID: number;
  MemberID: number;
  Balance: number;
  IsPrinted: boolean;
};
export type Member = {
  ID: number;
  Name: string;
};

export type Bill = {
  summary: ticket[];
  total: number;
  tax: number;
  userName: string;
  MemberID: number;
  CardID?: number;
  isPrinted: number;
  paymentMethod: "Cash" | "Card" | "Visa";
  BillNumber:number
};
