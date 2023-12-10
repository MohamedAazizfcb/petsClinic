import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
@Injectable({providedIn: 'root'})
export class SettingsService implements OnInit {
    url: string = "";
    token: string = "";
    user: UserModel;
    constructor(private httpClient: HttpClient) {}
    ngOnInit(): void {}

    initURL(): Observable<{url: string}>
    {
        return this.httpClient.get<{url: string}>("assets/url.json");
    }
}