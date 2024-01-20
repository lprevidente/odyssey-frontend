export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  sex: Sex;
  avatarURL: string;
}

export type Sex = "M" | "F" | "O";
