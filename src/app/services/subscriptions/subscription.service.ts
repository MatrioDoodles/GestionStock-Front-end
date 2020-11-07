import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { User } from '../users/user.service';

export class Subscription{
  constructor(
    public id:number,
    public duration:string,
    public starting_date:Date,
    public expiring_date:Date,
    public tenantid:number,
    public user:User
  ){}
}
export const ENTITY_URL = 'subscriptions'
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private httpClient: HttpClient) { }

  getAllSubscriptions(){
    return this.httpClient
   .get<Subscription[]>(`${API_URL}/${ENTITY_URL}/GetAllSubscriptions`);
  }

  getSubscriptionByTenantId(TenantId){
    return this.httpClient
   .get<Subscription>(`${API_URL}/${ENTITY_URL}/GetSubscriptionT/${TenantId}`);
  }
  getSubscriptionById(Subscriptionid){
    return this.httpClient
   .get<Subscription>(`${API_URL}/${ENTITY_URL}/${Subscriptionid}`);
  }

  UpdateSubscriptionBYid(Subscription){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModSubscription`,Subscription);
  }

  AddSubscription(Subscription){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addSubscription`,Subscription);
  }

  deleteSubscriptionById(Subscriptionid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelSubscription/${Subscriptionid}`);
  }
}
