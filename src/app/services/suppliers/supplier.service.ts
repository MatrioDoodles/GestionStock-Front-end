import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { Product } from '../products/product.service';

export class Supplier{
  constructor(
    public id:number,
    public name:string,
    public email:string,
    public adress:string,
    public phone:string,
    public logo:string,
    public description:string,
    public reference:string,
    public tenantid:number,
    public products:Product[]
  ){}
}
export const ENTITY_URL = 'suppliers'
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private httpClient: HttpClient) { }

  getAllSuppliers(){
    if(sessionStorage.getItem('role')=== "SUPER_ADMIN" )
    return this.httpClient
   .get<Supplier[]>(`${API_URL}/${ENTITY_URL}/GetAllSuppliers`);
   else
   return this.httpClient
   .get<Supplier[]>(`${API_URL}/${ENTITY_URL}/GetAllSuppliersT/${sessionStorage.getItem('tenantId')}`);
  }

  // getSupplierByTenantId(tenantId){
  //   return this.httpClient
  //  .get<Supplier[]>(`${API_URL}/${ENTITY_URL}/GetAllSuppliersT/${tenantId}`);
  // }
  getSupplierById(Supplierid){
    return this.httpClient
   .get<Supplier>(`${API_URL}/${ENTITY_URL}/${Supplierid}`);
  }

  UpdateSupplierBYid(Supplier){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModSupplier`,Supplier);
  }

  AddSupplier(Supplier){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addSupplier`,Supplier);
  }

  deleteSupplierById(Supplierid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelSupplier/${Supplierid}`);
  }
}
