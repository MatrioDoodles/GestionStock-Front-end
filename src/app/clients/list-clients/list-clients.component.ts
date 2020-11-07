import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client, ClientService} from '../../services/clients/client.service'

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'phone', 'adress', 'email','actions'];
  clients:MatTableDataSource<Client>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clientService:ClientService,
              private route:Router) {
   }

  ngOnInit(): void {
    this.RetrieveAllClients();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.clients.filter = filterValue
  }

  RetrieveAllClients(){
    this.clientService.getAllClients().
    subscribe(
      (data: any) => {
        this.clients = new MatTableDataSource(data); 
        setTimeout(() => { 
          this.clients = new MatTableDataSource(data); 
          this.clients.paginator = this.paginator; 
          this.clients.sort = this.sort; }); 
        }
          
    )

  }
  Modifier(SelectedClient:Client){
    this.route.navigate(['addClient',SelectedClient.id])
  }
  Supprimer(SelectedClient){
    this.clientService.deleteClientById(SelectedClient).
    subscribe(
      response => this.RetrieveAllClients()
    );
  }
  AfficherDetails(SelectedClient){}
}


