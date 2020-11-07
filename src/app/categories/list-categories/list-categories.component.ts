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
  categories:MatTableDataSource<Category>;
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
    this.categories.filter = filterValue
  }

  RetrieveAllCategories(){
    this.categoryService.getAllCategories().
    subscribe(
      (data: any) => {
        this.categories = new MatTableDataSource(data); 
        setTimeout(() => { 
          this.categories = new MatTableDataSource(data); 
          this.categories.paginator = this.paginator; 
          this.categories.sort = this.sort; }); 
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
