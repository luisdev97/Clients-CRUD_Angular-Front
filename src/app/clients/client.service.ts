import { Injectable } from '@angular/core';
import Client from 'src/models/client';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


//{ providedIn: 'root' }
@Injectable()
export class ClientService {

  private urlEndPoint: string = 'http://localhost:9090/api/clients';
  private httpHeaders = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private router: Router) { }

  
  getClients(): Observable<Client[]> {
    //El metodo get del objeto http siempre retornara un observable
    let clients = this.http.get<Client[]>(this.urlEndPoint);
    return clients;
  }


  getClient(id): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        swal.fire(`Error removing the client with ID ${id}`, e.error.message , 'error');
        console.log(e.error.message);
        return throwError(e);
      })
    );
  }


  create(client: Client): Observable<Client> {
    let newClient = this.http.post<any>(this.urlEndPoint, client, this.httpHeaders);
    return newClient.pipe(
      map(response => response.client as Client), 
      catchError(e => {
        this.router.navigate(['/clients']);
        swal.fire(e.error.message , e.error.preciseMessage , 'error');
        return throwError(e);
      })
    );
  }


  update(client: Client): Observable<Client> {
    let updatedClient = this.http.put<any>(`${this.urlEndPoint}/${client.id}`, client, this.httpHeaders);
    return updatedClient.pipe(
      map(response => response.client as Client),
      catchError(e  => {
        swal.fire(`Error modifying the client with ID ${client.id}`, e.error.message , 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Client>{
    let removedClient = this.http.delete<Client>(`${this.urlEndPoint}/${id}`, this.httpHeaders);
    return removedClient.pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        swal.fire(`Error removing the client with ID ${id}`, e.error.message , 'error');
        return throwError(e);
      })
    );
  }

}
