import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{
  contact: any = {};
  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo
  ngOnInit(): void{ 
    this.contactsService.getContact(this.route.snapshot.params['id']).subscribe(data => {
      // data? this.contact = data: this.contact = ""; //si data es true, se asigna el valor de data a contact, sino se asigna un string vacio
      this.contact = data; 
  });
}
  editContact(){
    this.router.navigate(['/contact/edit', this.route.snapshot.params['id']]);
  }
  closeContact(){
    this.router.navigate(['/contacts']);
  }
}
