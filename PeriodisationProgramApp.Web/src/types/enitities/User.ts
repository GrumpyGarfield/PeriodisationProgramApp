import { BaseEntity } from "./BaseEntity";

export type User = {
  username: string;
  firebaseId: string;
} & BaseEntity;
