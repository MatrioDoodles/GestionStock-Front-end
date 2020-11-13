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
  catprimary:Category
  btnname: string
  constructor(private route: ActivatedRoute,
    private CatService: CategoryService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.CatService.getAllCategories().subscribe(
      (response:any) => {
        this.categories = response;
      }
    )
    if (this.route.snapshot.params['updateElement'] === '0') {
      this.category = new Category(null, '', '',false,
      Number(sessionStorage.getItem('tenantId')), null, null,null)
        
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
      this.category.categoryprimary = this.catprimary
    }
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
