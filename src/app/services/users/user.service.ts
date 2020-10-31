import { Injectable } from '@angular/core';
import { Client } from '../clients/client.service';
import { Company } from '../company/company.service';
import { Product } from '../products/product.service';
import { Subscription } from '../subscriptions/subscription.service';
import { API_URL } from 'src/app/app.const';
import { HttpClient } from '@angular/common/http';
import { Quotation } from '../quotations/quotation.service';

export class User{
  constructor(
    public id:number,
    public name:string,
    public surname:string,
    public mail:string,
    public phone:string,
    public adress:string,
    public picture:string,
    public password:string,
    public role:Role,
    public users:User[],
    public tenant:User,
    public products:Product[],
    public quotations:Quotation[],
    public company:Company,
    public clients:Client[],
    public subscription:Subscription
  ){}
}
export class Role{
  constructor(){

  }
}
export const ENTITY_URL = 'users'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(){
    return this.httpClient
   .get<User[]>(`${API_URL}/${ENTITY_URL}/GetAllUsers`);
  }

  getUserByTenant(tenant){
    return this.httpClient
   .post<User[]>(`${API_URL}/${ENTITY_URL}/GetAllUsersT`,tenant);
  }

  getUserById(Userid){
    return this.httpClient
   .get<User>(`${API_URL}/${ENTITY_URL}/${Userid}`);
  }

  UpdateUserBYid(User){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModUser`,User);
  }

  AddUser(User){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addUser`,User);
  }

  deleteUserById(Userid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelUser/${Userid}`);
  }
}
