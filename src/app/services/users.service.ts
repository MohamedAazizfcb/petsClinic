import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { catchError } from 'rxjs';
@Injectable({providedIn: 'root'})
export class UsersService {
    constructor(
        private httpClient: HttpClient,
        private settingsService: SettingsService,
        ) {}

    signup(formData: FormData){
        return this.httpClient.post(this.settingsService.url + "/signup.php", formData);
    }
    login(formData: FormData){
        return this.httpClient.post(this.settingsService.url + "/login.php",formData);
    }
    getMyUserFromAPI(formData: FormData){
        return this.httpClient.post(this.settingsService.url + "/myUser.php",formData);
    }
    getMyUserImageFromAPI(formData: FormData){
        return this.httpClient.post(this.settingsService.url + "/userImage.php",formData,{responseType: "blob"});
    }

}