import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { SettingsService } from 'src/app/services/settings.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  imageToShow;
  constructor(
    private usersService: UsersService,
    public settingsService: SettingsService,
  ){}
  ngOnInit(): void {
    this.createImageFromBlob(this.settingsService.user.userImage);
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
       console.log(this.imageToShow);
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 } 
}
