import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notification.service';
import { PaiementService } from '@services/paiement.service';
import { SharedService } from '@services/shared.service';
import { TokenService } from '@services/token.service';
import { NgxPrintElementService } from 'ngx-print-element';

@Component({
  selector: 'app-validation-paiement',
  templateUrl: './validation-paiement.component.html',
  styleUrls: ['./validation-paiement.component.scss']
})
export class ValidationPaiementComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  post: any;
  nom: string;
paiementData: any;
username: any;
montant:any = 0;
idAgent:any;

  constructor(private token:TokenService , public print: NgxPrintElementService, public dialogRef: MatDialogRef<ValidationPaiementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private router: Router ,private formBuilder: FormBuilder,private notification:NotificationService,private sharedService:SharedService, private paiementService : PaiementService) { }

  ngOnInit(): void {
    this.token.clearTokenExpired();
    this.paiementData = this.data.paiements;
    console.log("paiement data" , this.paiementData)
    this.GetTotal();
    this.GetAgentId();
    this.getPaiementUserName()
  }
  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'REÇ DE PAIEMENT',
    templateString: '<header></header>{{printBody}}<footer></footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    // styles: ['td { border: 1px solid black; color: green; }', 'table { border: 1px solid black; }', 'header, table, footer { margin: auto; text-align: center; }']
  }
  printer:any= 0;
  ValidationPaiement(){
    this.paiementService.ValiderListePaiement(this.paiementData).subscribe({
      next: () => {
        this.notification.showSuccess("Pensionnaire est payé avec success vous pouvez imprimer le reçu maintenant", "paiement")
      },
      error: (err: HttpErrorResponse) => {
        this.notification.showError("Erreur paiement", "paiement")
      },
      complete :()=> {
        this.dialogRef.close;
      
       this.printer = 1;
        // this.printer = ['print-section', this.config]
    this.router.navigateByUrl('/CreatePaiement')
  
     
      },
    })
  }
  
  GetTotal(){
    this.paiementData.forEach(element => {
      this.montant = this.montant + element?.montant;    
      
    });
    this.montant = this.formatPrice(this.montant)
  }
  GetAgentId(){
   this.idAgent = this.paiementData[0]?.idUser
   
  }
  formatPrice(value) {
    let val = (value / 1).toFixed(2).replace('.', ',')
    let val2 = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    return  val2.substring( 0 ,val2.indexOf(','))
}
  getPaiementUserName() {
    this.paiementService.getPaiementUsersName(this.idAgent).subscribe({
      next: (result) => {
        this.username = result;
        this.nom = this.username.num
   
        console.log("Test Username", this.username)
      }
    })
  }
}
