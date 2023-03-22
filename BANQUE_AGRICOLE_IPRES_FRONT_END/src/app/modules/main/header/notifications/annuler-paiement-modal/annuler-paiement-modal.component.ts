import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@services/notification.service';
import { PaiementService } from '@services/paiement.service';
  
@Component({
  selector: 'app-annuler-paiement-modal',
  templateUrl: './annuler-paiement-modal.component.html',
  styleUrls: ['./annuler-paiement-modal.component.scss']
})
@Injectable()

export class AnnulerPaiementModalComponent implements OnInit {
paiementDetail:any;

  constructor( public dialogRef: MatDialogRef<AnnulerPaiementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private paiementService:PaiementService , private notification:NotificationService , private dialog:MatDialog) { }
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

  ngOnInit(): void {
    console.log(this.data.demande);
    console.log("paiements details" , this.data.demande.paiements)
    this.paiementDetail = this.data.demande.paiements;
    this.GetDetailPaiement(this.paiementDetail);
    this.paiementdata = this.data.demande;
    // this.dataSource = new MatTableDataSource<any>(this.data.);
    this.GetData()
  }
 GetData(){
  this.paiementdata = this.data.demande;
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
  console.log("A l'intereiru" ,this.paiementdata.idPaiement)
  this.paiementService.ConfirmationAnnulationDePaiement(this.paiementdata.idPaiement).subscribe({
    next: (value)=>{
    this.notification.showSuccess("annulation paiement reuissiiii","paiement");
    },
    error: (err:HttpErrorResponse) =>{
      // this.notification.showError("Erreur annulation paiement ","paiement");
      console.log(err)
    },
    complete: () => {
      this.paiementdata = this.data.demande;
this.dialog.closeAll()  
  }
  })
  console.log("fallll")
 }

  
}
