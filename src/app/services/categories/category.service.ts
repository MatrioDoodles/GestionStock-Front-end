import { Injectable } from '@angular/core';
import { Product } from '../products/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../app.const';
import { AuthenticationService } from '../auth/authentication.service';

export class Category{
  constructor(
  public id:number,
  public label:string,
  public description:string,
  public catprimary:boolean,
  public tenantid:number,
  public sous_category:Category[],
  public categoryprimary:Category,
  public products:Product[]
  ){}
}
export const ENTITY_URL = 'categories'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
              private httpClient: HttpClient,
              private authService:AuthenticationService
              ) { }

  getAllCategories(){
    if(sessionStorage.getItem('role')=== "SUPER_ADMIN" )
    return this.httpClient
   .get<Category[]>(`${API_URL}/${ENTITY_URL}/GetAllCategorys`);
   else
   return this.httpClient
    .get<Category[]>(`${API_URL}/${ENTITY_URL}/GetAllCategoriesT/${sessionStorage.getItem('tenantId')}`);
  }
  getAllPrimaryCategories(){
    if(sessionStorage.getItem('role')=== "SUPER_ADMIN" )
    return this.httpClient
   .get<Category[]>(`${API_URL}/${ENTITY_URL}/GetAllPrimaryCategorys`);
   else
   return this.httpClient
    .get<Category[]>(`${API_URL}/${ENTITY_URL}/GetAllPrimaryCategorysT/${sessionStorage.getItem('tenantId')}`);
  }
  // getAllCategoriesByTenant(tenantId){
  //   return this.httpClient
  //  .get<Category[]>(`${API_URL}/${ENTITY_URL}/GetAllCategorysT/${tenantId}`);
  // }

  getCategorieById(Catid){
    return this.httpClient
   .get<Category>(`${API_URL}/${ENTITY_URL}/${Catid}`);
  }
  getAllSousCategories(category){
    return this.httpClient
   .get<Category[]>(`${API_URL}/${ENTITY_URL}/SousCat/${category.id}`);
  }
  UpdateCategorieBYid(category){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModCategory`,category);
  }
  AddCategorie(category){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addCategory`,category);
  }

  deleteCategorieById(Catid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelCategory/${Catid}`);
  }
}
