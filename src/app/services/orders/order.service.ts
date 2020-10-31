import { Injectable } from '@angular/core';
import { Client } from '../clients/client.service';
import { Company } from '../company/company.service';
import { User } from '../users/user.service';
import { Invoice } from '../invoices/invoice.service';
import { Product } from '../products/product.service';
import { API_URL } from 'src/app/app.const';
import { HttpClient } from '@angular/common/http';

export class Order{
  constructor(
    public id:number,
    public description:string,
    public paid:boolean,
    public shipped:boolean,
    public aborted:boolean,
    public creation_date:Date,
    public shipping_date:Date,
    public pay_date:Date,
    public tenant_id:number,
    public user:User,
    public client:Client,
    public company:Company,
    public invoice:Invoice,
    public products:Product[]
  ){}
}
export const ENTITY_URL = 'orders'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getAllOrders(){
    return this.httpClient
   .get<Order[]>(`${API_URL}/${ENTITY_URL}/GetAllOrders`);
  }

  getOrderById(Orderid){
    return this.httpClient
   .get<Order>(`${API_URL}/${ENTITY_URL}/${Orderid}`);
  }

  getOrderByTenantId(tenantId){
    return this.httpClient
   .get<Order>(`${API_URL}/${ENTITY_URL}/GetAllOrdersT/${tenantId}`);
  }

  UpdateOrderBYid(Order){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModOrder`,Order);
  }

  AddOrder(Order){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addOrder`,Order);
  }
  GetOrdersByClient(client){
    return this.httpClient
 .post<Order[]>(`${API_URL}/${ENTITY_URL}/GetOrdersByClient`,client);
  }

  deleteOrderById(Orderid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelOrder/${Orderid}`);
  }
}
