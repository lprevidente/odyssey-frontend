export interface Signup {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  appSettings: {
    language: string;
    currency: "EUR" | "USD";
  };
}
