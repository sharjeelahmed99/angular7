import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService extends AuthGuardService {
  constructor(auth: AuthService) {
    super(auth);
  }
  canActivate() {
    let isAuthenticated = super.canActivate();
    return isAuthenticated ? this.auth.isInRole('Admin') : false;
  }
}
