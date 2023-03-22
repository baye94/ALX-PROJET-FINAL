import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@services/notification.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-role-utilisateur',
  templateUrl: './role-utilisateur.component.html',
  styleUrls: ['./role-utilisateur.component.scss']
})
export class RoleUtilisateurComponent implements OnInit {
idUser:any;
roleDataSource:any;
roleData:any;
selectedToppings:any
roleList:any;

displayedColumns:string[] = ['role']
  constructor( private serviceUser : UserService , private notification:NotificationService) { }

  ngOnInit(): void {
    this.idUser =localStorage.getItem('idUser');
    console.log(this.idUser);
    this.GetUserRole();
    this.GetAllRole();
  }
  toppings = new FormControl();
  SaveRole(inputData:any){
 var  input =  {
      "id": this.idUser,
      "roles": inputData
    }
    console.log("input " , input)
 this.serviceUser.AddUserToRole(input).subscribe({
  next: (value)=> {
 this.notification.showSuccess("mise á jours des rôles","Rôles");
  },
  error: (err) => {
   this.notification.showError("Veuillez vérifier les données", "Error");
  },
  complete: () => {
    this.roleDataSource = new MatTableDataSource<any>(this.selectedToppings)
  }
 })
  }
  GetAllRole(){
    this.serviceUser.GetAllRole().subscribe({
      next: (value) => { 
        this.roleList = value
     console.log("la liste des role" , value)
      }
    })
  }

  // toppingList = ['AppUser', 'super admin', ' chef agence', 'Agent'];
 
   
  GetUserRole(){
 this.serviceUser.GetUserRole(this.idUser).subscribe({
  next: (value) => {
    this.roleData = value
    this.selectedToppings = value
    this.roleDataSource = new MatTableDataSource<any>(value);
    console.log('Tableau de roles' , this.roleDataSource);
    console.log("les role sont " , value);
  }
 })


  }

}
