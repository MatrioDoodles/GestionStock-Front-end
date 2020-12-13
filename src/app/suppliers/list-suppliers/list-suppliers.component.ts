import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ENTITY_URL, Supplier, SupplierService } from 'src/app/services/suppliers/supplier.service';
import { API_URL } from 'src/app/app.const';

@Component({
  selector: 'app-list-suppliers',
  templateUrl: './list-suppliers.component.html',
  styleUrls: ['./list-suppliers.component.scss']
})
export class ListSuppliersComponent implements OnInit {

  displayedColumns: string[] = ['reference','logo','nom', 'phone', 'adress', 'email','description','listproduits','actions'];
  suppliers:MatTableDataSource<Supplier>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  suppliersdat:Supplier[]

  constructor(private supplierService:SupplierService,
              private route:Router) {
   }

  ngOnInit(): void {
    this.RetrieveAllSuppliers();
  }

  applyFilterClient(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.suppliers.filter = filterValue
  }

  RetrieveAllSuppliers(){
    this.supplierService.getAllSuppliers().
    subscribe(
      (data: any) => {
        this.suppliersdat = data
        for(let i=0;i<this.suppliersdat.length;i++)
        {
        
              this.suppliersdat[i].logoImg = `${API_URL}/${ENTITY_URL}/img/${this.suppliersdat[i].id}`
              
            }
        
        //this.suppliers = new MatTableDataSource(data); 
        setTimeout(() => { 
          this.suppliers = new MatTableDataSource(data); 
          this.suppliers.paginator = this.paginator; 
          this.suppliers.sort = this.sort; }); 
        }    
    )
}
  Modifier(SelectedSupplier:Supplier){
    this.route.navigate(['addSupplier',SelectedSupplier.id])
  }
  Supprimer(SelectedSupplier){
    this.supplierService.deleteSupplierById(SelectedSupplier).
    subscribe(
      response => this.RetrieveAllSuppliers()
    );
  }
}
