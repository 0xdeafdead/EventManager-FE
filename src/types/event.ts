export enum ResponseType {
  YES = "YES",
  NO = "NO",
  MAYBE = "MAYBE",
}

export interface Participant {
  email: string;
  fullName: string;
  response: ResponseType;
}

export interface Event {
  _id: string;
  title: string;
  date: string;
  ownerEmail: string;
  isActive: boolean;
  participants: Participant[];
}

export type Guests = {
  fullName: string;
  email: string;
};

export type CreateEventInput = {
  title: string;
  date: number;
  guests: Guests[];
};
