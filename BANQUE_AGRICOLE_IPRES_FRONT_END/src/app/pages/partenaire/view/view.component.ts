import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@services/notification.service';
import { PartenaireService } from '@services/partenaire.service';
import { TokenService } from '@services/token.service';
import { PartenaireAgenceGuichetComponent } from '../partenaire-agence-guichet/partenaire-agence-guichet.component';
import { PartenaireAgenceComponent } from '../partenaire-agence/partenaire-agence.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewPartenaireComponent implements OnInit {

displayedColumns: any;
dataSourcePartenaireGuichet: any;
dataSourcePartenaireAgence: any;
dataSourcePartenaireAgent: any;
dataSourcePartenairePaiement: any;
resGuichetpdata: any;
totalPartenaireAgence:any;
idPartenaire: any;
totalPartenairePaiement: any;
nombreTransaction: any;
montantTransaction: any;
tauxPartenaire: any;
libellePartenaire:any;
partenaireData:any;
  constructor(private token:TokenService, private dialog: MatDialog , private servicePartenaire : PartenaireService) { }

  displayedColumnsPartenaireAgence: string[] = ['num','libelle','adresse'];
  displayedColumnsPartenaireGuichet: string[] = ['num','libelle','idagence','date'];
  displayedColumnsPartenaireAgents: string[] = ['num','prenom','nom'];
  displayedColumnsPartenairePaiement: string[] = ['evenement', 'montant','matriculePensionnaire','idUser','guichet','datePaiement','dateCreation']


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  @ViewChild('agentPaginator', {read: MatPaginator}) agentPaginator: MatPaginator;
  @ViewChild('paiementPaginator', {read: MatPaginator}) paiementPaginator: MatPaginator;
  @ViewChild('guichetPaginator', {read: MatPaginator}) guichetPaginator: MatPaginator;
  @ViewChild('agencePaginator', {read: MatPaginator}) agencePaginator: MatPaginator;



  ngOnInit(): void {
    this.token.clearTokenExpired();
    this.idPartenaire = localStorage.getItem('idPartenaire');

     this.GetPartenaireAgences();
     this.GetPartenaireAgents();
     this.GetPartnairePaiement();
     this.GetPartenaireGuichet();
     this.GetPartenairePaiementTotal();
     this.GetPartenaireById();
     this.servicePartenaire.RequiredRefresh.subscribe(r =>{ 
      this.GetPartenaireAgences();
      this.GetPartenaireAgents();
      this.GetPartnairePaiement();
      this.GetPartenaireGuichet();
      this.GetPartenairePaiementTotal();
      this.GetPartenaireById();

     })
        
  }
  GetPartnairePaiement(){
    this.servicePartenaire.GetPartenairePaiement(this.idPartenaire).subscribe({
      next: (value) => {
        this.dataSourcePartenairePaiement = new MatTableDataSource<any>(value);
        this.dataSourcePartenairePaiement.paginator = this.paiementPaginator;
        this.dataSourcePartenairePaiement.sort = this.sort;

      }
    })
  }
 
  GetPartenairePaiementTotal(){
    this.servicePartenaire.GetPartenairePaiementTotal(this.idPartenaire).subscribe({
      next: (value) =>{
       
          this.totalPartenairePaiement = value;
          this.nombreTransaction = this.totalPartenairePaiement[0].nombreTotalTransaction
          this. montantTransaction = this.totalPartenairePaiement[0].montantTotal
            console.log(value);
         console.log("value retourSSSSSS",this.nombreTransaction);
        
      },
      
      error(err) {
        console.log('errot' , err)
      },
      complete() {
        console.log("complet")
      },
    })
  }
  GetPartenaireAgences(){
    this.servicePartenaire.GetPartenaireAgence(this.idPartenaire).subscribe({
      next: (value)=>{
        this.dataSourcePartenaireAgence = new MatTableDataSource<any>(value);
        this.dataSourcePartenaireAgence.sort = this.sort;
        this.dataSourcePartenaireAgence.paginator = this.agencePaginator;
      }
    })

  }
  GetPartenaireGuichet(){
    this.servicePartenaire.GetPartenaireGuichet(this.idPartenaire).subscribe({
      next: (value) => {
        this.dataSourcePartenaireGuichet = new MatTableDataSource<any>(value);
        this.dataSourcePartenaireGuichet.sort = this.sort;
        this.dataSourcePartenaireAgence.paginator = this.guichetPaginator;
      }
    })

  }
  GetPartenaireAgents(){
    this.servicePartenaire.GetPartenaireAgent(this.idPartenaire).subscribe({
      next: (value) => {
        console.log("sortie agents" , value);
        this.dataSourcePartenaireAgent = new MatTableDataSource<any>(value);
        // this.dataSourcePartenaireAgent.sort = this.sort;
        this.dataSourcePartenaireAgent.paginator = this.agentPaginator
      }
    })

  }
  GetPartenaireById(){
    this.servicePartenaire.GetPartenairebycode(localStorage.getItem('idPartenaire')).subscribe({
      next: (value) =>{
        if(value != null){
          this.partenaireData = value;
          this.tauxPartenaire = this.partenaireData.taux;
          this.libellePartenaire = this.partenaireData.libelle;
          console.log('le taux est ' , this.tauxPartenaire.taux)
        }
      },
      error: (error) => {

      },
      complete() {
        
      },
    })
  }

  OpenDialogCreate(enteranimation: any, exitanimation: any) {

    this.dialog.open(PartenaireAgenceComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
     
    })
  }
  OpenDialogCreateGuichet(enteranimation: any, exitanimation: any) {

    this.dialog.open(PartenaireAgenceGuichetComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
     
    })
  }
}
