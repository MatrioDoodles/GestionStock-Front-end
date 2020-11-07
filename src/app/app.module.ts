import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuComponent } from './misc/menu/menu.component';
import { FooterComponent } from './misc/footer/footer.component';
import { WelcomeComponent } from './misc/welcome/welcome.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { ListOrdersByClientComponent } from './clients/list-orders-by-client/list-orders-by-client.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { ListOrdersComponent } from './orders/list-orders/list-orders.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { ListSuppliersComponent } from './suppliers/list-suppliers/list-suppliers.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddWarehouseComponent } from './warehouses/add-warehouse/add-warehouse.component';
import { ListWarehousesComponent } from './warehouses/list-warehouses/list-warehouses.component';
import { LoginComponent } from './misc/login/login.component';
import { HttpInterceptorService } from './services/auth/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    WelcomeComponent,
    AddClientComponent,
    ListClientsComponent,
    ListOrdersByClientComponent,
    ListCategoriesComponent,
    AddCategoryComponent,
    AddOrderComponent,
    ListOrdersComponent,
    ListProductsComponent,
    AddProductComponent,
    AddSupplierComponent,
    ListSuppliersComponent,
    ListUsersComponent,
    AddUserComponent,
    AddWarehouseComponent,
    ListWarehousesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
