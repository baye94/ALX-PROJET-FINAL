import { IGuichet } from '@/interfaces/guichet';
import { IAgence } from '@/interfaces/agence';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmailAgentComponent } from '@pages/parametre/utilisateur/email-agent/email-agent.component';
import { GuichetAgentComponent } from '@pages/parametre/utilisateur/guichet-agent/guichet-agent.component';
import { InformationPersonnelleComponent } from '@pages/parametre/utilisateur/information-personnelle/information-personnelle.component';
import { LoginAgentComponent } from '@pages/parametre/utilisateur/login-agent/login-agent.component';
import { PasswordAgentComponent } from '@pages/parametre/utilisateur/password-agent/password-agent.component';
import { RoleUtilisateurComponent } from '@pages/parametre/utilisateur/role-utilisateur/role-utilisateur.component';
import { AgenceService } from '@services/agence.service';
import { PaiementService } from '@services/paiement.service';
import { UserService } from '@services/user.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-detail-agents',
  templateUrl: './detail-agents.component.html',
  styleUrls: ['./detail-agents.component.scss']
})
export class DetailAgentsComponent implements OnInit {


  totalAgentGuichet: any;
  idAgent: any;
  paiementData: any;
  paiementDataSource: any
  montant: any;
  transactions: any;
  totalTransactionData: any;
  roleDataSource: any;
  roleData: any;
  guichet:IGuichet;
  LibelleAgence:any;
  NumAgence:any;
  idAgence:any;
  displayedColumnsrole: string[] = ['role']
  constructor(private token:TokenService , private agenceService: AgenceService ,private userService: UserService, private dialog: MatDialog, private paimentService: PaiementService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns: String[] = ['evenement', 'montant', 'matriculePensionnaire', 'dateCreation', 'status', 'datePaiement']

  ngOnInit(): void {
    this.token.clearTokenExpired();
    this.idAgent = localStorage.getItem('idUser');
    this.GetAgentPaiement();
    this.GetTotalPaiement();
    this.GetUserRole();
    this.GetUserGuichet();
  }
  GetTotalPaiement() {
    this.paimentService.GetTotalPaiementAgent(this.idAgent).subscribe({
      next: (value) => {
        this.totalTransactionData = value;
        this.montant = this.totalTransactionData[0].montantTotal;
        this.transactions = this.totalTransactionData[0].nombreTotalTransaction;
        console.log("montant ", this.montant);

      },
      error: (err) => {
        console.log(err)
      },
      complete() {

      },
    })

  }
  GetAgentPaiement() {
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
  GetUserRole() {
    this.userService.GetUserRole(this.idAgent).subscribe({
      next: (value) => {
        this.roleData = value
        this.roleDataSource = new MatTableDataSource<any>(value);
        console.log('Tableau de roles', this.roleDataSource);
        console.log("les role sont ", value);
      }
    })

  }
  GetUserGuichet(){
    this.userService.GetGuiguetUser(this.idAgent).subscribe({
      next: (value) => {
       this.guichet = value;
       this.idAgence = this.guichet.idAgence
       console.log("guichet agent" , this.guichet)
       this.GetUserAgence(this.guichet.idAgence)
       console.log("id agence" , this.guichet.idAgence)

      },
    })
  }

  GetUserAgence(id:any){
   
    this.agenceService.GetAgencebycode(id).subscribe({
      next: (value) => {
        console.log("hjhfsdfghds vvvvv" , value)
       this.LibelleAgence = value.libelle;
       this.NumAgence = value.numAgence;
       console.log("hskdskdskdddd" , this.NumAgence )
      },
      error: ( err) => {

      },
      complete: () => {

      }
    })
  }



}
