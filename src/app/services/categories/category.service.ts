import { Injectable } from '@angular/core';
import { Product } from '../products/product.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.const';

export class Category{
  constructor(
  public id:number,
  public label:string,
  public description:string,
  public tenantid:number,
  public sous_category:Category[],
  public categoryprimary:Category,
  public products:Product[],
  ){}
}
export const ENTITY_URL = 'categories'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getAllCategories(){
    if(sessionStorage.getItem('role')=== "SUPER_ADMIN" )
    return this.httpClient
   .get<Category[]>(`${API_URL}/${ENTITY_URL}/GetAllCategorys`);
   else
   return this.httpClient
    .get<Category[]>(`${API_URL}/${ENTITY_URL}/GetAllCategorysT/${sessionStorage.getItem('tenantId')}`);
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
   .post<Category[]>(`${API_URL}/${ENTITY_URL}/SousCat`,category);
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
