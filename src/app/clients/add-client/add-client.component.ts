import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientService } from 'src/app/services/clients/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  client: Client
  clientResp:Client
  btnname: string
  WarnMsg:string
  EmailExistant = false
  constructor(private route: ActivatedRoute,
    private ClientService: ClientService,
    private router: Router) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['updateElement'] === '0') {
      this.client = new Client(null, '', '',
        '', '', null,0,null,null,null,null)
      this.btnname = "Ajouter"
    }
    
    else {
      this.ClientService.getClientById(this.route.snapshot.params['updateElement']).
        subscribe(
          (data: any) => {
            this.client = data;
          }
        )
      this.btnname = "Modifier"
    }
  }
  submit() {
    if (this.route.snapshot.params['updateElement'] === "0") {
      this.ClientService.AddClient(this.client).subscribe(
        (response:Client) => {

          if (response.name === "Email") {
            this.WarnMsg=response.mail
            this.EmailExistant = true
          }
          else {
            this.router.navigate(['listClients']);
          }
        }
      );
    }
    else {
      this.ClientService.UpdateClientBYid(this.client).subscribe(
        response => {
          this.router.navigate(['listClients'])
        }
      );
    }

  }
}


