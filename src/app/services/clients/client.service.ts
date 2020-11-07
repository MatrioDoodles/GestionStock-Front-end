import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { Invoice } from '../invoices/invoice.service';
import { Order } from '../orders/order.service';
import { Quotation } from '../quotations/quotation.service';
import { User } from '../users/user.service';

export class Client{
  constructor(
  public id:number,
  public name:string,
  public mail:string,
  public phone:string,
  public adress:string,
  public amount_bought:number,
  public tenantid:number,
  public user:User,
  public orders:Order[],
  public quotations:Quotation[],
  public invoices:Invoice[]
  ){}
}
export const ENTITY_URL = 'clients'
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  getAllClients(){
    if(sessionStorage.getItem('role')=== "SUPER_ADMIN" )
    return this.httpClient
   .get<Client[]>(`${API_URL}/${ENTITY_URL}/GetAllClients`);
   else
   return this.httpClient
    .get<Client[]>(`${API_URL}/${ENTITY_URL}/GetAllClientsT/${sessionStorage.getItem('tenantId')}`);
  }
  // getAllClientsByTenant(tenantId){
  //   return this.httpClient
  //  .get<Client[]>(`${API_URL}/${ENTITY_URL}/GetAllClientsT/${tenantId}`);
  // }

  getClientById(Clientid){
    return this.httpClient
   .get<Client>(`${API_URL}/${ENTITY_URL}/${Clientid}`);
  }

  UpdateClientBYid(Client){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModClient`,Client);
  }

  AddClient(Client){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addClient`,Client);
  }

  deleteClientById(Clientid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelClient/${Clientid}`);
  }
}
