import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(protected auth: AuthService) {}
  canActivate() {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    // window.location.href =
    //   'https://aspnetcore.auth0.com/login?state=g6Fo2SA2WjdSZmJONjdMekdObXBHNVZBNktLclh0dTN2cmNTZ6N0aWTZIHNSTm5zbFdFTnoxem9QT1ZlV0lHNGk2Nk41a21FaTdEo2NpZNkgd2huU0YyNnZNcjVlb200djBvR21QZ0ZUcEtrcXdCaWw&client=whnSF26vMr5eom4v0oGmPgFTpKkqwBil&protocol=oauth2&response_type=token%20id_token&redirect_uri=https%3A%2F%2Flocalhost%3A5001&scope=openid%20profile%20email&audience=https%3A%2F%2Fapi.vega.com&nonce=5l5fN0rRgyTiKbhAFRtNH1HJlTNCXSbD&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMC40In0%3D';
    return false;
  }
}
