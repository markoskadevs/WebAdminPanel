import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Products } from 'src/app/models/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
name:any;
description:any;
smallDescription:any;
category:any;
collection:any;
material:any;
quantity:any;
img:any;
code:any;
price:any;
recomended:any;
subCategory:any;
list:any=[];
categoryList:any = [];
subCategoryList:any = [];
isDisable:any=true;
selectedId:any;

  products: Products = new Products;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTag : Observable<string[]>;
  tag: string[] = [];
  allTag: string[] = ['11', '12', '20', '24', ];
 
  
  @ViewChild('tagInput')
   tagInput!: ElementRef<HTMLInputElement>;
  globalLanguage: any = "en";
  
  constructor( private _snackBar: MatSnackBar,private router: Router,private service: AdminService ,) 
  {
    this.filteredTag = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tagg: string | null) => (tagg ? this._filter(tagg) : this.allTag.slice())),
    );
  }

  ngOnInit(){
    this.getAllProducts();
    this.getAllCategory()
  
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tag.push(value);
    }
    event.chipInput!.clear();
  
    this.tagCtrl.setValue(null);
  }
  remove(tagg: string): void {
    const index = this.tag.indexOf(tagg);
  
    if (index >= 0) {
      this.tag.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tag.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
  
    return this.allTag.filter(tagg => tagg.toLowerCase().includes(filterValue));
  }

  changeCategory(){
    this.subCategoryList="";
    this.service.subCategory(this.category).subscribe(data => { 
      if(data != null && data != undefined) {
        this.subCategoryList=data;
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }
  

dodadi(){
  if(this.name !="" && this.description !="" && this.smallDescription != "" &&this.category !=""  && this.collection !="" && this.material !="" && this.quantity != "" && this.code != "" && this.img != "" &&  this.price !="" && this.recomended !="" && this.subCategory != ""){
    this.products = new Products();
    this.products.name = this.name;
    this.products.description = this.description;
    this.products.img = this.img;
    this.products.smallDescription = this.smallDescription;
    this.products.categories = this.category;
    this.products.collection = this.collection;
    this.products.quantity = this.quantity;
    this.products.code = this.code;
    this.products.sizes = this.tag;
    this.products.material = this.material;
    this.products.price=this.price;
    this.products.recomended=this.recomended;
    this.products.subCategory=this.subCategory

    this.service.saveNewProducts(this.products).subscribe(data => { 
      if(data != null && data != undefined) {
        this.getAllProducts()
       console.log(data)
      } else {
        this._snackBar.open('Мора сите полиња да се потполнети!', 'Затвори', );
      }
   });
  }
  this.clearForm()
}

getAllProducts() {
  this.list = [];
  this.service.getAllProducts(this.globalLanguage).subscribe(data => { 
    if(data != null && data != undefined) {
      this.list=data;
      console.log(this.list)
    } else {
      this._snackBar.open('Настана грешка!', 'Затвори', ); 
    }
  });
}

viewProducts(item:any){
  this.tag = [];
  this.name=item.productsInfos[0].name;
  this.description=item.productsInfos[0].description;
  this.img=item.img;
  this.collection=item.productsInfos[0].collection;
  this.category= item.category.id.toString();
  this.material=item.productsInfos[0].material;
  if(item.sizes != null) {
    for(let x of item.sizes){
      this.tag.push(x);
    }
  }
  this.quantity = item.quantity;
  this.code=item.code;
  this.smallDescription=item.productsInfos[0].smallDescription;
  this.description=item.productsInfos[0].description;
  this.price=item.price;
  this.recomended=item.recomended;
  this.subCategory=item.subCategory;
  this.subCategoryList.push(item.subCategory);
  this.subCategory = item.subCategory;
  this.selectedId=item.id;
  this.isDisable=false;
}

deleteProd(id:any){
  this.service.removeProduct(id).subscribe(data => { 
    this.getAllProducts()   
    this._snackBar.open('Успешно избришано!', 'Затвори', ); 
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

clearForm() {
  this.name="";
  this.description="";
  this.img="";
  this.smallDescription="";
  this.category="";
  this.collection="";
  this.quantity="";
  this.code="";
  this.price="";
  this.recomended="";
  this.subCategory="";
}

  izmeni(){
    if(this.name !="" && this.description !="" && this.smallDescription != "" &&this.category !="" && this.material !=""  && this.code != "" && this.img != "" &&  this.price !="" && this.recomended !="" && this.subCategory != ""){
      this.products = new Products();
      this.products.name = this.name;
      this.products.description = this.description;
      this.products.img = this.img;
      this.products.smallDescription = this.smallDescription;
      this.products.categories = this.category;
      this.products.collection = this.collection;
      this.products.quantity = this.quantity;
      this.products.code = this.code;
      this.products.sizes = this.tag;
      this.products.material = this.material;
      this.products.price=this.price;
      this.products.recomended=this.recomended;
      this.products.subCategory=this.subCategory

      
      this.service.updateProduct(this.selectedId,this.products).subscribe(data => { 
        if(data != null && data != undefined) {
         this.getAllProducts();
         this._snackBar.open('Податоците се успешно изменети!', 'Затвори', ); 
        } else {
          this._snackBar.open('Настана грешка!', 'Затвори', ); 
        }
      });
  }
}


}