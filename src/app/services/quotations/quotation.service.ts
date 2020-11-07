import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { Client } from '../clients/client.service';
import { Company } from '../company/company.service';
import { User } from '../users/user.service';

export class Quotation{
  constructor(
    public id:number,
    public amount:string,
    public client:Client,
    public company:Company,
    public user:User
  ){}
}
export const ENTITY_URL = 'quotations'
@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(private httpClient: HttpClient) { }

  getAllQuotations(){
    if(sessionStorage.getItem('role')=== "SUPER_ADMIN" )
    return this.httpClient
   .get<Quotation[]>(`${API_URL}/${ENTITY_URL}/GetAllQuotations`);
   else
   return this.httpClient
   .get<Quotation[]>(`${API_URL}/${ENTITY_URL}/GetAllQuotationsT/${sessionStorage.getItem('tenantId')}`);
  }
  // getQuotationByTenantId(tenantId){
  //   return this.httpClient
  //  .get<Quotation[]>(`${API_URL}/${ENTITY_URL}/GetAllQuotationsT/${tenantId}`);
  // }

  getQuotationById(Quotationid){
    return this.httpClient
   .get<Quotation>(`${API_URL}/${ENTITY_URL}/${Quotationid}`);
  }

  UpdateQuotationBYid(Quotation){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModQuotation`,Quotation);
  }

  AddQuotation(Quotation){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addQuotation`,Quotation);
  }

  GetAllQuotationByClient(client){
    return this.httpClient
 .post<Quotation[]>(`${API_URL}/${ENTITY_URL}/GetAllQuotationByClient`,client);
  }

  deleteQuotationById(Quotationid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelQuotation/${Quotationid}`);
  }
}
