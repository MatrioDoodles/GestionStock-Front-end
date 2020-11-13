import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientService } from 'src/app/services/clients/client.service';
import { Invoice, InvoiceService } from 'src/app/services/invoices/invoice.service';

@Component({
  selector: 'app-list-invoices-by-client',
  templateUrl: './list-invoices-by-client.component.html',
  styleUrls: ['./list-invoices-by-client.component.scss']
})
export class ListInvoicesByClientComponent implements OnInit {

  displayedColumns: string[] = ['datecmd', 'datepay', 'somme', 'client','cmd','listprod'/*,'actions'*/];
  Invoices:MatTableDataSource<Invoice>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  client:Client;

  constructor(private InvoiceService:InvoiceService,
              private clientService:ClientService,
              private router:Router,
              private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.RetrieveAllInvoices();
  }

  applyFilterClient(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.Invoices.filter = filterValue
  }

  RetrieveAllInvoices(){
    this.clientService.getClientById(this.route.snapshot.params['client'])
    .subscribe(
      response => {this.client = response}
    )
    this.InvoiceService.getInvoicesByClient(this.client).
    subscribe(
      (data: any) => {
        this.Invoices = new MatTableDataSource(data); 
        setTimeout(() => { 
          this.Invoices = new MatTableDataSource(data); 
          this.Invoices.paginator = this.paginator; 
          this.Invoices.sort = this.sort; }); 
        }
          
    )

  }
  Modifier(SelectedClient:Client){
    this.router.navigate(['addInvoice',SelectedClient.id])
  }
  Supprimer(SelectedClient){
    this.InvoiceService.deleteInvoiceById(SelectedClient).
    subscribe(
      response => this.RetrieveAllInvoices()
    );
  }
}
