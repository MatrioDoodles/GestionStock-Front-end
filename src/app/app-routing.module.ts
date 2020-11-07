import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { LoginComponent } from './misc/login/login.component';
import { WelcomeComponent } from './misc/welcome/welcome.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { ListOrdersComponent } from './orders/list-orders/list-orders.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { ListSuppliersComponent } from './suppliers/list-suppliers/list-suppliers.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { AddWarehouseComponent } from './warehouses/add-warehouse/add-warehouse.component';
import { ListWarehousesComponent } from './warehouses/list-warehouses/list-warehouses.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'addClient/:updateElement', component: AddClientComponent },
  { path: 'listClients', component: ListClientsComponent },
  { path: 'addCategory/:updateElement', component: AddCategoryComponent },
  { path: 'listCategories', component: ListCategoriesComponent },
  { path: 'addOrder/:updateElement', component: AddOrderComponent },
  { path: 'listOrders', component: ListOrdersComponent },
  { path: 'addProduct/:updateElement', component: AddProductComponent },
  { path: 'listProducts', component: ListProductsComponent },
  { path: 'addSupplier/:updateElement', component: AddSupplierComponent },
  { path: 'listSuppliers', component: ListSuppliersComponent },
  { path: 'addUser/:updateElement', component: AddUserComponent },
  { path: 'listUsers', component: ListUsersComponent },
  { path: 'addWarehouse/:updateElement', component: AddWarehouseComponent },
  { path: 'listWarehouses', component: ListWarehousesComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
