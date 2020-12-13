import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Warehouse, WarehouseService } from 'src/app/services/warehouses/warehouse.service';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.scss']
})
export class AddWarehouseComponent implements OnInit {

  Warehouse: Warehouse
  WarehouseResp:Warehouse
  btnname: string
  WarnMsg:string
  EmailExistant = false
  constructor(private route: ActivatedRoute,
    private WarehouseService: WarehouseService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['updateElement'] === '0') {
      this.Warehouse = new Warehouse(null,null, '',
        '', Number(sessionStorage.getItem('tenantId')), null)
        console.log(Number(sessionStorage.getItem('tenantId')))
        console.log(this.Warehouse);
        
      this.btnname = "Ajouter"
    }
    
    else {
      this.WarehouseService.getWarehouseById(this.route.snapshot.params['updateElement']).
        subscribe(
          (data: any) => {
            this.Warehouse = data;
          }
        )
      this.btnname = "Modifier"
    }
  }
  submit() {
    if (this.route.snapshot.params['updateElement'] === "0") {
      this.WarehouseService.AddWarehouse(this.Warehouse).subscribe(
        (response:Warehouse) => {
            this.router.navigate(['listWarehouses']);
        }
      );
    }
    else {
      this.WarehouseService.UpdateWarehouseBYid(this.Warehouse).subscribe(
        response => {
          this.router.navigate(['listWarehouses'])
        }
      );
    }

  }

}
