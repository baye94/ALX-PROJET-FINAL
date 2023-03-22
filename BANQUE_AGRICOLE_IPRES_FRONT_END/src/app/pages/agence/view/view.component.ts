import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AgenceService } from '@services/agence.service';
import { SharedService } from '@services/shared.service';
import { TokenService } from '@services/token.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewAgenceComponent implements OnInit {
  remove() {
    throw new Error('Method not implemented.');
  }
  guichetDataSource: any;
  guichetData: any;
  agentDataSource: any;
  agentData: any;
  idAgence: any;
  agencePaiementData:any;
  agencePaiementDataSource:any;
  constructor(private shared: SharedService, private agenceService: AgenceService , private token:TokenService) { }

  displayedColumnsAgenceGuichet: string[] = ['num', 'libelle', 'idagence', 'date'];
  displayedColumnsAgent: string[] = ['num', 'nom', 'prenom', 'username'];
  displayedColumnsPaiement: string[] = ['evenement', 'montant','matriculePensionnaire','idUser','guichet', 'dateCreation','datePaiement','action'];


  @ViewChild('agenceGuichet', { read: MatPaginator }) agenceGuichet: MatPaginator;
  @ViewChild('agenceAgent', { read: MatPaginator }) agenceAgent: MatPaginator;
  @ViewChild('agencePaiement', { read: MatPaginator }) agencePaiement: MatPaginator;



  ngOnInit(): void {
    this.token.clearTokenExpired();
    console.log("jbjfdisfhhds", this.shared.GetIdAgence());
    this.idAgence = this.shared.GetIdAgence();
    this.GetGuichetAgence();
    this.GetAgentAgences();
    this.GetAgencePaiements();
  }
  GetGuichetAgence() {
    this.agenceService.GetAgenceListeGuichet(this.idAgence).subscribe({
      next: (item) => {
        this.guichetData = item;
        this.guichetDataSource = new MatTableDataSource<any>(this.guichetData);
        this.guichetDataSource.paginator = this.agenceGuichet;
      }
    });
  }

  GetAgentAgences() {
    this.agenceService.GetAgenceListeAgent(this.idAgence).subscribe({
      next: (item) => {
        this.agentData = item;
        this.agentDataSource = new MatTableDataSource<any>(this.agentData);
        this.agentDataSource.paginator = this.agenceAgent;
      }
    });

  }

  GetAgencePaiements(){
    this.agenceService.GetAgenceListePaiements(this.idAgence).subscribe({
      next: (item) => {
        this.agencePaiementData = item;
        this.agencePaiementDataSource = new MatTableDataSource<any>(this.agencePaiementData);
        this.agencePaiementDataSource.paginator = this.agencePaiement
        console.log(item);
      }
    })
  }

}
