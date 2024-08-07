import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientService } from 'src/app/services/clients/client.service';
import { Order, OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'phone', 'adress', 'email','listfactures','listdevis','listcmds','actions'];
  orders:MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  client:Client;

  constructor(private orderService:OrderService,
              private clientService:ClientService,
              private router:Router,
              private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.RetrieveAllOrders();
  }

  applyFilterClient(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.orders.filter = filterValue
  }

  RetrieveAllOrders(){
    if(this.route.snapshot.params['client']==='All')
    {
      this.orderService.getAllOrders().subscribe(
      (data: any) => {
        this.orders = new MatTableDataSource(data); 
        setTimeout(() => { 
          this.orders = new MatTableDataSource(data); 
          this.orders.paginator = this.paginator; 
          this.orders.sort = this.sort; }); 
      }   
    )
    }
    else{
    this.clientService.getClientById(this.route.snapshot.params['client'])
    .subscribe(
      response => {this.client = response}
    )
    this.orderService.GetOrdersByClient(this.client).
    subscribe(
      (data: any) => {
        this.orders = new MatTableDataSource(data); 
        setTimeout(() => { 
          this.orders = new MatTableDataSource(data); 
          this.orders.paginator = this.paginator; 
          this.orders.sort = this.sort; }); 
        }
          
    )
  }
  }
  Modifier(SelectedClient:Client){
    this.router.navigate(['addOrder',SelectedClient.id])
  }
  Supprimer(SelectedClient){
    this.orderService.deleteOrderById(SelectedClient).
    subscribe(
      response => this.RetrieveAllOrders()
    );
  }


}
