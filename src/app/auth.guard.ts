import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './services/users.service';
import { SettingsService } from './services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private usersService: UsersService, 
    private router: Router,
    private settingsService: SettingsService) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.settingsService.token) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['auth','login']);
      return false;
    }
  }

}