import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ['name','surname','mail', 'phone', 'adress','username','role','tenant','actions'];
  users:MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usersdat:User[]

  constructor(private UserService:UserService,
              private route:Router) {
   }

  ngOnInit(): void {
    this.RetrieveAllUsers();
  }

  applyFilterClient(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.users.filter = filterValue
  }

  RetrieveAllUsers(){
    this.UserService.getAllUsers().
    subscribe(
      (data: any) => {
        this.usersdat = data
        //this.Users = new MatTableDataSource(data); 
        setTimeout(() => { 
          this.users = new MatTableDataSource(data); 
          this.users.paginator = this.paginator; 
          this.users.sort = this.sort; }); 
        }    
    )
}
  Modifier(SelectedUser:User){
    this.route.navigate(['addUser',SelectedUser.id])
  }
  Supprimer(SelectedUser){
    this.UserService.deleteUserById(SelectedUser).
    subscribe(
      response => this.RetrieveAllUsers()
    );
  }
}
