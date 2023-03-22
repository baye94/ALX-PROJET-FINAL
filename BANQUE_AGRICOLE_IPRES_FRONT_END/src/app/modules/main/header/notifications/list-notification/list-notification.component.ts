import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@services/notification.service';
import { PaiementService } from '@services/paiement.service';
import { AnnulerPaiementModalComponent } from '../annuler-paiement-modal/annuler-paiement-modal.component';
import { ViewPaiementDetailComponent } from '../view-paiement-detail/view-paiement-detail.component';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss']
})
export class ListNotificationComponent implements OnInit {

  constructor(public dialog: MatDialog,private paiementService: PaiementService ,private notification:NotificationService) { }
  totalMessage: any;
  messageData: any;
  deuxieme: any;
  troisieme: any;
  premiere: any;
  demamdes: any;

  paiementdata: any;
    panelOpenState = false;
    nom:any;
    montant:any;
    evenement:any;
    matriculePensionnaire:any;
    datePaiement:any;
    cni:any;
    num:any;
    dateCreation:any;
    libelleGuichet:any;
    numGuichet:any;
    idPaiement:any;

  animal: string;
  name: string;

  ngOnInit(): void {
    this.paiementService.RequiredRefresh.subscribe(r => {
      this.GetAllMessage()
      this.paiementdata = this.messageData?.paiements
    })
    this.GetAllMessage()
    this.paiementdata = this.messageData?.paiements


  }
  GetDemande(input: any): any {
    this.demamdes = input;
    return this.demamdes;

  }
  GetIdPaiement(id:any){
    this.idPaiement = id;
    console.log("id paiement " , this.idPaiement);
    
  }

  GetAllMessage() {
    this.paiementService.GetMessagesAnnulationPaiement().subscribe({
      next: (value) => {
        this.messageData = value;
        console.log(value);
        console.log("totalMessage" , this.messageData[0].paiements)
        this.totalMessage = this.messageData?.length;
        this.premiere = this.messageData[0]
        this.deuxieme = this.messageData[1];
        this.troisieme = this.messageData[2];
      }
    })
  }
  GetDetailPaiement(data:any[]): void{
    for (let index = 0; index < data.length; index++) {
       this.dateCreation = data[index]?.dateCreation; 
       this.evenement = data[index]?.evenement;
       this.nom = data[index]?.prenom + " " + data[index]?.nom;
       this.num = data[index]?.num ;
       this.cni = data[index]?.cni;
       this.matriculePensionnaire = data[index]?.matriculePensionnaire;
       this.datePaiement = data[index]?.datePaiement;
       this.montant = data[index]?.montant;
       this.libelleGuichet = data[index]?.guichetlibelle;
       this.numGuichet = data[index]?.guichetnum;
   
     
    }
    }
    ConfirmationAnnulationDePaiement(){
     this.paiementService.ConfirmationAnnulationDePaiement(this.idPaiement).subscribe({
       next: (value)=>{
       this.notification.showSuccess("annulation paiement reuissiiii","paiement");
       },
       error: (err:HttpErrorResponse) =>{
          this.notification.showError(err.error,"paiement");
         console.log(err)
       },
       complete: () => {
        
     this.GetAllMessage();
     }
     })
    }
   
    openDialog(input:any): any {
      this.dialog.open(ViewPaiementDetailComponent, {
        width: '60%',
        data: {
          demande: input
          
        }
      }
    
      );

    }
  }
