import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ReadyToRender: boolean = false;
  constructor(private settingsService: SettingsService)
  {}

  ngOnInit(): void {
    this.settingsService.initURL().subscribe(
      (data)=>{
        this.settingsService.url = data.url;
        console.log(this.settingsService.url);
        this.ReadyToRender = true;
      }
    )
  } 
}
