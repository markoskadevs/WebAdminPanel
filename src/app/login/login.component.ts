import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:any = "admin@gmail.com";
  hide: any = true;
  password:any = "Admin123";

  user: User = new User;

  
  constructor(private router: Router, private _snackBar: MatSnackBar,private service: AdminService){}

  ngOnInit(){
  }

  login(){
    if(this.email !="" && this.password !=""){
      this.user = new User();
      this.user.password = this.password;
      this.user.email = this.email;

      this.service.login(this.user).subscribe(data => { 
         if(data != null && data != undefined){
           this.router.navigate(['main']);
         } else {
           this._snackBar.open('Имате внесено погрешна лозинка или емаил', 'Затвори', );
         }
      });
      this.clearForm()
   }
 }

  clearForm(){
  this.password="";
  this.email="";
}
  }


