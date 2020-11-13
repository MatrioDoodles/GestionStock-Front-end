import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category, CategoryService } from 'src/app/services/categories/category.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  displayedColumns: string[] = ['label', 'description', 'catprimaire', 'souscat','listprod','actions'];
  categoriesdat:MatTableDataSource<Category>;
  categories:Category[]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService:CategoryService,
              private route:Router) {
   }

  ngOnInit(): void {
    this.RetrieveAllCategories();

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.categoriesdat.filter = filterValue
  }

  RetrieveAllCategories(){
    this.categoryService.getAllCategories().
    subscribe(
      (data: any) => {
        //this.categoriesdat = new MatTableDataSource(data); 
        this.categories = data;
        for(let i=0;i<this.categories.length;i++)
        {if(!this.categories[i].catprimary){
          this.categoryService.getAllSousCategories(this.categories[i]).
          subscribe(
            (data: Category[]) => {
              this.categories[i].sous_category = data;
              setTimeout(() => { 
                this.categoriesdat = new MatTableDataSource(this.categories); 
                this.categoriesdat.paginator = this.paginator; 
                this.categoriesdat.sort = this.sort; }); 
              
            }
          )
        }
        }
        
         setTimeout(() => { 
           this.categoriesdat = new MatTableDataSource(this.categories); 
           this.categoriesdat.paginator = this.paginator; 
           this.categoriesdat.sort = this.sort; }); 
        }
          
    )
  }
  Modifier(SelectedCat:Category){
    this.route.navigate(['addCategory',SelectedCat.id])
  }
  Supprimer(SelectedClient){
    this.categoryService.deleteCategorieById(SelectedClient).
    subscribe(
      response => this.RetrieveAllCategories()
    );
  }
  AfficherDetails(SelectedClient){}
}
