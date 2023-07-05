import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Settings } from '../models/setting';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
name:any;
mark:any;
phone:any;
address:any;
email:any;
language="en";
tag:any;
freeShipping:any;
description:any;
  settings!: Settings;

constructor( private _snackBar: MatSnackBar,private router: Router,private service: AdminService ,) 
  {}

  ngOnInit(){
    this.getAllSettings()
  }

add(){
  if(this.name != "" && this.description != "" && this.mark != "" && this.phone != "" && this.address != "" && this.email != "" && this.tag != "" && this.freeShipping != "") {
    this.settings = new Settings();
    this.settings.name = this.name;
    this.settings.description = this.description;
    this.settings.mark = this.mark;
    this.settings.tag = this.tag;
    this.settings.phone = this.phone;
    this.settings.address = this.address;
    this.settings.freeShipping = this.freeShipping;
    this.settings.email = this.email;
    this.settings.language = "en";

    this.service.saveSettings(this.settings).subscribe(data => { 
      if(data != null && data != undefined) {
        this._snackBar.open('Успешно додадено!', 'Затвори', ); 
        this.getAllSettings()
      } else {
        this._snackBar.open('Мора сите полиња да се потполнети!', 'Затвори', );
      }
   });
  }
}

getAllSettings() {
  this.service.getAllSettings(this.language).subscribe(data => {
    if(data != null && data != undefined) {
      console.log(data)
      this.email=data.email;
      this.address=data.address;
      this.description=data.infoList[0].description;
      this.freeShipping=data.freeShipping;
      this.name=data.infoList[0].name;
      this.phone=data.phone;
      this.tag=data.infoList[0].tag;
      this.language=data.infoList[0].language
      this.mark=data.infoList[0].mark;

    } else {
      this._snackBar.open('Настана грешка!', 'Затвори', ); 
    }
  });
}

izmeni(){
  
}

}
