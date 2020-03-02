import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import * as auth0 from "auth0-js";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  userProfile: any;
  roles: string[] = [];

  auth0 = new auth0.WebAuth({
    clientID: "whnSF26vMr5eom4v0oGmPgFTpKkqwBil",
    domain: "aspnetcore.auth0.com",
    responseType: "token id_token",
    redirectUri: "http://localhost:5001",
    scope: "openid profile email",
    audience: "https://api.vega.com"
  });

  constructor(public router: Router) {
    this._idToken = "";
    this._accessToken = "";
    this._expiresAt = 0;
  }
  getProfile() {
    return localStorage.getItem("profile");
  }
  getAccessToken(): string {
    return localStorage.getItem("token");
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = "";
        this.localLogin(authResult);
        this.router.navigate(["/admin"]);
      } else if (err) {
        this.router.navigate(["/home"]);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = authResult.expiresIn * 1000 + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    localStorage.setItem("token", authResult.accessToken);

    this.auth0.client.userInfo(authResult.accessToken, function(err, profile) {
      if (err) {
        throw err;
      }
      localStorage.setItem("profile", JSON.stringify(profile));
      this.userProfile = profile;
    });

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(authResult.accessToken);
    this.roles = decodedToken["https://api.vega.com"];
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        // alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }
  public isInRole(role: string) {
    if (!this.roles) {
      return false;
    }
    return this.roles.indexOf(role) > -1;
  }
  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = "";
    this._idToken = "";
    this._expiresAt = 0;
    localStorage.removeItem("token");
    localStorage.removeItem("profile");

    this.auth0.logout({
      returnTo: window.location.origin
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return this.getAccessToken() ? true : false; //&& Date.now() < this._expiresAt;
  }
}
