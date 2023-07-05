import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { SettingComponent } from './setting/setting.component';
import { BannersComponent } from './banners/banners.component';


const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'login', component:LoginComponent},
  { path: 'main', component:MainComponent,
     children:[
       { path : "navbar" , component:NavbarComponent},
       { path : "categories" , component:CategoriesComponent},
       { path : "products" , component:ProductsComponent},
       { path : "setting" , component:SettingComponent},
       { path : "banners" , component:BannersComponent}

  ]
 }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})

export class AppRoutingModule {

 }
