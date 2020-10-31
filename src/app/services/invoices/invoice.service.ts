import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { Client } from '../clients/client.service';
import { Company } from '../company/company.service';
import { Order } from '../orders/order.service';
import { User } from '../users/user.service';

export class Invoice{
  constructor(
    public id:number,
    public creation_date:Date,
    public pay_date:Date,
    public tenant_id:number,
    public user:User,
    public company:Company,
    public client:Client,
    public order:Order
  ){}
}
export const ENTITY_URL = 'invoices'
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient: HttpClient) { }

  getAllInvoices(){
    return this.httpClient
   .get<Invoice[]>(`${API_URL}/${ENTITY_URL}/GetAllInvoices`);
  }
  getAllInvoicesByTenantId(tenantId){
    return this.httpClient
   .get<Invoice[]>(`${API_URL}/${ENTITY_URL}/GetAllInvoicesT/${tenantId}`);
  }
  getInvoiceById(InvoiceId){
    return this.httpClient
   .get<Invoice>(`${API_URL}/${ENTITY_URL}/${InvoiceId}`);
  }
  getInvoicesByClient(client){
    return this.httpClient
   .post<Invoice[]>(`${API_URL}/${ENTITY_URL}/InvoiceByClient`,client);
  }
  getInvoicesByOrder(order){
    return this.httpClient
   .post<Invoice[]>(`${API_URL}/${ENTITY_URL}/InvoiceByOrder`,order);
  }

  UpdateInvoiceBYid(Invoice){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModInvoice`,Invoice);
  }

  AddInvoice(Invoice){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addInvoice`,Invoice);
  }

  deleteInvoiceById(Invoiceid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelInvoice/${Invoiceid}`);
  }
   }
