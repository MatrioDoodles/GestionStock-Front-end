import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier, SupplierService } from 'src/app/services/suppliers/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {

  Supplier: Supplier
  Supplierresp:Supplier
  btnname: string
  currentFile: File;
  uploadService: any;
  constructor(private route: ActivatedRoute,
    private SupplierService: SupplierService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['updateElement'] === '0') {
      this.Supplier = new Supplier(null, '', '',
        '', '', null,null,'',null,Number(sessionStorage.getItem('tenantId')),null)
        
      this.btnname = "Ajouter"
    }
    
    else {
      this.SupplierService.getSupplierById(this.route.snapshot.params['updateElement']).
        subscribe(
          (data: any) => {
            this.Supplier = data;
          }
        )
      this.btnname = "Modifier"
      
      
    }
  }
  onFileChange(event){
    this.currentFile = event.target.files[0];
    console.log(this.Supplier);
  }
  submit() {
    console.log(this.currentFile)
    if (this.route.snapshot.params['updateElement'] === "0") {
      this.SupplierService.AddSupplier(this.Supplier).subscribe(
        (resp:Supplier) => {
          this.Supplierresp=resp
          if(this.currentFile!=null){
            this.SupplierService.upload(this.currentFile,this.Supplierresp.id).subscribe()
            this.router.navigate(['listSuppliers']);}}
      );

    }
    else {
      this.SupplierService.UpdateSupplierBYid(this.Supplier).subscribe(
        (resp:Supplier) => {this.Supplierresp=resp}
      )
      if(this.currentFile!=null){
      this.SupplierService.upload(this.currentFile,this.Supplier.id).subscribe(
        (response:any) => {
          console.log(response)
        }
      )}
      this.router.navigate(['listSuppliers']);
    }

  }

}
