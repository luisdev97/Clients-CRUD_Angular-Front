import { Component, OnInit } from '@angular/core';
import Client from '../../models/client';
import { ClientService } from './client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'ClientForm',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private client: Client = new Client();
  private title: string = "Create Client";
  private errors: string[];

  constructor(private clientService: ClientService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadClient();
  }

  loadClient(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      id && this.clientService.getClient(id).subscribe(client => this.client = client);      
    })
  }


  public create(): void {
     this.clientService.create(this.client).subscribe(
       client => {
        //this.router.navigate(['/clients']);
        //swal.fire('Saved client', `Client ${ client.name } successfully created`, 'success');
      },
      e => {
        this.errors = e.error.errors as string[];
        console.log(this.errors);
      }
     );
  }


  public update(): void {
    this.clientService.update(this.client).subscribe(
      client => {
        this.router.navigate(['/clients']);
        swal.fire('Modified client', `Client ${ client.name } successfully modified`, 'success');
      },
      e => {
        this.errors = e.error.errors as string[];
      }
    )
  }


}
