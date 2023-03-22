import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PensionnaireService } from "@services/pensionnaire.service";
import { TokenService } from '@services/token.service';
import { type } from 'os';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewPensionnaireComponent implements OnInit {
 

constructor(private token:TokenService ,private pensionnaireService: PensionnaireService) { }
  idPensionnaire: any;
  pensionnairePaiement: any;
  paiementPensionnaire: any;

  dataSourceListFichier: any;
  dataSourceListPaiement: any;
  nombrePaiement: any;
  totalPaiement:any;
  nombreDeList:any;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  @ViewChild('fichierPaginator', {read: MatPaginator}) fichierPaginator: MatPaginator;
  @ViewChild('paiementPaginator', {read: MatPaginator}) paiementPaginator: MatPaginator;

  @ViewChild('uploadResultPaginator', {read: MatPaginator}) uploadResultPaginator: MatPaginator;
 ngOnInit(): void {
  this.token.clearTokenExpired();
    this.idPensionnaire = localStorage.getItem('matriculePansionnaire');
    this.GetPensionnaireByMatricule();
    this.GetPensionnairePaiement();
    this.GetPensionnairePaiement()
    console.log("baye cheikh ", this.idPensionnaire);
  }
  

  dataSourceGuichetListFichier: string[] = ['date', 'salairenet', 'salairebrut', 'avancetabaski', 'categorie' , 'retenutabaski' , 'hospitalisation' , 'assuranceretenu' ];
  dataSourceGuichetListPaiementPensionnaire: string[] = ['datePaiement' , 'evenement', 'idUser', 'montant' ,'facture'];

 /**
  *  Cette fonctionnalité nous permet de recupérer tous les pensionnaires sans doublons 
  *
  * @return {*}  {Promise<void>}
  * @memberof ViewPensionnaireComponent
  */
 async GetPensionnaireByMatricule(): Promise<void> 
  {
    try {
      this.pensionnaireService.GetPenionnaireByMAtricule(this.idPensionnaire).subscribe(item => {
        this.pensionnairePaiement = item;
        console.log("this.pensionnairePaiement" , this.pensionnairePaiement)
        this.dataSourceListFichier = new MatTableDataSource<any>(this.pensionnairePaiement)
        this.dataSourceListFichier.pagination = this.fichierPaginator;
//this.dataSourceListFichier.sort = this.sort;
        this.nombreDeList = this.pensionnairePaiement.length;
      })
    } catch (error) {
      console.error(error);

    }
  }
/**
 * cette fonction nous permet de recuperer les paiements d'un pensentaire
 *
 * @return {*}  {Promise<void>}
 * @memberof ViewPensionnaireComponent
 */
 GetPensionnairePaiement(){
  try {
    this.pensionnaireService.GetAllPaymentMonthsByMatricule(this.idPensionnaire).subscribe(item => {
      this.paiementPensionnaire = item;
      this.nombrePaiement = this.paiementPensionnaire.length;
     console.log("total paiement apres calcule" ,typeof (this.totalPaiement))
      this.dataSourceListPaiement = new MatTableDataSource<any>(this.paiementPensionnaire)
      // this.dataSourceListPaiement.sort = this.sort;
      this.dataSourceListPaiement.pagination = this.uploadResultPaginator;
     
      console.log("test paiement recu" , item);
    })
  } catch (error) {
    console.error(error);
  }

}
}
