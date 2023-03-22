import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnnulerPaiementModalComponent } from '@modules/main/header/notifications/annuler-paiement-modal/annuler-paiement-modal.component';
import { NotificationsComponent } from '@modules/main/header/notifications/notifications.component';
import { ApiService } from '@services/api.service';
import { NotificationService } from '@services/notification.service';
import { PaiementService } from '@services/paiement.service';
import { TokenService } from '@services/token.service';
//  import {NotificationsComponent} from '../../../modules/main/header/notifications/notifications.component';

@Component({
  selector: 'app-demande-annulation-paiement',
  templateUrl: './demande-annulation-paiement.component.html',
  styleUrls: ['./demande-annulation-paiement.component.scss'],
  providers: [NotificationsComponent]
})
export class DemandeAnnulationPaiementComponent implements OnInit {

  constructor(private token:TokenService ,private d :NotificationsComponent  ,public dialogRef: MatDialogRef<DemandeAnnulationPaiementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private notification : NotificationService  ,private router:Router  , private service:PaiementService , private apiService:ApiService) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
    console.log("id apiement 222" , this.data.idPaiement);
  }
  dataSource: any;
  paiementdata: any;
  demamdes:any;
  commentFC = new FormControl('', [
    Validators.required, 
    Validators.maxLength(255),
    Validators.minLength(10)
  ]);

  DemandeAnnulationPaiement(){
    var input = {
      "id": "",
      "motif": this.commentFC.value,
      "idAgent": "",
      "idPaiement": this.data.idPaiement,
      "date": ""
    }
    this.service.DemandeAnnulationPaiement(input).subscribe({
      next: (value) =>{
       this.notification.showSuccess("Votre demande est envoyée ","Annulation Demande");
      },
      error: (error: HttpErrorResponse) => {
    this.notification.showError(error.error,"Erreur Annulation Demande");
      },
      complete: () => {
       this.dialogRef.close();
   
   },
    })
   
   console.log("text dsfsdfsd" , input);
   }

   

}
