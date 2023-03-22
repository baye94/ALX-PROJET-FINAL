import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DesactivationComponent } from '@pages/parametre/utilisateur/desactivation/desactivation.component';
import { AgenceService } from '@services/agence.service';
import { GuichetService } from '@services/guichet.service';
import { NotificationService } from '@services/notification.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-desactive-agence',
  templateUrl: './desactive-agence.component.html',
  styleUrls: ['./desactive-agence.component.scss']
})
export class DesactiveAgenceComponent implements OnInit {

  idAgence:any;
   statut:any;

  constructor(private token:TokenService , private router: Router  ,private notification: NotificationService , private agenceService : AgenceService , public dialogref: MatDialogRef<DesactivationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
    if (this.data.idAgence != null && this.data.idAgence != '') {
      console.log(" this.data " , this.data);
       this.idAgence = this.data.idAgence;
       this.statut = this.data.statut;
     
      
    }
    
  }

  Deactivate(){
    let input:any;
    if (this.statut == 1) {
      input ={
        "idAgence": this.idAgence,
        "status": 0
      }
      }else{
        input = {
          "idAgence": this.idAgence,
          "status": 1
      }
      
    }
    console.log("input " , input)
    this.agenceService.DesactivateAgence(input).subscribe({
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
