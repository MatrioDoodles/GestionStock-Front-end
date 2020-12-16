import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { SubscriptionService } from 'src/app/services/subscriptions/subscription.service';
import { Role, User, UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  User: User
  Userresp:User
  rolesCol:Role[]
  role:number
  btnname: string
  currentFile: File;
  uploadService: any;
  constructor(private route: ActivatedRoute,
    private UserService: UserService,
    private CompanyService: CompanyService,
    private SubscriptionService:SubscriptionService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.UserService.getAllRoles().subscribe(
      response => {
        setTimeout(() => { 
          this.rolesCol = response;
          this.rolesCol.shift();
          this.rolesCol.pop(); }); 

      } 
    )
    
    if (this.route.snapshot.params['updateElement'] === '0') {
      this.User = new User(null, '','', '',
        '', '', '','',null,null,null,null,null,null,null,null)
      this.UserService.getUserById(sessionStorage.getItem('tenantId')).subscribe(
        response => {
          setTimeout(() => { 
            this.User.tenant = response
           });  
        }
      ); 
      this.CompanyService.getTenantCompany(sessionStorage.getItem('tenantId')).subscribe(
        response => {
          setTimeout(() => { 
            this.User.company = response
           });  
        }
      )  
      this.SubscriptionService.getSubscriptionByTenantId(sessionStorage.getItem('tenantId')).subscribe(
        response => {
          setTimeout(() => { 
            this.User.subscription = response
           });  
        }
      )  
      console.log(this.User)  
      this.btnname = "Ajouter"
    }
    
    else {
      this.UserService.getUserById(this.route.snapshot.params['updateElement']).
        subscribe(
          (data: any) => {
            this.User = data;
          }
        )
      this.btnname = "Modifier"
      
      
    }
  }
  submit() {
    console.log(this.User);
    
    this.role = this.role - 2
    this.User.role = this.rolesCol[this.role]
    if (this.route.snapshot.params['updateElement'] === "0") {
      this.UserService.AddUser(this.User).subscribe(
        (resp:User) => {
          this.Userresp=resp
            this.router.navigate(['listUsers'])}
      );

    }
    else {
      this.UserService.UpdateUserBYid(this.User).subscribe(
        (resp:User) => {this.Userresp=resp}
      )
      this.router.navigate(['listUsers']);
    }

  }

}
