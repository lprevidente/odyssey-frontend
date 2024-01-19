import { Injectable } from "@angular/core";
import { Me } from "@core/models/me";

const TOKEN = "access_token";
const ME = "me";

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

  public get isTokenPresent(): boolean {
    return this.token != null;
  }

  public get me(): Me | undefined {
    const json = window.localStorage.getItem(ME);
    if (json) return JSON.parse(json);
    return undefined;
  }

  public set me(me: Me) {
    window.localStorage.removeItem(ME);
    window.localStorage.setItem(ME, JSON.stringify(me));
  }

  public clear(): void {
    window.localStorage.removeItem(TOKEN);
  }
}
