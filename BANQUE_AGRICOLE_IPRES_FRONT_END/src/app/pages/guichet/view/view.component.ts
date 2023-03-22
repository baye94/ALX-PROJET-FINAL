import { Component, OnInit, ViewChild } from '@angular/core';
import { GuichetService } from '@services/guichet.service';
import { ApiService } from "@services/api.service";
import { PaiementService } from "@services/paiement.service";
import { IGuichet } from '@/interfaces/guichet';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PensionnaireService } from "@services/pensionnaire.service";
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@services/notification.service';
import { EditGuichetComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DesactiveGuichetComponent } from '../desactive-guichet/desactive-guichet.component';
import { TokenService } from '@services/token.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewGuichetComponent implements OnInit {
  status: number;
  _idGuichet: any;

  constructor(private token:TokenService ,private dialog: MatDialog, private notification: NotificationService, private guichetService: GuichetService,
    private service: GuichetService, private pensionnaireService: PensionnaireService) { }

  ngOnInit(): void {
    // this.loadDes();
    this.token.clearTokenExpired();
    this.idGuichet = localStorage.getItem('idguichet')
    this.guichetService.RequiredRefresh.subscribe(r => {
      this.GetAgenceGuichet();
      this.GetGuichetAgents();
      this.GetGuichetAgence();
      this.GetPaiementGuichet();
    })
    this.GetAgenceGuichet();
    this.GetGuichetAgence();
    this.GetPaiementGuichet();
    this.GetGuichetAgents();
    console.log("this.GetPaiementGuichet();", this.GetPaiementGuichet())
    console.log("id Guichet", localStorage.getItem('idguichet'))
    // this.GetGuichetAgents(localStorage.getItem('idguichet'));
  }
 remove(){
  localStorage.removeItem('idguichet')
 }

  idGuichet: any;
  resGuichetpdata: any;
  editdata: any;
  dataGuichet: any;
  paiementGuichet: any;
  dataSourcePaiementGuichet: any;
  guichetAgents: any;
  dataSourceGuichetAgent: any;
  guichetAgence: any;
  dataSourceGuichetAgence: any;
  totalAgentGuichet: any;

 
  @ViewChild(MatPaginator , {static:true}) paginatorP: MatPaginator;
  @ViewChild(MatSort , {static:true}) sortP !: MatSort;
  @ViewChild(MatPaginator , {static:true}) paginatorG: MatPaginator;
  @ViewChild(MatSort , {static:true}) sortG !: MatSort;

  @ViewChild('agentPaginator', {read: MatPaginator}) agentPaginator: MatPaginator;


  displayedColumns: string[] = ['numGuichet', 'datePaiement', 'matriculePensionnaire', 'agent', 'action'];
  displayedColumns2: string[] = ['evenement', 'montant', 'matriculePensionnaire', 'idUser', 'guichet', 'dateCreation', 'datePaiement', 'action'];

  displayedColumnsAgent: string[] = ['num', 'nom', 'prenom', 'username'];
  displayedColumnsAgence: string[] = ['num', 'libelle', 'adresse'];

  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource: any;
  empdata: any;

  async GetAgenceGuichet(): Promise<void> {
    if (this.idGuichet != null) {
      this.service.GetGuichetbycode(this.idGuichet).subscribe((result: any) => {
        if (result != null) {
          this.empdata = result = result;
          console.log("this.empdata = result", this.empdata = result)

        }

      });
    } else { }
  }

  async GetGuichetAgence(): Promise<any> {
    if (this.idGuichet != null) {
      try {
        this.service.GetGuichetAgence(this.idGuichet).subscribe((result: any) => {
          if (result != null) {
            this.guichetAgence = result;
            this.dataSourceGuichetAgence = new MatTableDataSource<any>(this.guichetAgence);
          }
          else {

          }
        });
      } catch (error) {
        console.error(error);

      }
    } else { }
  }

  GetPaiementGuichet() {
    if (this.idGuichet != null) {
      try {
        this.guichetService.GetGuichetPaiement(localStorage.getItem('idguichet')).subscribe({
          next: (result) => {

            this.paiementGuichet = result;
            this.dataSourcePaiementGuichet = new MatTableDataSource<any>(this.paiementGuichet);
            this.dataSourcePaiementGuichet.paginator = this.paginatorP;
            this.dataSourcePaiementGuichet.sort = this.sortP;


          },
        });
      } catch (error) {
        console.error(error);

      }
    }
  }

  GetGuichetAgents() {
    try {
      this.guichetService.GetGuichetAgent(this.idGuichet).subscribe({
        next: (item) => {

          this.guichetAgents = item;
          console.log("agent guichet gggg", this.guichetAgents);
          this.dataSourceGuichetAgent = new MatTableDataSource<any>(this.guichetAgents);
          this.dataSourceGuichetAgent.paginator = this.agentPaginator;
          // this.dataSourceGuichetAgent.sort = this.sortG;
          // this.dataSourceGuichetAgent.sort = this.sort
          // this.dataSourceGuichetAgent.paginator =  this.paginator;
          console.log(this.dataSourceGuichetAgent.paginator)
          this.totalAgentGuichet = this.guichetAgents.length;

          console.log("guichet agence", item);
        },
        error: (err: HttpErrorResponse) => {
          this.notification.showInfo(err.error, "Liste des agents ")
        }
      });

    } catch (error) {
      console.log(error)
    }
  }

 

  OpenDialogEdit(enteranimation: any, exitanimation: any, code: any) {

    this.dialog.open(EditGuichetComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data: {
        empcode: code
      }
    })
  }

  OpenDialogCreate(enteranimation: any, exitanimation: any, code: any, status: any) {

    this.dialog.open(DesactiveGuichetComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "20%",
      data: {
        idUser: code,
        status: status,
      }
    })
  }


}
