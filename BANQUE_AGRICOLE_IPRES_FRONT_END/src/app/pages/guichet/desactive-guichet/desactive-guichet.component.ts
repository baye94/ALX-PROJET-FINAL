import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DesactivationComponent } from '@pages/parametre/utilisateur/desactivation/desactivation.component';
import { GuichetService } from '@services/guichet.service';
import { NotificationService } from '@services/notification.service';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-desactive-guichet',
  templateUrl: './desactive-guichet.component.html',
  styleUrls: ['./desactive-guichet.component.scss']
})
export class DesactiveGuichetComponent implements OnInit {

  idGuichet:any;
   statut:any;

  constructor(private token:TokenService , private router: Router  ,private notification: NotificationService ,private guichetSerivce:GuichetService , public dialogref: MatDialogRef<DesactivationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
    if (this.data.idGuichet != null && this.data.idGuichet != '') {
      console.log("modal is back " , this.data);
       this.idGuichet = this.data.idGuichet;
       this.statut = this.data.statut;
     
      
    }
    
  }

  Deactivate(){
    let input:any;
    if (this.statut == 1) {
      input ={
        "idGuichet": this.idGuichet,
        "status": 0
      }
      }else{
        input ={
          "idGuichet": this.idGuichet,
          "status": 1
      }
      
    }
    console.log("input " , input)
    this.guichetSerivce.DesactivateGuichet(input).subscribe({
      next: (value) => {
        this.notification.showSuccess("mise á jour statut guichet" ,"Guichet")
      },
      error: (err:HttpErrorResponse) => {
        this.notification.showError(err.error.error, "Fermeture Guichet")
      },
      complete: () => {
      }
    })

  }
}
