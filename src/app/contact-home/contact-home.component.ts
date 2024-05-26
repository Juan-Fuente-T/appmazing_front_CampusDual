import { Component } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.css']
})
export class ContactHomeComponent {
  dataSource: any = [];
  constructor(
    private contactService: ContactsService,
    private router: Router
  ) {}
  // displayedColumns: string[] = ['name', 'surname', 'lastname', 'telephone', 'email'];//se pasan los datos directamente y se elimina esta variable
  //ngAfterOnInit(){ //este seria para desdepues de que se haya cargado toda la vista, el html completo
  ngOnInit(){
    this.contactService.getContacts().subscribe(data => {
      if(Array.isArray(data)){
        this.dataSource = data;
        // debugger;
      }
    })
  }
  openDetailForm(row: any){
    this.router.navigate(['/contact', row.id]);
  }
}
