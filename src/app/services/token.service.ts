import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
@Injectable({providedIn: 'root'})
export class UsersService {
    constructor(
        private httpClient: HttpClient,
        private settingsService: SettingsService,
        ) {}

    signup(formData: FormData){
        return this.httpClient.post(this.settingsService.url + "/signup.php", formData);
    }
}