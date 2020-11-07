import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { User } from '../users/user.service';
export class History {
  constructor(
    public id:number,
    public entity:string,
    public action:string,
    public subject:string,
    public creating_user:User,
    public last_interacting_user:User,
    public tenantid:number
    ) { }
}




export const ENTITY_URL = 'history'
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private httpClient: HttpClient) { }

  getAllHistorys(){
    if(sessionStorage.getItem('role')=== "SUPER_ADMIN" )
    return this.httpClient
   .get<History[]>(`${API_URL}/${ENTITY_URL}/GetAllHistorys`);
   else
   return this.httpClient
   .get<History[]>(`${API_URL}/${ENTITY_URL}/GetAllHistorysT/${sessionStorage.getItem('tenantId')}`);
  }

  // getHistoryByTenantId(tenantId){
  //   return this.httpClient
  //  .get<History[]>(`${API_URL}/${ENTITY_URL}/GetAllHistorysT/${tenantId}`);
  // }
  getHistoryById(Historyid){
    return this.httpClient
   .get<History>(`${API_URL}/${ENTITY_URL}/${Historyid}`);
  }

  UpdateHistoryBYid(History){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModHistory`,History);
  }

  AddHistory(History){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addHistory`,History);
  }

  deleteHistoryById(Historyid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelHistory/${Historyid}`);
  }
}
