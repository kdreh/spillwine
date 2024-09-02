import {Roles} from "./roles";

export interface User {
  id: string;
  uid: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  role: Roles;
  acceptTerms: boolean;
  profilePic: string;
  isNewUser: boolean;
  onboarded: boolean;
  accessCode: string;
}
