/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateEventInput = {
  guests: Array<ParticipantInput>;
  title: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  _id: Scalars['String']['output'];
  createdAt: Scalars['Float']['output'];
  isActive: Scalars['Boolean']['output'];
  ownerEmail: Scalars['String']['output'];
  participants: Array<Participant>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Event;
  freezeEvent: Event;
  respondToEvent: Participant;
  signIn: Scalars['String']['output'];
  signUp: Scalars['String']['output'];
};


export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
};


export type MutationFreezeEventArgs = {
  id: Scalars['String']['input'];
};


export type MutationRespondToEventArgs = {
  respondToEventInput: RespondToEventInput;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};

export type Participant = {
  __typename?: 'Participant';
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  response: ResponseType;
  updatedAt: Scalars['Float']['output'];
};

export type ParticipantInput = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllRelatedEvents: Array<Event>;
  getOneEvent: Event;
  getUser: User;
};


export type QueryGetOneEventArgs = {
  id: Scalars['String']['input'];
};

export type RespondToEventInput = {
  eventId: Scalars['String']['input'];
  response: ResponseType;
};

export enum ResponseType {
  Maybe = 'MAYBE',
  No = 'NO',
  Yes = 'YES'
}

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  events: Array<Event>;
  fullName: Scalars['String']['output'];
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
