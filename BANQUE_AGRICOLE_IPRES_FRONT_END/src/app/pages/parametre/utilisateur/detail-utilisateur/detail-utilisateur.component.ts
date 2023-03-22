import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaiementService } from '@services/paiement.service';
import { UserService } from '@services/user.service';
import { EmailAgentComponent } from '../email-agent/email-agent.component';
import { GuichetAgentComponent } from '../guichet-agent/guichet-agent.component';
import { InformationPersonnelleComponent } from '../information-personnelle/information-personnelle.component';
import { LoginAgentComponent } from '../login-agent/login-agent.component';
import { PasswordAgentComponent } from '../password-agent/password-agent.component';
import { RoleUtilisateurComponent } from '../role-utilisateur/role-utilisateur.component';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss']
})
export class DetailUtilisateurComponent implements OnInit {

totalAgentGuichet: any;
idAgent :any;
paiementData:any;
paiementDataSource:any
montant:any;
transactions:any;
totalTransactionData:any;

  constructor( private dialog:MatDialog,private paimentService:PaiementService , userService:UserService ) { }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns: String[] = ['evenement','montant','matriculePensionnaire','dateCreation','status','datePaiement']

  ngOnInit(): void {
    this.idAgent = localStorage.getItem('idUser');
    this.GetAgentPaiement();
    this.GetTotalPaiement();
  }
  GetTotalPaiement(){
    this.paimentService.GetTotalPaiementAgent(this.idAgent).subscribe({
      next: (value) => {
        this.totalTransactionData = value;
        this.montant = this.totalTransactionData[0].montantTotal;
        this.transactions = this.totalTransactionData[0].nombreTotalTransaction;
        console.log("montant " , this.montant);

      },
      error: (err) => {
        console.log(err)
      },
      complete() {
        
      },
    })

  }
  GetAgentPaiement(){
     this.paimentService.GetAllPaiementAgent(this.idAgent).subscribe({
      next: (value) => {
        this.paiementData = value;
        this.paiementDataSource = new MatTableDataSource<any>(this.paiementData);
        this.paiementDataSource.paginator = this.paginator;
        this.paiementDataSource.sort = this.sort;

      },
      error: (err) => {

      },
      complete: () => {

      }
     })

  }
  OpenDialogCreateGuichet(enteranimation: any, exitanimation: any) {

    this.dialog.open(GuichetAgentComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
     
    })
  }
  OpenDialogUpdateEmail(enteranimation: any, exitanimation: any) {

    this.dialog.open(EmailAgentComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
     
    })
  }
  OpenDialogUpdatePassword(enteranimation: any, exitanimation: any) {

    this.dialog.open(PasswordAgentComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
     
    })
  }

  OpenDialogCreateRole(enteranimation: any, exitanimation: any) {

    this.dialog.open(RoleUtilisateurComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
     
    })
  }
  OpenDialogUpdateLogin(enteranimation: any, exitanimation: any) {

    this.dialog.open(LoginAgentComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
     
    })
  }
  OpenDialogUpdateInfo(enteranimation: any, exitanimation: any) {

    this.dialog.open(InformationPersonnelleComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
     
    })
  }
  

}
