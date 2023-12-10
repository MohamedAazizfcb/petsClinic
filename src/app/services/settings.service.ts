import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({providedIn: 'root'})
export class SettingsService implements OnInit {
    url: string = "";
    constructor(private httpClient: HttpClient) {}
    ngOnInit(): void {}

    initURL(): Observable<{url: string}>
    {
        return this.httpClient.get<{url: string}>("assets/url.json");
    }
}