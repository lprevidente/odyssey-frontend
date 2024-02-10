import { Sex } from "@modules/profile/models/profile";

export interface Me {
  firstName: string;
  lastName: string;
  email: string;
  sex: Sex;
  emailVerified: boolean;
  avatarURL: string;
}
