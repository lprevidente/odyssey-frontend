import { Injectable } from "@angular/core";

const TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  public get token(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  public set token(token: string | null) {
    window.localStorage.removeItem(TOKEN);
    if (token) window.localStorage.setItem(TOKEN, token);
  }

  public get refreshToken(): string | null {
    return window.localStorage.getItem(REFRESH_TOKEN);
  }

  public set refreshToken(token: string | null) {
    window.localStorage.removeItem(REFRESH_TOKEN);
    if (token) window.localStorage.setItem(REFRESH_TOKEN, token);
  }

  public get isTokenPresent(): boolean {
    return this.token != null;
  }

  public clear(): void {
    window.localStorage.removeItem(TOKEN);
  }
}
