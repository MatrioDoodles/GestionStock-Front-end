import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientService } from 'src/app/services/clients/client.service';
import { Quotation, QuotationService } from 'src/app/services/quotations/quotation.service';

@Component({
  selector: 'app-list-quotations-by-client',
  templateUrl: './list-quotations-by-client.component.html',
  styleUrls: ['./list-quotations-by-client.component.scss']
})
export class ListQuotationsByClientComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'phone', 'adress', 'email','listfactures','listdevis','listcmds','actions'];
  Quotations:MatTableDataSource<Quotation>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  client:Client;

  constructor(private QuotationService:QuotationService,
              private clientService:ClientService,
              private router:Router,
              private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.RetrieveAllQuotations();
  }

  applyFilterClient(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.Quotations.filter = filterValue
  }

  RetrieveAllQuotations(){
    this.clientService.getClientById(this.route.snapshot.params['client'])
    .subscribe(
      response => {this.client = response}
    )
    this.QuotationService.GetAllQuotationByClient(this.client).
    subscribe(
      (data: any) => {
        this.Quotations = new MatTableDataSource(data); 
        setTimeout(() => { 
          this.Quotations = new MatTableDataSource(data); 
          this.Quotations.paginator = this.paginator; 
          this.Quotations.sort = this.sort; }); 
        }
          
    )

  }
  Modifier(SelectedClient:Client){
    this.router.navigate(['addQuotation',SelectedClient.id])
  }
  Supprimer(SelectedClient){
    this.QuotationService.deleteQuotationById(SelectedClient).
    subscribe(
      response => this.RetrieveAllQuotations()
    );
  }
}
