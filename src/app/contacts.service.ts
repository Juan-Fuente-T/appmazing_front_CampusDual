import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any>{
    const url = 'http://localhost:30030/contacts/getAll';
    const headers = new HttpHeaders();
    //.set('Authorization', 'Basic ' + btoa('demo:demo'))
    //.set('X-User', 'demo')
    //.set('X-Password', 'demo');
    return this.http.get<any>(url, {headers});
  }
  getContact(c_id: number): Observable<any>{
    const url = 'http://localhost:30030/contacts/get';
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json');
    const body = JSON.stringify({id: c_id});
    return this.http.post<any>(url, body, {headers});
  }

  // updateContact(contact: any){
  //   const url = 'http://localhost:30030/contacts/update';
  //   const headers = new HttpHeaders();
  //   const body = contact;
  //   this.http.put(url, body, {headers}).subscribe();
  // }
  updateContact(contact: any): Observable<any>{
    const url = 'http://localhost:30030/contacts/update';
    const headers = new HttpHeaders();
    const body = contact;
    return this.http.put(url, body, {headers});
  }
  newContact(contact: any): void{
    const url = 'http://localhost:30030/contacts/add';
    const headers = new HttpHeaders();
    const body = contact;
    this.http.post(url, body, {headers}).subscribe();
  }
  // newContact(contact: any): Observable<any>{
  //   const url = 'http://localhost:30030/contacts/add';
  //   const headers = new HttpHeaders();
  //   const body = contact;
  //   return this.http.post(url, body, {headers});
  // }

  deleteContact(id:number): void{
    const url = 'http://localhost:30030/contacts/delete';
    const body = {id:id};
    const options = {
      body: body,
      header:  new HttpHeaders()
    };
    this.http.delete(url, options).subscribe();
  }
}
