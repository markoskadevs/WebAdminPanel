import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
globalLanguage = "en";
name:any;
image:any;
category: Category = new Category;
list:any=[];
separatorKeysCodes: number[] = [ENTER, COMMA];
tagCtrl = new FormControl('');
filteredTag : any = [];
tag: string[] = ['...'];
allTag: string[] = ['Сребро', 'Розе Голд', 'Веренички прстени', 'Впечатливи прстени' ];
isDisable:any=true;
selectedId:any;
color:any;

@ViewChild('tagInput')
 tagInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router,private service: AdminService ,  private _snackBar: MatSnackBar) {
    this.filteredTag = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tagg: string | null) => (tagg ? this._filter(tagg) : this.allTag.slice())),
    );
  }

  ngOnInit(){
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

  dodadi() {
    if(this.name != "" && this.image != "") {
      this.category = new Category();
      this.category.name = this.name;
      this.category.image = this.image;
      this.category.tag = this.tag;
      this.category.language = "en";
      this.category.color=this.color;

      this.service.saveNewCategory(this.category).subscribe(data => { 
        if(data != null && data != undefined) {
          this.getAllCategory()
        } else {
          this._snackBar.open('Мора сите полиња да се потполнети!', 'Затвори', );
        }
    });
    }
    this.clearForm()
  }

  viewCategory(item:any) {
    this.name=item.categoryInfoList[0].name;
    this.image=item.image;
    this.tag=item.tag;
    this.color=item.color;
    this.selectedId=item.id;
    this.isDisable=false;
  }


  brishi(id:any){  
    this.service.removeCategory(id).subscribe(data => { 
      this.getAllCategory()   
      this.clearForm()
      this._snackBar.open('Успешно избришано!', 'Затвори', ); 
    });
  }


  getAllCategory() {
    this.list = [];
    this.service.getAllCategory(this.globalLanguage).subscribe(data => { 
      if(data != null && data != undefined) {
        this.list=data;
      } else {
        this._snackBar.open('Настана грешка!', 'Затвори', ); 
      }
    });
  }


  clearForm() {
    this.name="";
    this.image="";
    this.color="";
    this.filteredTag = [];
    this.tag = [];
  }

  izmeni(){
    if(this.name != "") {
      this.category = new Category();
      this.category.name = this.name;
      this.category.image = this.image;
      this.category.tag = this.tag;
      this.category.color=this.color;

      this.service.updateCategory(this.selectedId,this.category).subscribe(data => { 
        if(data != null && data != undefined) {
          this.getAllCategory();
          this.clearForm()
          this._snackBar.open('Податоците се успешно изменети!', 'Затвори', ); 
        } else {
          this._snackBar.open('Настана грешка!', 'Затвори', ); 
        }
      });
    }
  }
}




