import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ReadyToRender: boolean = false;
  showHeader: boolean = false;
  constructor(
    private settingsService: SettingsService,
    private router: Router)
  {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).
      subscribe((res:any) => {
        if(res.url == '/auth/login')
        {
          this.showHeader = false;
        }
        else
        {
          this.showHeader = true;
        }
      }
      );
  }
  ngOnInit(): void {
    this.settingsService.initURL().subscribe(
      (data)=>{
        this.settingsService.url = data.url;
        this.ReadyToRender = true;
      }
        );
  }
}
