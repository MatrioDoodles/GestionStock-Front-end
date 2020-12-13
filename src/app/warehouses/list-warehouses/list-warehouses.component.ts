import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from 'src/app/services/products/product.service';
import { Warehouse, WarehouseService } from 'src/app/services/warehouses/warehouse.service';

@Component({
  selector: 'app-list-warehouses',
  templateUrl: './list-warehouses.component.html',
  styleUrls: ['./list-warehouses.component.scss']
})
export class ListWarehousesComponent implements OnInit {

  Warehouses:Warehouse[];
  Products:Product[];


  constructor(private WarehouseService:WarehouseService,
              private productService:ProductService,
              private route:Router) {
   }

  ngOnInit(): void {
    this.RetrieveAllWarehouses();
  }

  RetrieveAllWarehouses(){
    this.WarehouseService.getAllWarehouses().
    subscribe(
      (data: any) => {
        //setTimeout(() => { 
          this.Warehouses = data;
        // }); 
        for(let i=0;i<this.Warehouses.length;i++)
        {
          this.productService.GetProductsByWarehouse(this.Warehouses[i])
          .subscribe(
            (response:any) =>{
              setTimeout(() => { 
                this.Warehouses[i].products = response; });
              
            }
          )
        }
        }
          
    )

  }
  Modifier(SelectedProduct:Product){
    this.route.navigate(['addProduct',SelectedProduct.id])
  }
  Supprimer(SelectedProduct){
    this.productService.deleteProductById(SelectedProduct).
    subscribe(
      response => this.RetrieveAllWarehouses()
    );
  }
  ModifierE(SelectedWarehouse:Warehouse){
    this.route.navigate(['addWarehouse',SelectedWarehouse.id])
  }
  SupprimerE(SelectedWarehouse){
    this.WarehouseService.deleteWarehouseById(SelectedWarehouse).
    subscribe(
      response => this.RetrieveAllWarehouses()
    );
  }

}
