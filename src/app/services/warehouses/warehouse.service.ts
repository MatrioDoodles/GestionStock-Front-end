import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.const';
import { User } from '../users/user.service';


export class Warehouse{
  constructor(
    public id:number,
    public reference:number,
    public label:string,
    public type:string,
    public tenant_id:number,
    public users:User[]
  ){}
}
export const ENTITY_URL = 'warehouses'
@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private httpClient: HttpClient) { }

  getAllWarehouses(){
    return this.httpClient
   .get<Warehouse[]>(`${API_URL}/${ENTITY_URL}/GetAllWarehouses`);
  }

  getWarehouseById(Warehouseid){
    return this.httpClient
   .get<Warehouse>(`${API_URL}/${ENTITY_URL}/${Warehouseid}`);
  }

  getWarehouseByTenantId(tenantId){
    return this.httpClient
   .get<Warehouse[]>(`${API_URL}/${ENTITY_URL}/GetAllWarehousesT/${tenantId}`);
  }
  UpdateWarehouseBYid(Warehouse){
    return this.httpClient
    .put(`${API_URL}/${ENTITY_URL}/ModWarehouse`,Warehouse);
  }

  AddWarehouse(Warehouse){
    return this.httpClient
 .post(`${API_URL}/${ENTITY_URL}/addWarehouse`,Warehouse);
  }

  deleteWarehouseById(Warehouseid){
    return this.httpClient
    .delete(`${API_URL}/${ENTITY_URL}/DelWarehouse/${Warehouseid}`);
  }
}
