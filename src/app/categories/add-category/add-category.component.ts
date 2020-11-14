import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryService } from 'src/app/services/categories/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  category: Category
  categories:Category[]
  catprimary:any
  cat:Category
  btnname: string
  constructor(private route: ActivatedRoute,
    private CatService: CategoryService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.CatService.getAllPrimaryCategories().subscribe(
      (response:any) => {
        this.categories = response;
      }
    )
    if (this.route.snapshot.params['updateElement'] === '0') {
      this.category = new Category(null, '', '',false,
      Number(sessionStorage.getItem('tenantId')), null, new Category(null, '', '',false,
      null,null,null,null),null)
        
      this.btnname = "Ajouter"
    }
    
    else {
      this.CatService.getCategorieById(this.route.snapshot.params['updateElement']).
        subscribe(
          (data: any) => {
            this.category = data;
          }
        )
      this.btnname = "Modifier"
    }
  }
  submit() {
    if(this.category.catprimary){
      this.category.categoryprimary.id=this.catprimary;
    }
   console.log(this.category);
    if (this.route.snapshot.params['updateElement'] === "0") {
      this.CatService.AddCategorie(this.category).subscribe(
        response => {
            this.router.navigate(['listCategories']);
          }
      );
    }
    else {
      this.CatService.UpdateCategorieBYid(this.category).subscribe(
        response => {
          this.router.navigate(['listCategories'])
        }
      );
    }

  }

}
