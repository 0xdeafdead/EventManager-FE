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

export interface EventItemProp {
  event: Event;
}

export interface EventPageProps {
  event: Event | null;
  userEmail: string;
}

export interface EventSectionProps {
  sectionTitle: string;
  events: Event[];
}
