import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { Invoice } from '../invoices/invoice.service';
import { Quotation } from '../quotations/quotation.service';
import { User } from '../users/user.service';

export class Company{
  constructor(
    public id:number,
    public name:string,
    public description:string,
    public adress:string,
    public lang:string,
    public logo:string,
    public logoImg:File,
    public phone:string,
    public tenantid:number,
    public quotations:Quotation[],
    public invoices:Invoice[],
    public users:User[]

  ){}
}
export const ENTITY_URL = 'companies'
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    constructor(private httpClient: HttpClient) { }

  getAllCompanys(){
    return this.httpClient
   .get<Company[]>(`${API_URL}/${ENTITY_URL}/GetAllCompanys`);
  }

  getTenantCompany(tenantId){
    
    return this.httpClient
   .get<Company[]>(`${API_URL}/${ENTITY_URL}/Company/${tenantId}`);
  }
  getCompanyById(Catid){
    return this.httpClient
   .get<Company>(`${API_URL}/${ENTITY_URL}/${Catid}`);
  }

  UpdateCompanyBYid(Company){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModCompany`,Company);
  }

  AddCompany(Company){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addCompany`,Company);
  }

  deleteCompanyById(Companyid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelCompany/${Companyid}`);
  }
  upload(pic:File){
    return this.httpClient
   .post(`${API_URL}/${ENTITY_URL}/upload`,pic);
  }

  getImg(Supplierid){
    return this.httpClient
    .get<File>(`${API_URL}/${ENTITY_URL}/img/${Supplierid}`);
  }
   }

   
