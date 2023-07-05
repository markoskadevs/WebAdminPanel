import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Banners } from '../models/banners';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent {
  
  constructor(private router: Router,
    private service: AdminService , 
    private _snackBar: MatSnackBar,
    ) {}

  globalLanguage : any ="en";
  img:any;
  category:any;
  subcategory:any;
  recommended:any;
  categoryList:any=[];
  subCategoryList:any=[];
  list:any=[];
  banners: Banners = new Banners;
  isDisable:any=true;
  selectedId:any;

  ngOnInit(){
    this.getAllCategory()
    this.getAllBanners()
  }

  changeCategory(){
    this.service.subCategory(this.category).subscribe(data => { 
      if(data != null && data != undefined) {
        this.subCategoryList=data;
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }

  getAllCategory() {
    this.categoryList = [];
    this.service.getAllCategory(this.globalLanguage).subscribe(data => { 
      if(data != null && data != undefined) {
        this.categoryList=data;
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }

  addNewBanners(){
    if(this.img != "" && this.category != "" && this.subcategory != "" && this.recommended != ""){
        this.banners = new Banners;
        this.banners.image = this.img;
        this.banners.category = this.category;
        this.banners.subCategory = this.subcategory;
        this.banners.recommended = this.recommended;

        this.service.saveNewBanner(this.banners).subscribe(data => { 
        this.getAllBanners()
       });
      }
     this.clearForm()
    }

    getAllBanners() {
      this.list = [];
      this.service.getAllBanners().subscribe(data => { 
        if(data != null && data != undefined) {
          this.list=data;
          console.log(this.list)
        } else {
          this._snackBar.open('Настана грешка!', 'Затвори', ); 
        }
      });
    }

    removeBanners(id:any){
      this.service.removeBanners(id).subscribe(data => { 
        this.getAllBanners()   
        this._snackBar.open('Успешно избришано!', 'Затвори', ); 
   });
   }

   viewBanners(item:any) {
    console.log(item)
    this.img=item.image;
    if(item.category != null) {
      this.changeCategory();
      this.category=item.category;
    }
    if(item.subCategory != null){ 
      this.subcategory = item.subCategory;
    }
    this.recommended=item.recommended; 
    this.selectedId=item.id;
    this.isDisable=false;
  }

  clearForm() {
    this.category="";
    this.img="";
    this.subcategory="";
    this.recommended="";
  }

  izmeni(){
    if(this.img != "" && this.category != "" && this.subcategory != "" && this.recommended != ""){
      this.banners = new Banners;
      this.banners.image = this.img;
      this.banners.category = this.category;
      this.banners.subCategory = this.subcategory;
      this.banners.recommended = this.recommended;
      
      this.service.updateBanner(this.selectedId,this.banners).subscribe(data => { 
        if(data != null && data != undefined) {
          this.getAllBanners();
          this._snackBar.open('Податоците се успешно изменети!', 'Затвори', ); 
        } else {
          this._snackBar.open('Настана грешка!', 'Затвори', ); 
        }
      });
  }
}
    
  
}
